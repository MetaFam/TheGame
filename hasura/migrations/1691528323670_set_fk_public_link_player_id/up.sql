alter table "public"."link"
           add constraint "link_player_id_fkey"
           foreign key ("player_id")
           references "public"."player"
           ("id") on update cascade on delete cascade;
