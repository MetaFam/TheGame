ALTER TABLE "public"."balance" ALTER COLUMN "player_id" TYPE text;
alter table "public"."balance" rename column "player_id" to "player_address";
