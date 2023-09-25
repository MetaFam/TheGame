alter table "public"."player_account"
    add constraint "player_account_pkey" 
    primary key ( "type", "player_id", "identifier" );
