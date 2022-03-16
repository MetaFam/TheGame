UPDATE "PlayerRole" SET description = 'From meme lords to NFT artists, they are here to add beauty and contribute creative visions.' WHERE role = 'ARTIST';
UPDATE "PlayerRole" SET description = 'Builders speak the languages of computers, they are here to turn pretty designs into code.' WHERE role = 'BUILDER';
UPDATE "PlayerRole" SET description = 'Designers are here to conjure up  epic interfaces and experiences for others to enjoy.' WHERE role = 'DESIGNER';
UPDATE "PlayerRole" SET description = 'Worried about wellbeing, making sure glasses are full, questions answers & players content.' WHERE role = 'INNKEEPER';
UPDATE "PlayerRole" SET description = 'Shillers are here to help us communicate with the wider world and convert the masses.' WHERE role = 'SHILLER';
UPDATE "PlayerRole" SET description = 'From scribing notes to writing specs & memes that could convert a stoic; they have a way with words.' WHERE role = 'WRITER';

INSERT INTO "public"."PlayerRole" (role, label, description) 
VALUES ('FUNDSTER', 'Fundster', 'Simply too busy to help people build, they are here to buy tokens & donate instead.');

DELETE FROM "PlayerRole" WHERE role='PATRON';
