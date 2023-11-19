ALTER TABLE public.guild ALTER COLUMN discord_invite_url DROP NOT NULL;
ALTER TABLE public.guild ADD COLUMN discord_invite_url text;
