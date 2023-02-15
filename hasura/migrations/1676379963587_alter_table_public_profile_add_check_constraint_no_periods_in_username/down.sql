alter table "public"."profile" drop constraint "no_periods_in_username";
alter table "public"."profile" add constraint "no_periods_in_username" check (CHECK (username ~ similar_escape('[^-a-z0-9_]+'::text, NULL::text)));
