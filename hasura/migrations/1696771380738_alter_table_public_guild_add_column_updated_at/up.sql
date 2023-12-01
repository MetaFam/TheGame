alter table "public"."guild" add column "updated_at" timestamptz
 null default now();
