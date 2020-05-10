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

export default mutations;
