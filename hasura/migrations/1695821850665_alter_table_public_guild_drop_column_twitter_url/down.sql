alter table "public"."guild" alter column "twitter_url" drop not null;
alter table "public"."guild" add column "twitter_url" text;
