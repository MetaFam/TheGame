const fragments: any = {};

fragments.PlayerFragment = `
fragment PlayerFragment on Player {
  id
}
`;
fragments.AccountFragment = `
fragment AccountFragment on Account {
  identifier
  type
}
`;

export default fragments;
