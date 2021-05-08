

CREATE TABLE "public"."GuildStatus"("status" text NOT NULL, PRIMARY KEY ("status") , UNIQUE ("status"));

INSERT INTO "public"."GuildStatus" (status) VALUES ('ACTIVE'), ('PENDING'), ('INACTIVE');
ALTER TABLE "public"."guild" ADD COLUMN "status" text NOT NULL DEFAULT 'ACTIVE';

alter table "public"."guild"
           add constraint "guild_status_fkey"
           foreign key ("status")
           references "public"."GuildStatus"
           ("status") on update restrict on delete restrict;
