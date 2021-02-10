alter table "public"."quest_completion"
           add constraint "quest_completion_status_fkey"
           foreign key ("status")
           references "public"."QuestCompletionStatus"
           ("status") on update restrict on delete restrict;
