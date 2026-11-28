-- Lowongan yang sudah lewat masa berlakunya otomatis tidak tampil di pencarian.
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS expires_at timestamptz;

UPDATE public.jobs
SET expires_at = now() + interval '90 days'
WHERE expires_at IS NULL;

CREATE INDEX IF NOT EXISTS jobs_expires_at_idx ON public.jobs (expires_at);

COMMENT ON COLUMN public.jobs.expires_at IS 'Batas tayang lowongan; NULL berarti tidak kedaluwarsa.';
