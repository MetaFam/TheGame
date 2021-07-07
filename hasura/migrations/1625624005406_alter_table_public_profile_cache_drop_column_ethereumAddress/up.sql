ALTER TABLE public.profile_cache
  DROP COLUMN IF EXISTS "ethereumAddress"
  CASCADE
;
