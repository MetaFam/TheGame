alter table "public"."quest"
           add constraint "quest_status_fkey"
           foreign key ("status")
           references "public"."QuestStatus"
           ("status") on update restrict on delete restrict;
