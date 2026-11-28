-- Kolom tambahan untuk lowongan kurasi dari sumber publik.
-- company_name: nama perusahaan/user asal yang tampil di kartu lowongan.
-- source_url: tautan ke sumber asli lowongan.
ALTER TABLE public.jobs
  ADD COLUMN IF NOT EXISTS company_name text,
  ADD COLUMN IF NOT EXISTS source_url text;
