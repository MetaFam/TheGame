
CREATE TABLE "public"."Player_Rank"("rank" text NOT NULL, PRIMARY KEY ("rank") );

INSERT INTO "Player_Rank" (rank) VALUES
  ('DIAMOND'),
  ('PLATINUM'),
  ('GOLD'),
  ('SILVER'),
  ('BRONZE');

ALTER TABLE "public"."Player" ADD COLUMN "rank" text NULL;

alter table "public"."Player"
           add constraint "Player_rank_fkey"
           foreign key ("rank")
           references "public"."Player_Rank"
           ("rank") on update restrict on delete restrict;
