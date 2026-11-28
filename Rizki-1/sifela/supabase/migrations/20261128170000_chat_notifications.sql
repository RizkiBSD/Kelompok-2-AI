-- Ruang pesan dan notifikasi internal.
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS messages_job_created_idx ON public.messages (job_id, created_at);
CREATE INDEX IF NOT EXISTS messages_recipient_idx ON public.messages (recipient_id, created_at);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='messages' AND policyname='messages_readable_by_participants') THEN
    CREATE POLICY messages_readable_by_participants ON public.messages
      FOR SELECT TO authenticated
      USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='messages' AND policyname='messages_insert_by_sender') THEN
    CREATE POLICY messages_insert_by_sender ON public.messages
      FOR INSERT TO authenticated
      WITH CHECK (auth.uid() = sender_id);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  href text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS notifications_user_idx ON public.notifications (user_id, created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='notifications' AND policyname='notifications_select_own') THEN
    CREATE POLICY notifications_select_own ON public.notifications
      FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='notifications' AND policyname='notifications_update_own') THEN
    CREATE POLICY notifications_update_own ON public.notifications
      FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.notify_new_message() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  jtitle text;
BEGIN
  SELECT title INTO jtitle FROM public.jobs WHERE id = NEW.job_id;
  INSERT INTO public.notifications (user_id, title, body, href)
  VALUES (NEW.recipient_id, 'Pesan baru', COALESCE(jtitle, 'Percakapan Sifela'), '#pesan');
  RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION public.notify_new_application() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  owner uuid;
  jtitle text;
BEGIN
  SELECT employer_id, title INTO owner, jtitle FROM public.jobs WHERE id = NEW.job_id;
  IF owner IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, title, body, href)
    VALUES (owner, 'Lamaran masuk', 'Ada lamaran baru untuk ' || COALESCE(jtitle, 'lowongan Anda'), '#lamaran');
  END IF;
  RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION public.notify_application_status() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.notifications (user_id, title, body, href)
    VALUES (NEW.applicant_id, 'Status lamaran diperbarui',
            'Lamaran Anda kini berstatus ' || NEW.status, '#lamaran');
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_notify_new_message ON public.messages;
CREATE TRIGGER trg_notify_new_message AFTER INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_message();

DROP TRIGGER IF EXISTS trg_notify_new_application ON public.applications;
CREATE TRIGGER trg_notify_new_application AFTER INSERT ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_application();

DROP TRIGGER IF EXISTS trg_notify_application_status ON public.applications;
CREATE TRIGGER trg_notify_application_status AFTER UPDATE OF status ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.notify_application_status();

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='messages') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='notifications') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
  END IF;
END $$;
