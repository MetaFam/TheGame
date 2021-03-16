
alter table "public"."Player" drop constraint "Player_enneagram_fkey";

ALTER TABLE "public"."Player" ALTER COLUMN "enneagram" TYPE USER-DEFINED;

DROP TABLE "public"."EnneagramType";
