INSERT INTO "AccountType"
  (type) VALUES ('MEETWITHWALLET')
  ON CONFLICT DO NOTHING -- allow multiple runs
;
