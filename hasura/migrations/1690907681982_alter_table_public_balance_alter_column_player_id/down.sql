ALTER TABLE "public"."balance" ALTER COLUMN "player_id" TYPE uuid;
alter table "public"."balance" rename column "player_address" to "player_id";
