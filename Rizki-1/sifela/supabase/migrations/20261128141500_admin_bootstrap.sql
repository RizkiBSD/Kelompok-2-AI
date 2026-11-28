-- Izinkan perubahan langsung (SQL Editor / CLI) pada kolom privileged.
-- Klien browser tetap dibatasi: auth.uid() ada dan harus ber-role admin.

CREATE OR REPLACE FUNCTION public.protect_profile_privileged_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
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

CREATE OR REPLACE FUNCTION public.protect_job_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
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
