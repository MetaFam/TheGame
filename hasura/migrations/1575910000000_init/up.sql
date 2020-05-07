-- Enums

CREATE TYPE profile_type AS ENUM (
  'ETHEREUM',
  'DISCORD',
  'GITHUB',
  'DISCOURSE'
);

CREATE TYPE player_rank AS ENUM (
  'PLAYER',
  'BRONZE',
  'SILVER',
  'GOLDEN',
  'PLATINIUM',
  'DIAMOND'
);

-- Tables

CREATE TABLE "Player" (
  "id" uuid DEFAULT public.gen_random_uuid() NOT NULL,
  "totalXp" numeric DEFAULT 0,
  "rank" player_rank NOT NULL DEFAULT 'PLAYER',
  "links" json,
  "sentences" json
);

CREATE TABLE "Profile" (
  "player_id" uuid NOT NULL,
  "identifier" text NOT NULL,
  "linkToProof" text,
  "type" profile_type NOT NULL
);

CREATE TABLE "Quest" (
  "id" uuid DEFAULT public.gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "url" text NOT NULL,
  "xp" numeric NOT NULL DEFAULT 0
);

CREATE TABLE "Quest_Completed" (
  "quest_id" uuid NOT NULL,
  "player_id" uuid NOT NULL,
  "time" timestamp
);

CREATE TABLE "XPInterval" (
  "player_id" uuid NOT NULL,
  "startTime" date,
  "endTime" date,
  "xp" numeric NOT NULL
);

CREATE TABLE "Guild" (
  "id" uuid DEFAULT public.gen_random_uuid() NOT NULL,
  "name" text
);

CREATE TABLE "Guild_Member" (
  "guild_id" uuid NOT NULL,
  "player_id" uuid NOT NULL
);

-- Primary keys

ALTER TABLE ONLY public."Player"
  ADD CONSTRAINT "Player_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Quest"
  ADD CONSTRAINT "Quest_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Guild"
  ADD CONSTRAINT "Guild_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Quest_Completed"
  ADD CONSTRAINT "Quest_Completed_pkey" PRIMARY KEY (quest_id, player_id);

ALTER TABLE ONLY public."Guild_Member"
  ADD CONSTRAINT "Guild_Member_pkey" PRIMARY KEY (guild_id, player_id);

-- Uniques

ALTER TABLE ONLY public."Profile"
  ADD CONSTRAINT "Profile_identifier_key" UNIQUE (identifier);

-- Foreign keys

ALTER TABLE "Profile" ADD CONSTRAINT "Profile_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id");

ALTER TABLE "Quest_Completed" ADD CONSTRAINT "Quest_Completed_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id");
ALTER TABLE "Quest_Completed" ADD CONSTRAINT "Quest_Completed_quest_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "Quest" ("id");

ALTER TABLE "Guild_Member" ADD CONSTRAINT "Guild_Member_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id");
ALTER TABLE "Guild_Member" ADD CONSTRAINT "Guild_Member_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("id");

ALTER TABLE "XPInterval" ADD CONSTRAINT "XPInterval_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id");
