alter table "public"."guild" alter column "discord_invite_url" drop not null;
alter table "public"."guild" add column "discord_invite_url" text;
