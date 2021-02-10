CREATE TABLE "public"."QuestRepetition"("repetition" text NOT NULL, PRIMARY KEY ("repetition") );
INSERT INTO "public"."QuestStatus" ("status") VALUES
    ('ONCE'),
    ('ONCE_PER_PLAYER'),
    ('RECURRING')
