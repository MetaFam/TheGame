INSERT INTO dao(contract_address, network, guild_id) 
SELECT moloch_address, 'mainnet', id FROM guild WHERE moloch_address IS NOT NULL;

UPDATE dao SET network = 'xdai' WHERE contract_address IN ('0x30c9aa17fc30e4c23a65680a35b33e8f3b4198a2', '0x5219ffb88175588510e9752A1ecaA3cd217ca783');
