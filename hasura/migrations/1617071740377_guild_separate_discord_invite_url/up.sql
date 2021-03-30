ALTER TABLE "public"."guild" ADD COLUMN "discord_invite_url" text;

UPDATE guild SET discord_invite_url = discord_metadata ->> 'inviteUrl';

UPDATE guild SET discord_metadata = discord_metadata - 'inviteUrl';
