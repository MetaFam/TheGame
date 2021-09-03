CREATE TABLE "public"."PlayerRole"("role" text NOT NULL, "label" text NOT NULL, PRIMARY KEY ("role") , UNIQUE ("role"));

INSERT INTO "public"."PlayerRole" (role, label) 
VALUES ('PATRON', 'Patron'), ('BUILDER', 'Builder'), ('ARTIST', 'Artist'), ('SHILLER', 'Shiller'), ('INNKEEPER', 'Innkeeper'), ('DESIGNER', 'Designer'), ('WRITER', 'Writer');

