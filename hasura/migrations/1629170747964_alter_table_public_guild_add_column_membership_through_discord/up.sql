ALTER TABLE "public"."guild" ADD COLUMN "membership_through_discord" boolean NOT NULL DEFAULT false;

-- update metafam row
UPDATE guild SET membership_through_discord = true WHERE discord_id = '629411177947987986';
