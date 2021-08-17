ALTER TABLE "public"."guild_metadata" ADD COLUMN "membership_through_discord" boolean NOT NULL DEFAULT false;

-- update metafam row
UPDATE guild_metadata SET membership_through_discord = true WHERE discord_id = '629411177947987986';
