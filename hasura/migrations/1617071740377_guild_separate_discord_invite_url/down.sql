UPDATE "public"."guild" 
SET discord_metadata = jsonb_set(discord_metadata, '{inviteUrl}', '"' || discord_invite_url || '"');

ALTER TABLE "public"."guild" DROP COLUMN "discord_invite_url" CASCADE;
