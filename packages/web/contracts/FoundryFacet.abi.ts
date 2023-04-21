export default [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'burner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'meTokensBurned',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsReturned',
        type: 'uint256',
      },
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'donor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
    ],
    name: 'Donate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'meToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetsDeposited',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'meTokensMinted',
        type: 'uint256',
      },
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'meTokensBurned', type: 'uint256' },
      { internalType: 'address', name: 'recipient', type: 'address' },
    ],
    name: 'burn',
    outputs: [
      { internalType: 'uint256', name: 'assetsReturned', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'meTokensBurned', type: 'uint256' },
      { internalType: 'address', name: 'sender', type: 'address' },
    ],
    name: 'calculateAssetsReturned',
    outputs: [
      { internalType: 'uint256', name: 'assetsReturned', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'assetsDeposited', type: 'uint256' },
    ],
    name: 'calculateMeTokensMinted',
    outputs: [
      { internalType: 'uint256', name: 'meTokensMinted', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'assetsDeposited', type: 'uint256' },
    ],
    name: 'donate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'assetsDeposited', type: 'uint256' },
      { internalType: 'address', name: 'recipient', type: 'address' },
    ],
    name: 'mint',
    outputs: [
      { internalType: 'uint256', name: 'meTokensMinted', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'meToken', type: 'address' },
      { internalType: 'uint256', name: 'assetsDeposited', type: 'uint256' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'uint8', name: 'vSig', type: 'uint8' },
      { internalType: 'bytes32', name: 'rSig', type: 'bytes32' },
      { internalType: 'bytes32', name: 'sSig', type: 'bytes32' },
    ],
    name: 'mintWithPermit',
    outputs: [
      { internalType: 'uint256', name: 'meTokensMinted', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
