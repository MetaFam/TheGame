alter table "public"."link" drop constraint "link_type_fkey",
             add constraint "link_type_fkey"
             foreign key ("type")
             references "public"."LinkType"
             ("type") on update cascade on delete set null;
