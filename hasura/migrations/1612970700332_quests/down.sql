alter table "public"."quest_completion" drop constraint "quest_completion_quest_id_fkey";
alter table "public"."quest_completion" drop constraint "quest_completion_completed_by_player_id_fkey";
alter table "public"."quest_completion" drop constraint "quest_completion_status_fkey";

DROP TABLE "public"."quest_completion";

alter table "public"."quest_skill" drop constraint "quest_skill_quest_id_fkey";
alter table "public"."quest_skill" drop constraint "quest_skill_skill_id_fkey";

DROP TABLE "public"."quest_skill";

alter table "public"."quest" drop constraint "quest_created_by_player_id_fkey";
alter table "public"."quest" drop constraint "quest_guild_id_fkey";
alter table "public"."quest" drop constraint "quest_status_fkey";
alter table "public"."quest" drop constraint "quest_repetition_fkey";

DROP TABLE "public"."quest";

DROP TABLE "public"."QuestRepetition";

DROP TABLE "public"."QuestStatus";

DROP TABLE "public"."QuestCompletionStatus";
