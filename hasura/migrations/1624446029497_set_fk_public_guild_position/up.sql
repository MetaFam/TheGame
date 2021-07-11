alter table "public"."guild"
           add constraint "guild_position_fkey"
           foreign key ("position")
           references "public"."GuildPosition"
           ("position") on update cascade on delete restrict;
