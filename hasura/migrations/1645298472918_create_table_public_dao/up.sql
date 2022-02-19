CREATE TABLE "public"."dao" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "contract_address" text NOT NULL, 
  "network" text NOT NULL DEFAULT 'mainnet', 
  "label" text NULL, 
  "url" text NULL, 
  "guild_id" uuid NULL, 
  PRIMARY KEY ("id"), 
  FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON UPDATE no action ON DELETE cascade, 
  UNIQUE ("id"),
  UNIQUE ("contract_address")
);
