INSERT INTO "AccountType"
  (type) VALUES ('DEWORK')
  ON CONFLICT DO NOTHING -- allow multiple runs
;
