alter table "public"."balance" add foreign key ("player_address") references "public"."player"("ethereum_address") on update cascade on delete cascade;
