ALTER TABLE public.guild ADD COLUMN discord_metadata jsonb NULL;

UPDATE public.guild
  SET discord_metadata = (
    '{"inviteUrl": "' || discord_invite_url || '"}'
  )::jsonb
;

ALTER TABLE public.guild DROP COLUMN discord_invite_url CASCADE;
