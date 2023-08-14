alter table "public"."player_account" drop constraint "player_account_type_player_id_key";
alter table "public"."player_account" add constraint "player_account_identifier_type_key" unique ("identifier", "type");
