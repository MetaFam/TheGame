alter table "public"."guild_player" add constraint "guild_player_guild_id_player_id_key" unique ("guild_id", "player_id");
