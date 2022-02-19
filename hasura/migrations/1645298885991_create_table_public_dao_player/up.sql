CREATE TABLE "public"."dao_player" (
  "dao_id" uuid NOT NULL, 
  "player_id" uuid NOT NULL, 
  PRIMARY KEY ("dao_id","player_id"), 
  FOREIGN KEY ("dao_id") REFERENCES "public"."dao"("id") ON UPDATE restrict ON DELETE cascade, 
  FOREIGN KEY ("player_id") REFERENCES "public"."player"("id") ON UPDATE restrict ON DELETE cascade
);
