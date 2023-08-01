alter table "public"."link"
           add constraint "link_guild_id_fkey"
           foreign key ("guild_id")
           references "public"."guild"
           ("id") on update cascade on delete cascade;
