ALTER TABLE public.xp
  ADD COLUMN created_at timestamptz
  NOT NULL DEFAULT now()
;
