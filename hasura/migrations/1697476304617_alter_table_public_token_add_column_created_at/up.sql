ALTER TABLE public.token
  ADD COLUMN created_at timestamptz
  NULL DEFAULT now()
;
