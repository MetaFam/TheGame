DROP TRIGGER IF EXISTS set_public_profile_cache_last_checked_at
  ON public.profile_cache
;
ALTER TABLE public.profile_cache
  DROP COLUMN last_checked_at
;
