alter table "public"."link"
           add constraint "link_type_fkey"
           foreign key ("type")
           references "public"."LinkType"
           ("status") on update cascade on delete set null;
