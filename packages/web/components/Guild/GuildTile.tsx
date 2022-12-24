import {
  Box,
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
    <MetaTile minW={'300px'} height="full" width="full" cursor="pointer">
      <MetaTileHeader>
        {guild.logo && (
          <SquareImage src={optimizedImage('logoURL', guild.logo)} />
        )}

        <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
          <Heading
            size="lg"
            color="white"
            // bgColor="landingGlassDark" // This colour doesn't exist in the design system, should be landingDarkGlass
            backdropFilter="blur(10px)"
            lineHeight={1.8}
            justifyContent="center"
            px={3}
            width="full"
            textAlign="center"
            borderRadius={10}
            fontFamily="body"
            fontWeight={400}
            textShadow="0 0 8px var(--chakra-colors-blackAlpha-400)" // v. light shadow makes the text readable if the logo/avatar is white
          >
            {guild.name}
          </Heading>
        </Flex>
      </MetaTileHeader>
      <MetaTileBody justifyContent="space-between">
        {/**
         * The mb="auto" pushes the last block (Barriers/Contact) down to the bottom of the tile
         */}
        <Flex direction="column" gap={2} mb="auto">
          {guild.description && (
            <VStack spacing={1} align="stretch">
              <Text textStyle="caption">About</Text>
              <Text fontSize="sm" noOfLines={4}>
                {guild.description}
              </Text>
            </VStack>
          )}
          <VStack spacing={1} align="stretch" mb={1}>
            <Text textStyle="caption">Type</Text>
            {guild.type && (
              <>
                <Text textStyle="caption">Type</Text>
                <MetaTag size="sm" fontWeight="normal" w="fit-content">
                  {guild.type} GUILD
                </MetaTag>
              </>
            )}
          </VStack>
        </Flex>

        <Box>
          <Flex justifyContent="space-between">
            <VStack spacing={1} align="stretch">
              <Text textStyle="caption">Barrier of Entry</Text>
              <Text fontStyle="italic">Coming soon…</Text>
            </VStack>
            <VStack spacing={1} align="stretch">
              <Text textStyle="caption">Contact</Text>
              <GuildLinksSmall {...{ guild }} />
            </VStack>
          </Flex>
        </Box>
      </MetaTileBody>
    </MetaTile>
  </Link>
);
