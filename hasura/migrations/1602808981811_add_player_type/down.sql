
alter table "public"."Player" drop constraint "Player_playerTypeId_fkey";

ALTER TABLE "public"."Player" DROP COLUMN "playerTypeId";

DROP TABLE "public"."PlayerType";
