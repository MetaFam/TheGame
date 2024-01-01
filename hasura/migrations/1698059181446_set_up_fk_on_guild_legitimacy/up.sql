alter table "public"."guild"
  add constraint "guild_legitimacy_fkey"
  foreign key ("legitimacy")
  references "public"."GuildLegitimacy"
  ("value") on update restrict on delete cascade;
