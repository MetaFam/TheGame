DELETE FROM "Guild";
DELETE FROM "GuildType";

INSERT INTO "GuildType" ("name") VALUES
  ('PROJECT'),
  ('SERVICE'),
  ('RESEARCH'),
  ('SOCIAL'),
  ('FUNDING');
