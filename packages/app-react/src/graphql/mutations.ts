import gql from 'graphql-tag';

const mutations: any = {};

mutations.UpdateBoxProfiles = gql`
mutation UpdateBoxProfiles {
  updateBoxProfile {
    success
    updatedProfiles
  }
}
`;

mutations.UpdateUsername = gql`
mutation UpdateUsername($username: String!) {
  update_Player(
    where: {},
    _set: {
      username: $username
    }
  ) {
    affected_rows
    returning {
      id
      username
    }
  }
}
`;

export default mutations;
