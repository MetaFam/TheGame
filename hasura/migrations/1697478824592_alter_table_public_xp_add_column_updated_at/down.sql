ALTER TABLE public.xp add COLUMN updated_at;
DROP TRIGGER IF EXISTS public.set_current_timestamp_updated_at
  ON public.xp
;
