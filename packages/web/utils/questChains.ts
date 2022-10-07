import { metadata } from '@quest-chains/sdk';

export const QUESTS = {
  ENGAGED: {
    chainId: '0x89',
    address: '0xea512722cc047bfdbe90a1a2750491e89a818ca7',
    graphHealthEndpoint: 'https://api.thegraph.com/index-node/graphql',
  },
  // need to change
  BUILDERS: {
    chainId: '0x89',
    address: '0xea512722cc047bfdbe90a1a2750491e89a818ca7',
    graphHealthEndpoint: 'https://api.thegraph.com/index-node/graphql',
  },
  BRIDGEBUILDERS: {
    chainId: '0x89',
    address: '0xf7fbc471cbae68bf3833ff820c926ffe3c5bf0f7',
    graphHealthEndpoint: 'https://api.thegraph.com/index-node/graphql',
  },
  // need to change
  PATRONS: {
    chainId: '0x89',
    address: '0xea512722cc047bfdbe90a1a2750491e89a818ca7',
    graphHealthEndpoint: 'https://api.thegraph.com/index-node/graphql',
  },
};

export const metadataUploader = new metadata.MetadataUploader();

export type Metadata = metadata.Metadata;
