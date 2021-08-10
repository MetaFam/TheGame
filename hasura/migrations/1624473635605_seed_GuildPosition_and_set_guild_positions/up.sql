INSERT INTO "public"."GuildPosition" (position) VALUES ('EXTERNAL');
INSERT INTO "public"."GuildPosition" (position) VALUES ('INTERNAL');

UPDATE "public"."guild" SET position = 'EXTERNAL';
