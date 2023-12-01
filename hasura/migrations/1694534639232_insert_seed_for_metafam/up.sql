INSERT INTO xp(
  initial,
  player_id,
  token_address,
  balance
) (
  SELECT
    total_xp,
    id,
    '0xEAeCC18198a475c921B24b8A6c1C1f0f5F3F7EA0',
    0
  FROM player
);
