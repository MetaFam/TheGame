alter table "public"."token" add column "created_at" timestamptz
 null default now();
