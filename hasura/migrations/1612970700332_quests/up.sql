CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Enums

CREATE TABLE "public"."QuestStatus"(
  "status" text NOT NULL,
  PRIMARY KEY ("status")
);
INSERT INTO "public"."QuestStatus" ("status") VALUES
    ('OPEN'),
    ('CLOSED');

CREATE TABLE "public"."QuestRepetition"("repetition" text NOT NULL, PRIMARY KEY ("repetition") );
INSERT INTO "public"."QuestRepetition" ("repetition") VALUES
    ('UNIQUE'),
    ('PERSONAL'),
    ('RECURRING');

CREATE TABLE "public"."QuestCompletionStatus"("status" text NOT NULL, PRIMARY KEY ("status") );
INSERT INTO "public"."QuestCompletionStatus" ("status") VALUES
    ('PENDING'),
    ('ACCEPTED'),
    ('REJECTED');

-- Tables

CREATE TABLE "public"."quest" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "guild_id" uuid NOT NULL,
  "created_by_player_id" uuid NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "external_link" text,
  "cooldown" integer,
  "status" text NOT NULL DEFAULT 'OPEN',
  "repetition" text NOT NULL DEFAULT 'UNIQUE',
  PRIMARY KEY ("id") ,
  FOREIGN KEY ("created_by_player_id") REFERENCES "public"."player"("id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("status") REFERENCES "public"."QuestStatus"("status") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("repetition") REFERENCES "public"."QuestRepetition"("repetition") ON UPDATE restrict ON DELETE restrict
);

CREATE TABLE "public"."quest_skill"(
  "quest_id" uuid NOT NULL,
  "skill_id" uuid NOT NULL,
  PRIMARY KEY ("quest_id","skill_id"),
  FOREIGN KEY ("quest_id") REFERENCES "public"."quest"("id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON UPDATE restrict ON DELETE restrict
);

CREATE TABLE "public"."quest_completion"(
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "quest_id" uuid NOT NULL,
  "completed_by_player_id" uuid NOT NULL,
  "submitted_at" timestamptz NOT NULL DEFAULT now(),
  "submission_text" text,
  "submission_link" text,
  "status" text NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY ("id") ,
  FOREIGN KEY ("quest_id") REFERENCES "public"."quest"("id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("completed_by_player_id") REFERENCES "public"."player"("id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("status") REFERENCES "public"."QuestCompletionStatus"("status") ON UPDATE restrict ON DELETE restrict
);
