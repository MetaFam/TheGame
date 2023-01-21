export const mutationComposeDBCreateProfileUsername = /* GraphQL */ `
  mutation ComposeDBCreateProfileUsername($input: CreateProfileUsernameInput!) {
    createProfileUsername(input: $input) {
      document {
        username
      }
    }
  }
`;
