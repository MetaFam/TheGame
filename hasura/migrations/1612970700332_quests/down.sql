
alter table "public"."quest_completion" drop constraint "quest_completion_status_fkey";

ALTER TABLE "public"."quest_completion" DROP COLUMN "status";

DROP TABLE "public"."QuestCompletionStatus";

DROP TABLE "public"."quest_completion";

DROP TABLE "public"."quest_skill";

alter table "public"."quest" drop constraint "quest_repetition_fkey";

ALTER TABLE "public"."quest" DROP COLUMN "repetition";

DROP TABLE "public"."QuestRepetition";

alter table "public"."quest" drop constraint "quest_status_fkey";

ALTER TABLE "public"."quest" ALTER COLUMN "status" DROP NOT NULL;

ALTER TABLE "public"."quest" DROP COLUMN "status";

DROP TABLE "public"."QuestStatus";

DROP TABLE "public"."quest";
