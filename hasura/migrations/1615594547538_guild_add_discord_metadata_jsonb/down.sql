
ALTER TABLE "public"."guild" ADD COLUMN "discord_invite_url" text;

UPDATE guild SET discord_invite_url = discord_metadata ->> 'invite_url';

ALTER TABLE "public"."guild" DROP COLUMN "discord_metadata";
