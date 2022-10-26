ALTER TABLE "public"."guild" ADD COLUMN "position" text;
ALTER TABLE "public"."guild" ALTER COLUMN "position" DROP NOT NULL;
ALTER TABLE "public"."guild" ADD CONSTRAINT guild_position_fkey FOREIGN KEY (position) REFERENCES "public"."GuildPosition" (position) ON DELETE restrict ON UPDATE cascade;
