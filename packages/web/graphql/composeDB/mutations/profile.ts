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

export const mutationComposeDBCreateProfileTimeZone = /* GraphQL */ `
  mutation ComposeDBCreateProfileTimeZone($input: CreateProfileTimeZoneInput!) {
    createProfileTimeZone(input: $input) {
      document {
        iana
        utcOffset
        abbreviation
      }
    }
  }
`;

export const mutationComposeDBCreateProfileAvailability = /* GraphQL */ `
  mutation ComposeDBCreateProfileAvailability(
    $input: CreateProfileAvailabilityInput!
  ) {
    createProfileAvailability(input: $input) {
      document {
        weeklyHours
      }
    }
  }
`;
