alter table "public"."xp"
  add constraint "xp_token_address_fkey"
  foreign key ("token_address")
  references "public"."token"
  ("address") on update no action on delete no action;
