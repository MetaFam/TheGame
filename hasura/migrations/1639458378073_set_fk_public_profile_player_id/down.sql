alter table "public"."profile" drop constraint "profile_player_id_fkey",
          add constraint "profile_cache_player_id_fkey"
          foreign key ("player_id")
          references "public"."player"
          ("id")
          on update cascade
          on delete cascade;
