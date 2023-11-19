ALTER TABLE public.guild ALTER COLUMN github_url DROP NOT NULL;
ALTER TABLE public.guild ADD COLUMN github_url text;
