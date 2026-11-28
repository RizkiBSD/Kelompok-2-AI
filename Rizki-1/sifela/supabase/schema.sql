-- ============================================================================
-- SIFELA.ID — SKEMA DATABASE, STORAGE & ROW LEVEL SECURITY
-- Jalankan seluruh isi file ini sekali di Supabase > SQL Editor > New query.
-- Aman dijalankan ulang (menggunakan IF NOT EXISTS / DROP POLICY IF EXISTS).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Tabel
--    Dibuat lebih dulu karena fungsi helper di bawah merujuk ke tabel-tabel ini.
-- ----------------------------------------------------------------------------

-- Profil pengguna. role dan is_verified HANYA bisa diubah admin (lihat trigger
-- protect_profile_privileged_fields di bawah).
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name           text NOT NULL DEFAULT '',
  role                text NOT NULL DEFAULT 'pelamar'
                        CHECK (role IN ('pelamar', 'mitra', 'admin')),
  is_verified         boolean NOT NULL DEFAULT false,
  company_name        text,
  company_description text,
  website             text,
  contact             text,
  -- Array objek: [{ "name": "nib.pdf", "path": "<uid>/nib.pdf" }, ...]
  company_documents   jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- Lowongan nyata dari mitra. Selalu dibuat dengan status 'pending'.
CREATE TABLE IF NOT EXISTS public.jobs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id     uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title           text NOT NULL,
  description     text NOT NULL,
  category        text,
  location        text,
  employment_type text NOT NULL DEFAULT 'Full-time',
  salary_min      numeric(14, 2),
  salary_max      numeric(14, 2),
  status          text NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS jobs_status_created_idx
  ON public.jobs (status, created_at DESC);
CREATE INDEX IF NOT EXISTS jobs_employer_idx
  ON public.jobs (employer_id);

-- Lamaran pelamar. cv_url = path objek di bucket Storage 'cvs'
-- (contoh: "<uid>/cv.pdf"), dibuka dengan createSignedUrl di sisi klien.
CREATE TABLE IF NOT EXISTS public.applications (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id        uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_id  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cv_url        text NOT NULL CHECK (length(trim(cv_url)) > 0),
  cv_file_name  text,
  cover_letter  text,
  status        text NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  -- Anti-spam: satu pelamar hanya bisa mengirim satu lamaran per lowongan.
  CONSTRAINT applications_one_per_job UNIQUE (job_id, applicant_id)
);

CREATE INDEX IF NOT EXISTS applications_job_idx
  ON public.applications (job_id, created_at DESC);
CREATE INDEX IF NOT EXISTS applications_applicant_idx
  ON public.applications (applicant_id);

-- ----------------------------------------------------------------------------
-- 2. Fungsi pembantu (SECURITY DEFINER)
--    Dipakai di kebijakan RLS untuk menghindari rekursi pada tabel profiles.
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_mitra()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'mitra'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_verified_mitra()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'mitra' AND is_verified = true
  );
$$;

CREATE OR REPLACE FUNCTION public.owns_job(p_job_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.jobs
    WHERE id = p_job_id AND employer_id = auth.uid()
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_mitra() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_verified_mitra() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.owns_job(uuid) TO anon, authenticated;

-- ----------------------------------------------------------------------------
-- 3. Trigger
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS jobs_set_updated_at ON public.jobs;
CREATE TRIGGER jobs_set_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS applications_set_updated_at ON public.applications;
CREATE TRIGGER applications_set_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Pengguna biasa tidak boleh mengubah role / is_verified lewat UPDATE profil.
CREATE OR REPLACE FUNCTION public.protect_profile_privileged_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Perintah langsung dari SQL Editor / CLI (tanpa sesi auth) dipercaya.
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;
  IF NOT public.is_admin() THEN
    IF NEW.role IS DISTINCT FROM OLD.role
       OR NEW.is_verified IS DISTINCT FROM OLD.is_verified THEN
      RAISE EXCEPTION 'Role dan status verifikasi hanya dapat diubah oleh admin';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_protect_privileged_fields ON public.profiles;
CREATE TRIGGER profiles_protect_privileged_fields
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_profile_privileged_fields();

-- Mitra tidak bisa mengubah status lowongan atau memindahkan kepemilikan.
CREATE OR REPLACE FUNCTION public.protect_job_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Perintah langsung dari SQL Editor / CLI (tanpa sesi auth) dipercaya.
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;
  IF NOT public.is_admin() THEN
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      RAISE EXCEPTION 'Status lowongan hanya dapat diubah oleh admin';
    END IF;
    IF NEW.employer_id IS DISTINCT FROM OLD.employer_id THEN
      RAISE EXCEPTION 'Kepemilikan lowongan tidak dapat diubah';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS jobs_protect_status ON public.jobs;
CREATE TRIGGER jobs_protect_status
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.protect_job_status();

-- Buat profil otomatis setiap kali user mendaftar via Supabase Auth.
-- Role dari metadata dibatasi hanya 'pelamar' atau 'mitra', never 'admin'.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  requested_role text := COALESCE(new.raw_user_meta_data->>'role', 'pelamar');
BEGIN
  IF requested_role NOT IN ('pelamar', 'mitra') THEN
    requested_role := 'pelamar';
  END IF;

  INSERT INTO public.profiles (id, full_name, role, is_verified)
  VALUES (
    new.id,
    COALESCE(
      new.raw_user_meta_data->>'full_name',
      split_part(COALESCE(new.email, ''), '@', 1),
      ''
    ),
    requested_role,
    false
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 4. Storage bucket (PRIVATE — akses lewat RLS / signed URL)
-- ----------------------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cvs',
  'cvs',
  false,
  5242880,
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]::text[]
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'company_docs',
  'company_docs',
  false,
  10485760,
  ARRAY['application/pdf', 'image/jpeg', 'image/png']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Konvensi path: <uid_pengguna>/<nama_file>
-- Upload dari klien: supabase.storage.from('cvs').upload(`${user.id}/${file.name}`, file)

-- ----------------------------------------------------------------------------
-- 5. Row Level Security — tabel
-- ----------------------------------------------------------------------------

ALTER TABLE public.profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- ----- profiles -----
DROP POLICY IF EXISTS profiles_select_public_verified_mitra ON public.profiles;
CREATE POLICY profiles_select_public_verified_mitra
  ON public.profiles FOR SELECT TO anon
  USING (role = 'mitra' AND is_verified = true);

DROP POLICY IF EXISTS profiles_select_own_verified_or_admin ON public.profiles;
CREATE POLICY profiles_select_own_verified_or_admin
  ON public.profiles FOR SELECT TO authenticated
  USING (
    id = auth.uid()
    OR (role = 'mitra' AND is_verified = true)
    OR public.is_admin()
  );

DROP POLICY IF EXISTS profiles_insert_own ON public.profiles;
CREATE POLICY profiles_insert_own
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (
    id = auth.uid()
    AND role IN ('pelamar', 'mitra')
    AND is_verified = false
  );

DROP POLICY IF EXISTS profiles_update_own_or_admin ON public.profiles;
CREATE POLICY profiles_update_own_or_admin
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid() OR public.is_admin())
  WITH CHECK (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS profiles_delete_own_or_admin ON public.profiles;
CREATE POLICY profiles_delete_own_or_admin
  ON public.profiles FOR DELETE TO authenticated
  USING (id = auth.uid() OR public.is_admin());

-- ----- jobs -----
-- Publik (belum login) hanya melihat lowongan yang sudah disetujui.
DROP POLICY IF EXISTS jobs_select_approved_anon ON public.jobs;
CREATE POLICY jobs_select_approved_anon
  ON public.jobs FOR SELECT TO anon
  USING (status = 'approved');

DROP POLICY IF EXISTS jobs_select_approved_own_or_admin ON public.jobs;
CREATE POLICY jobs_select_approved_own_or_admin
  ON public.jobs FOR SELECT TO authenticated
  USING (
    status = 'approved'
    OR employer_id = auth.uid()
    OR public.is_admin()
  );

-- Mitra terverifikasi bisa membuat lowongan, tetapi statusnya WAJIB 'pending'.
DROP POLICY IF EXISTS jobs_insert_verified_mitra ON public.jobs;
CREATE POLICY jobs_insert_verified_mitra
  ON public.jobs FOR INSERT TO authenticated
  WITH CHECK (
    public.is_admin()
    OR (
      public.is_verified_mitra()
      AND employer_id = auth.uid()
      AND status = 'pending'
    )
  );

DROP POLICY IF EXISTS jobs_update_own_or_admin ON public.jobs;
CREATE POLICY jobs_update_own_or_admin
  ON public.jobs FOR UPDATE TO authenticated
  USING (employer_id = auth.uid() OR public.is_admin())
  WITH CHECK (employer_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS jobs_delete_own_or_admin ON public.jobs;
CREATE POLICY jobs_delete_own_or_admin
  ON public.jobs FOR DELETE TO authenticated
  USING (employer_id = auth.uid() OR public.is_admin());

-- ----- applications -----
DROP POLICY IF EXISTS applications_select_related ON public.applications;
CREATE POLICY applications_select_related
  ON public.applications FOR SELECT TO authenticated
  USING (
    applicant_id = auth.uid()
    OR public.is_admin()
    OR public.owns_job(job_id)
  );

DROP POLICY IF EXISTS applications_insert_own_pending ON public.applications;
CREATE POLICY applications_insert_own_pending
  ON public.applications FOR INSERT TO authenticated
  WITH CHECK (applicant_id = auth.uid() AND status = 'pending');

DROP POLICY IF EXISTS applications_update_job_owner_or_admin ON public.applications;
CREATE POLICY applications_update_job_owner_or_admin
  ON public.applications FOR UPDATE TO authenticated
  USING (public.owns_job(job_id) OR public.is_admin())
  WITH CHECK (public.owns_job(job_id) OR public.is_admin());

DROP POLICY IF EXISTS applications_delete_own_pending ON public.applications;
CREATE POLICY applications_delete_own_pending
  ON public.applications FOR DELETE TO authenticated
  USING (applicant_id = auth.uid() AND status = 'pending');

-- ----------------------------------------------------------------------------
-- 6. Row Level Security — Storage objects
-- ----------------------------------------------------------------------------

-- storage.objects sudah memiliki RLS aktif bawaan Supabase.
-- Kebijakan di bawah dibuat dengan hak akses role postgres di SQL Editor.

----- Bucket: cvs -----
DROP POLICY IF EXISTS cvs_insert_own ON storage.objects;
CREATE POLICY cvs_insert_own
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'cvs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS cvs_select_own ON storage.objects;
CREATE POLICY cvs_select_own
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'cvs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Mitra pemilik lowongan boleh membaca CV pelamar yang melamar ke lowongannya.
DROP POLICY IF EXISTS cvs_select_employer ON storage.objects;
CREATE POLICY cvs_select_employer
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'cvs'
    AND EXISTS (
      SELECT 1 FROM public.applications a
      WHERE (a.cv_url = name OR a.cv_url = 'cvs/' || name)
        AND public.owns_job(a.job_id)
    )
  );

DROP POLICY IF EXISTS cvs_select_admin ON storage.objects;
CREATE POLICY cvs_select_admin
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'cvs' AND public.is_admin());

DROP POLICY IF EXISTS cvs_update_own ON storage.objects;
CREATE POLICY cvs_update_own
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'cvs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'cvs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS cvs_delete_own ON storage.objects;
CREATE POLICY cvs_delete_own
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'cvs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

----- Bucket: company_docs -----
DROP POLICY IF EXISTS company_docs_insert_own_mitra ON storage.objects;
CREATE POLICY company_docs_insert_own_mitra
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'company_docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND public.is_mitra()
  );

DROP POLICY IF EXISTS company_docs_select_own ON storage.objects;
CREATE POLICY company_docs_select_own
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'company_docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS company_docs_select_admin ON storage.objects;
CREATE POLICY company_docs_select_admin
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'company_docs' AND public.is_admin());

DROP POLICY IF EXISTS company_docs_update_own ON storage.objects;
CREATE POLICY company_docs_update_own
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'company_docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'company_docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS company_docs_delete_own ON storage.objects;
CREATE POLICY company_docs_delete_own
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'company_docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ============================================================================
-- 7. Catatan pakai (tidak dijalankan otomatis)
-- ----------------------------------------------------------------------------
-- a) Buat akun admin lewat Supabase Auth > Add user, lalu jadikan admin:
--
--    UPDATE public.profiles p
--    SET role = 'admin', is_verified = true
--    FROM auth.users u
--    WHERE u.id = p.id AND u.email = 'admin@sifela.id';
--
-- b) Daftar mitra baru otomatis ber-role 'mitra', is_verified = false.
--    Admin menverifikasi dengan:
--
--    UPDATE public.profiles SET is_verified = true WHERE id = '<uuid_mitra>';
--
-- c) Lowongan baru selalu 'pending'. Admin menyetujui dengan:
--
--    UPDATE public.jobs SET status = 'approved' WHERE id = '<uuid_job>';
--
-- d) Karena bucket bersifat private, tampilkan file dengan signed URL:
--    supabase.storage.from('cvs').createSignedUrl(cv_url, 3600)
-- ============================================================================
