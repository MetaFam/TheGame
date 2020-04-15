const fragments: any = {};

fragments.PlayerFragment = `
fragment PlayerFragment on Player {
  id
}
`;
fragments.ProfileFragment = `
fragment ProfileFragment on Profile {
  identifier
}
`;

export default fragments;
