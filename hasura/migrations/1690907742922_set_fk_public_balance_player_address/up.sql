alter table "public"."balance"
           add constraint "balance_player_address_fkey"
           foreign key ("player_address")
           references "public"."player"
           ("ethereum_address") on update cascade on delete no action;
