alter table "public"."guild" alter column "github_url" drop not null;
alter table "public"."guild" add column "github_url" text;
