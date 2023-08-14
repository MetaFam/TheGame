alter table "public"."player_account" drop constraint "Account_identifier_type_key";
alter table "public"."player_account" add constraint "player_account_type_player_id_key" unique ("type", "player_id");
