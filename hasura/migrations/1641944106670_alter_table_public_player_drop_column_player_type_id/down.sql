ALTER TABLE "public"."player" ADD COLUMN "player_type_id" int4;
ALTER TABLE "public"."player" ALTER COLUMN "player_type_id" DROP NOT NULL;
ALTER TABLE "public"."player" ADD CONSTRAINT Player_playerTypeId_fkey FOREIGN KEY (player_type_id) REFERENCES "public"."ExplorerType" (id) ON DELETE restrict ON UPDATE cascade;
