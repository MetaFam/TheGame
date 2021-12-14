alter table "public"."profile" drop constraint "profile_cache_player_id_key";
alter table "public"."profile" add constraint "profile_player_id_key" unique ("player_id");
