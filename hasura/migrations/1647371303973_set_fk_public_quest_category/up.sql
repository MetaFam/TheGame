alter table "public"."quest"
           add constraint "quest_category_fkey"
           foreign key ("category")
           references "public"."QuestCategory"
           ("name") on update cascade on delete set null;
