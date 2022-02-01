alter table "public"."player_skill" add constraint "player_skill_player_id_skill_id_key" unique ("player_id", "skill_id");
