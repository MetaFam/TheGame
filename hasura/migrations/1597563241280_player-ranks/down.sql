
alter table "public"."Player" drop constraint "Player_rank_fkey";

ALTER TABLE "public"."Player" DROP COLUMN "rank";

DROP TABLE "public"."Player_Rank";
