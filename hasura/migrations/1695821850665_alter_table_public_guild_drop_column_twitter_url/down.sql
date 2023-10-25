ALTER TABLE public.guild ALTER COLUMN twitter_url DROP NOT NULL;
ALTER TABLE public.guild ADD COLUMN twitter_url text;
