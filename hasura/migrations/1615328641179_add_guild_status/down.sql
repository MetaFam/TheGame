
alter table "public"."guild" drop constraint "guild_status_fkey";


ALTER TABLE "public"."guild" DROP COLUMN "status";

DROP TABLE "public"."GuildStatus";
