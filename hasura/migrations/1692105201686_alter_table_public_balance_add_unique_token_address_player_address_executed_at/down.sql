alter table "public"."balance" drop constraint "balance_token_address_player_address_executed_at_key";
alter table "public"."balance" add constraint "balance_token_address_player_address_block_height_key" unique ("token_address", "player_address", "block_height");
