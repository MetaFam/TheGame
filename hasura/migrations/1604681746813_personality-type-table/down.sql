
alter table "public"."Player" drop constraint "Player_personality_fkey";

ALTER TABLE "public"."Player" DROP COLUMN "personality";

DROP TABLE "public"."PersonalityType";
