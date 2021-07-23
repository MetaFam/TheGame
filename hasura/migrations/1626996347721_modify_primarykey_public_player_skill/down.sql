alter table "public"."player_skill"
    add constraint "Player_Skill_unique_key" 
    primary key ( "skill_id", "player_id" );
