ALTER TABLE public.profile_cache
  ADD COLUMN "ethereumAddress" TEXT
;

ALTER TABLE public.profile_cache
  ALTER COLUMN "ethereumAddress"
  DROP NOT NULL
;
