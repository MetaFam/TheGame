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
  "id" uuid DEFAULT public.gen_random_uuid() NOT NULL,
  "username" text NOT NULL,
  "totalXp" numeric DEFAULT 0,
  "role" text,
  "timezone" int,
  "enneagram" enneagram_type,
  "skills" text[]
);

CREATE TABLE "Account" (
  "player_id" uuid NOT NULL,
  "identifier" text NOT NULL,
  "type" account_type NOT NULL
);

CREATE TABLE "Guild" (
  "id" uuid DEFAULT public.gen_random_uuid() NOT NULL,
  "identifier" text NOT NULL,
  "name" text NOT NULL
);

-- Primary keys

ALTER TABLE ONLY public."Player"
  ADD CONSTRAINT "Player_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Guild"
  ADD CONSTRAINT "Guild_pkey" PRIMARY KEY (id);

-- Uniques

ALTER TABLE ONLY public."Player"
  ADD CONSTRAINT "Player_username_unique_key" UNIQUE (username);

ALTER TABLE ONLY public."Account"
  ADD CONSTRAINT "Account_identifier_unique_key" UNIQUE (identifier);
ALTER TABLE ONLY public."Account"
  ADD CONSTRAINT "Account_identifier_type_player_key" UNIQUE (type, player_id);

-- Foreign keys

ALTER TABLE "Account" ADD CONSTRAINT "Account_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id");
