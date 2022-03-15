CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."QuestSubcategory"("name" text NOT NULL, "description" text, "category" text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , FOREIGN KEY ("category") REFERENCES "public"."QuestCategory"("name") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"), UNIQUE ("category", "name"));
