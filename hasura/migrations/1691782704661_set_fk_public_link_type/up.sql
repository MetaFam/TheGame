alter table "public"."link"
  add constraint "link_type_fkey"
  foreign key ("type")
  references "public"."LinkType"
  ("type") on update no action on delete no action;
