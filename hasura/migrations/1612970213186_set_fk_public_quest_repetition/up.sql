alter table "public"."quest"
           add constraint "quest_repetition_fkey"
           foreign key ("repetition")
           references "public"."QuestRepetition"
           ("repetition") on update restrict on delete restrict;
