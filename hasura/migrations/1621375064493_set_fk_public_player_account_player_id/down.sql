alter table "public"."player_account" drop constraint "player_account_player_id_fkey",
          add constraint "Account_player_id_fkey"
          foreign key ("player_id")
          references "public"."player"
          ("id")
          on update no action
          on delete no action;
