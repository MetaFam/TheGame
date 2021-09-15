ALTER TABLE "public"."PlayerRole" ADD COLUMN "emoji" bpchar NULL;
ALTER TABLE "public"."PlayerRole" ADD COLUMN "description" text NULL;

UPDATE "PlayerRole" SET emoji = '💰', description = 'Patrons are simply too busy to help us build MetaGame, so they buy Seeds instead.' WHERE role = 'PATRON';
UPDATE "PlayerRole" SET emoji = '🍻', description = 'The soul of MetaGame — innkeepers welcome new travelers, make them feel at home and help them find their place.' WHERE role = 'INNKEEPER';
UPDATE "PlayerRole" SET emoji = '📐', description = 'Designers are players interested in conjuring up interfaces and experiences for all other MetaGame players.' WHERE role = 'DESIGNER';
UPDATE "PlayerRole" SET emoji = '🎨', description = 'From meme lords to NFT artists; artists are here to embellish MetaGame with beauty and contribute creative vision.' WHERE role = 'ARTIST';
UPDATE "PlayerRole" SET emoji = '📣', description = 'Shillers are here to help us communicate the memes of MetaGame to the wider world, and recruit the masses.' WHERE role = 'SHILLER';
UPDATE "PlayerRole" SET emoji = '🖋', description = 'From scribing notes to writing specs & memes that could convert a stoic; writers have a way with words.' WHERE role = 'WRITER';
UPDATE "PlayerRole" SET emoji = '👷', description = 'Builders speak the languages of computers, they are here to bring designer''s visions to life and make them reality.' WHERE role = 'BUILDER';
