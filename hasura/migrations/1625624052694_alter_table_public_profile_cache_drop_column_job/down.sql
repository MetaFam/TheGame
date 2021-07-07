ALTER TABLE public.profile_cache
  ADD COLUMN job TEXT
;
ALTER TABLE public.profile_cache
  ALTER COLUMN job DROP NOT NULL
;
