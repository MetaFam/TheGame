alter table "public"."balance" add foreign key ("player_id") references "public"."player"("id") on update cascade on delete cascade;
