ALTER TABLE public.token DROP COLUMN updated_at;
DROP TRIGGER IF EXISTS public.set_current_timestamp_updated_at
  ON public.token
;
