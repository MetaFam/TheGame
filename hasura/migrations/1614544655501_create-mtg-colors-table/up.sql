CREATE TABLE public."ColorAspect" (
  mask integer PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text NULL
);

INSERT INTO "ColorAspect" (mask, name) VALUES
  (/*00000*/ 0, 'Colorless'),
  (/*00001*/ 'x01'::bit(8)::int, 'Green'),
  (/*00010*/ 'x02'::bit(8)::int, 'Red'),
  (/*00011*/ 'x03'::bit(8)::int, 'The Gruul Clans'),
  (/*00100*/ 'x04'::bit(8)::int, 'Black'),
  (/*00101*/ 'x05'::bit(8)::int, 'The Golgari Swarm'),
  (/*00110*/ 'x06'::bit(8)::int, 'The Cult of Rakdos'),
  (/*00111*/ 'x07'::bit(8)::int, 'The Jund Shard'),
  (/*01000*/ 'x08'::bit(8)::int, 'Blue'),
  (/*01001*/ 'x09'::bit(8)::int, 'The Simic Combine'),
  (/*01010*/ 'x0A'::bit(8)::int, 'The Izzet League'),
  (/*01011*/ 'x0B'::bit(8)::int, 'The Temur Frontier'),
  (/*01100*/ 'x0C'::bit(8)::int, 'The House Dimir'),
  (/*01101*/ 'x0D'::bit(8)::int, 'The Sultai Brood'),
  (/*01110*/ 'x0E'::bit(8)::int, 'The Grixis Shard'),
  (/*01111*/ 'x0F'::bit(8)::int, 'Chaos'),
  (/*10000*/ 'x10'::bit(8)::int, 'White'),
  (/*10001*/ 'x11'::bit(8)::int, 'The Selesnya Conclave'),
  (/*10010*/ 'x12'::bit(8)::int, 'The Boros Legion'),
  (/*10011*/ 'x13'::bit(8)::int, 'The Naya Shard'),
  (/*10100*/ 'x14'::bit(8)::int, 'The Orzhov Syndicate'),
  (/*10101*/ 'x15'::bit(8)::int, 'The Abzan Houses'),
  (/*10110*/ 'x16'::bit(8)::int, 'The Mardu Horde'),
  (/*10111*/ 'x17'::bit(8)::int, 'Aggression'),
  (/*11000*/ 'x18'::bit(8)::int, 'The Azorius Senate'),
  (/*11001*/ 'x19'::bit(8)::int, 'The Bant Shard'),
  (/*11010*/ 'x1A'::bit(8)::int, 'The Jeskai Way'),
  (/*11011*/ 'x1B'::bit(8)::int, 'Altruism'),
  (/*11100*/ 'x1C'::bit(8)::int, 'The Esper Shard'),
  (/*11101*/ 'x1D'::bit(8)::int, 'Growth'),
  (/*11110*/ 'x1E'::bit(8)::int, 'Artifice'),
  (/*11111*/ 'x1F'::bit(8)::int, 'Balance')
;

UPDATE "ColorAspect"
  SET description = 'Harmony through acceptance…'
  WHERE name = 'Green'
;
UPDATE "ColorAspect"
  SET description = 'Peace through order…'
  WHERE name = 'White'
;
UPDATE "ColorAspect"
  SET description = 'Perfection through knowledge…'
  WHERE name = 'Blue'
;
UPDATE "ColorAspect"
  SET description = 'Satisfaction through ruthlessness…'
  WHERE name = 'Black'
;
UPDATE "ColorAspect"
  SET description = 'Freedom through action…'
  WHERE name = 'Red'
;

ALTER TABLE public.player
  ADD COLUMN color_mask integer
;

ALTER TABLE public.player
  ADD CONSTRAINT player_color_mask_fkey
  FOREIGN KEY (color_mask)
  REFERENCES public."ColorAspect"(mask)
  ON UPDATE restrict ON DELETE restrict
;
