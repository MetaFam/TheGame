-- Enums

CREATE TYPE account_type AS ENUM (
  'ETHEREUM',
  'DISCORD',
  'GITHUB',
  'TWITTER',
  'DISCOURSE'
);

CREATE TYPE enneagram_type AS ENUM (
  'REFORMER',
  'HELPER',
  'ACHIEVER',
  'INDIVIDUALIST',
  'INVESTIGATOR',
  'LOYALIST',
  'ENTHUSIAST',
  'CHALLENGER',
  'PEACEMAKER'
);

-- Tables

CREATE TABLE "Player" (
  "id" uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
  "username" text NOT NULL,
  "totalXp" numeric DEFAULT 0,
  "role" text,
  "timezone" int,
  "enneagram" enneagram_type
);

CREATE TABLE "Account" (
  "player_id" uuid NOT NULL,
  "identifier" text NOT NULL,
  "type" account_type NOT NULL
);

CREATE TABLE "Guild" (
  "id" uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
  "type" text NOT NULL,
  "identifier" text NOT NULL,
  "name" text NOT NULL,
  "logo" text
);

CREATE TABLE "GuildType" (
  "name" text NOT NULL PRIMARY KEY
);

CREATE TABLE "Skill" (
  "id" uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "Player_Skill" (
  "player_id" uuid NOT NULL,
  "skill_id" uuid NOT NULL
);

-- Uniques

ALTER TABLE ONLY public."Player"
  ADD CONSTRAINT "Player_username_unique_key" UNIQUE (username);

ALTER TABLE ONLY public."Account"
  ADD CONSTRAINT "Account_identifier_unique_key" UNIQUE (identifier);
ALTER TABLE ONLY public."Account"
  ADD CONSTRAINT "Account_identifier_type_player_key" UNIQUE (type, player_id);

ALTER TABLE ONLY public."Player_Skill"
  ADD CONSTRAINT "Player_Skill_unique_key" PRIMARY KEY (player_id, skill_id);

-- Foreign keys

ALTER TABLE "Account" ADD CONSTRAINT "Account_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id");

ALTER TABLE "Player_Skill" ADD CONSTRAINT "Player_Skill_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id");
ALTER TABLE "Player_Skill" ADD CONSTRAINT "Player_Skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill" ("id");

-- Foreign enums

ALTER TABLE "Guild" ADD CONSTRAINT
  "Guild_type_fkey" FOREIGN KEY ("type") REFERENCES "GuildType" ("name");

INSERT INTO "GuildType" ("name") VALUES
  ('ARAGON'),
  ('MOLOCH'),
  ('EVEREST');
