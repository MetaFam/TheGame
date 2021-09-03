CREATE TABLE "public"."PlayerRole"("role" text NOT NULL, "label" text NOT NULL, PRIMARY KEY ("role") , UNIQUE ("role"));

INSERT INTO "public"."PlayerRole" (role, label) 
VALUES ('PATRON', 'Patron'), ('BUILDER', 'Builder'), ('ARTIST', 'artist'), ('SHILLER', 'shiller'), ('INNKEEPER', 'Innkeeper'), ('DESIGNER', 'Designer'), ('WRITER', 'writer');

