alter table "public"."profile" drop constraint "no_periods_in_username";
alter table "public"."profile" add constraint "no_periods_in_username" check (position(username in '.')=0);
