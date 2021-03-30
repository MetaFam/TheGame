UPDATE guild SET status = 'ACTIVE';

DELETE FROM "GuildStatus" WHERE status = 'LEGACY';
