alter table "public"."player_account" drop constraint "Account_player_id_fkey",
             add constraint "player_account_player_id_fkey"
             foreign key ("player_id")
             references "public"."player"
             ("id") on update no action on delete cascade;

alter table "public"."player_skill" drop constraint "Player_Skill_player_id_fkey",
             add constraint "player_skill_player_id_fkey"
             foreign key ("player_id")
             references "public"."player"
             ("id") on update no action on delete cascade;

delete from player
where ethereum_address is null;

ALTER TABLE "public"."player" ALTER COLUMN "ethereum_address" SET NOT NULL;
