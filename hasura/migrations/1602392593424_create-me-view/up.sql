CREATE OR REPLACE VIEW "public"."me" AS
 SELECT "Player".id,
    "Player".username,
    "Player".ethereum_address
   FROM "Player";
