alter table "public"."quest"
           add constraint "quest_subcategory_id_fkey"
           foreign key ("subcategory_id")
           references "public"."QuestSubcategory"
           ("id") on update cascade on delete set null;
