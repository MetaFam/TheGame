ALTER TABLE public.profile_cache
  ADD COLUMN last_checked_at timestamptz DEFAULT NOW()
;

CREATE OR REPLACE FUNCTION public.set_current_timestamp_last_checked_at()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."last_checked_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER set_public_profile_cache_last_checked_at
BEFORE UPDATE ON public.profile_cache
FOR EACH ROW
EXECUTE PROCEDURE public.set_current_timestamp_last_checked_at();
COMMENT ON TRIGGER set_public_profile_cache_last_checked_at
ON public.profile_cache 
IS 'trigger to set value of column "last_checked_at" to current timestamp on row update';
