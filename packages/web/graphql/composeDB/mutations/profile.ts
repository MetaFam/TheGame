export const mutationComposeDBCreateProfileName = /* GraphQL */ `
  mutation ComposeDBCreateProfileName($input: CreateProfileNameInput!) {
    createProfileName(input: $input) {
      document {
        name
      }
    }
  }
`;

export const mutationComposeDBCreateProfileDescription = /* GraphQL */ `
  mutation ComposeDBCreateProfileDescription(
    $input: CreateProfileDescriptionInput!
  ) {
    createProfileDescription(input: $input) {
      document {
        description
      }
    }
  }
`;

export const mutationComposeDBCreateProfileDisposition = /* GraphQL */ `
  mutation ComposeDBCreateProfileDisposition(
    $input: CreateProfileDispositionInput!
  ) {
    createProfileDisposition(input: $input) {
      document {
        fiveColorDisposition
        explorerType
      }
    }
  }
`;
