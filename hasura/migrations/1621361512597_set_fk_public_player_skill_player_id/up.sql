alter table "public"."player_skill" drop constraint "Player_Skill_player_id_fkey",
             add constraint "player_skill_player_id_fkey"
             foreign key ("player_id")
             references "public"."player"
             ("id") on update no action on delete cascade;
