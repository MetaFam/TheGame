export const PlayerFragment = `
fragment PlayerFragment on Player {
  id
  username
  ethereum_address
}
`;

export const BoxProfileFragment = `
fragment BoxProfileFragment on BoxProfile {
  ethereumAddress
  name
  description
  location
  job
  emoji
  imageUrl
}
`;

export const AccountFragment = `
fragment AccountFragment on Account {
  identifier
  type
}
`;
