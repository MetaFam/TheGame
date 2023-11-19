ALTER TABLE public.xp DROP COLUMN updated_at CASCADE;
DROP TRIGGER IF EXISTS set_current_timestamp_updated_at
  ON public.xp
;
