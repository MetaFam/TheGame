ALTER TABLE public.guild
  ADD COLUMN updated_at timestamptz
  NULL DEFAULT now()
;
