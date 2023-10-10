CREATE TABLE "public"."LinkType" (
  "type" text NOT NULL,
  "description" text,
  PRIMARY KEY ("type"),
  UNIQUE ("type")
);
