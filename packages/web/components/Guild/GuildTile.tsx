import {
  Flex,
  Heading,
  Link,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import { SquareImage } from 'components/SquareImage';
import { GuildFragment } from 'graphql/autogen/types';
import React from 'react';
import { optimizedImage } from 'utils/imageHelpers';

import { GuildLinksSmall } from './Section/GuildLinks';

type Props = {
  guild: GuildFragment;
};

export const GuildTile: React.FC<Props> = ({ guild }) => (
  <Link
    role="group"
    _hover={{ textDecoration: 'none' }}
    href={`/guild/${guild.guildname}`}
  >
    <MetaTile>
      <MetaTileHeader>
        {guild.logo && (
          <SquareImage src={optimizedImage('logoURL', guild.logo)} />
        )}

        <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
          <Heading
            size="lg"
            color="white"
            bgColor="whiteAlpha.100"
            sx={{ backdropFilter: 'blur(10px)' }}
            lineHeight={1.8}
            justifyContent="center"
            px={3}
            width="full"
            textAlign="center"
            borderRadius={10}
            fontFamily="body"
            fontWeight={400}
          >
            {guild.name}
          </Heading>
        </Flex>
      </MetaTileHeader>
      <MetaTileBody justifyContent="space-between">
        <Flex flexDir="column" gap={2}>
          {guild.description ? (
            <VStack spacing={2} align="stretch">
              <Text textStyle="caption">About</Text>
              <Text fontSize="sm">{guild.description}</Text>
            </VStack>
          ) : null}
          <VStack spacing={2} align="stretch" mb={1}>
            <Text textStyle="caption">Type</Text>
            {guild.type ? (
              <MetaTag size="sm" fontWeight="normal" w="fit-content">
                {guild.type} GUILD
              </MetaTag>
            ) : null}
          </VStack>
          <Flex justifyContent="space-between">
            <VStack spacing={2} align="stretch">
              <Text textStyle="caption">Barrier of Entry</Text>
              <Text fontStyle="italic">Coming soon…</Text>
            </VStack>
            <VStack spacing={2} align="stretch">
              <Text textStyle="caption">Contact</Text>
              <GuildLinksSmall {...{ guild }} />
            </VStack>
          </Flex>
        </Flex>
      </MetaTileBody>
    </MetaTile>
  </Link>
);
