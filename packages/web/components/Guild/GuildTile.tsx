import {
  Avatar,
  Heading,
  LinkBox,
  LinkOverlay,
  MetaButton,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import { GuildFragment } from 'graphql/autogen/types';
import NextLink from 'next/link';
import React from 'react';

type Props = {
  guild: GuildFragment;
};

export const GuildTile: React.FC<Props> = ({ guild }) => (
  <LinkBox>
    <MetaTile>
      <NextLink
        as={`/guild/${guild.guildname}`}
        href="/guild/[guildname]"
        passHref
      >
        <LinkOverlay>
          <MetaTileHeader>
            <VStack align="center">
              {guild.logo ? (
                <Avatar size="xl" src={guild.logo} name={guild.name} />
              ) : null}

              <Heading size="sm" color="white">
                {guild.name}
              </Heading>
              {guild.type ? (
                <MetaTag size="md" w="fit-content">
                  {guild.type}
                  GUILD
                </MetaTag>
              ) : null}
            </VStack>
            {guild.description ? (
              <VStack spacing={2} align="stretch">
                <Text textStyle="caption">ABOUT</Text>
                <Text fontSize="sm">{guild.description}</Text>
              </VStack>
            ) : null}
          </MetaTileHeader>
        </LinkOverlay>
      </NextLink>
      <MetaTileBody>
        {guild.joinButtonUrl ? (
          <MetaButton as="a" href={guild.joinButtonUrl} target="_blank">
            Join
          </MetaButton>
        ) : null}
      </MetaTileBody>
    </MetaTile>
  </LinkBox>
);
