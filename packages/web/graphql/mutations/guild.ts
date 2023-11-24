export const UpdateGuildMutations = /* GraphQL */ `
  mutation AuthenticateDiscordGuild($code: String!) {
    authenticateDiscordGuild(code: $code) {
      success
      guildname
      error
      exists
    }
  }

  mutation UpdateGuild($guildInfo: GuildInfoInput!) {
    saveGuildInformation(guildInformation: $guildInfo) {
      success
      error
    }
  }

  mutation UpdateGuildLayout($guildLayoutInfo: GuildLayoutInfoInput!) {
    saveGuildLayout(guildLayoutInfo: $guildLayoutInfo) {
      success
      error
    }
  }

  mutation GetGuildLinksNoCache($guildId: uuid!, $updatedAt: timestamptz!) {
    update_guild(
      where: { id: { _eq: $guildId } }
      _set: { updatedAt: $updatedAt }
    ) {
      returning {
        links {
          id
          name
          type
          url
          guildId
        }
      }
    }
  }

  mutation AddUnverifiedGuild(
    $description: String
    $guildname: String!
    $joinURL: String
    $logo: String!
    $name: String!
    $websiteURL: String
    $type: GuildType_enum!
  ) {
    insert_guild(
      objects: {
        description: $description
        guildname: $guildname
        joinButtonUrl: $joinURL
        legitimacy: "UNVERIFIED"
        logo: $logo
        name: $name
        websiteUrl: $websiteURL
        type: $type
      }
    ) {
      returning {
        id
      }
      affected_rows
    }
  }

  mutation AddGuildLink(
    $guildId: uuid!
    $name: String
    $url: String!
    $type: LinkType_enum
  ) {
    insert_link_one(
      object: { name: $name, type: $type, url: $url, guildId: $guildId }
    ) {
      id
    }
  }

  mutation DeleteGuildLink($id: uuid!) {
    delete_link(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }

  mutation UpdateGuildLink(
    $id: uuid!
    $name: String
    $url: String!
    $type: LinkType_enum
  ) {
    update_link(
      where: { id: { _eq: $id } }
      _set: { name: $name, type: $type, url: $url }
    ) {
      affected_rows
    }
  }
`;
