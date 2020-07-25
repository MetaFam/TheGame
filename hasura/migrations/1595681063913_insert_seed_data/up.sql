INSERT INTO "Player" (id, username) VALUES ('58f2911a-abcd-4210-a78b-c37dddca1157', 'pacobacpac');
INSERT INTO "Account" (player_id, identifier, type) VALUES ('58f2911a-abcd-4210-a78b-c37dddca1157', '0x4194cE73AC3FBBeCE8fFa878c2B5A8C90333E724', 'ETHEREUM');
INSERT INTO "Account" (player_id, identifier, type) VALUES ('58f2911a-abcd-4210-a78b-c37dddca1157', 'pakokrew', 'GITHUB');
INSERT INTO "Account" (player_id, identifier, type) VALUES ('58f2911a-abcd-4210-a78b-c37dddca1157', 'pacobacpac', 'TWITTER');

INSERT INTO "Skill" (id, name) VALUES ('e3e96e33-abcd-4f8e-a3f3-b360a567055c', 'Javascript');
INSERT INTO "Player_Skill" (player_id, skill_id) VALUES ('58f2911a-abcd-4210-a78b-c37dddca1157', 'e3e96e33-abcd-4f8e-a3f3-b360a567055c');

INSERT INTO "Guild" (id, type, identifier, name, logo) VALUES ('cd01cac9-abcd-42c3-908f-b8b0368eeef3', 'ARAGON', '0xd21cf378e2e40bda4597594738bb35e9ccc97da7', 'MetaFam', 'https://metagame.wtf/static/f3f97018016dd123ab7a9d6f8aaecc04/9911c/logo.png');
