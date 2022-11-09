import {
  Flex,
  Heading,
  Image,
  Link,
  LinkBox,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import { GuildFragment } from 'graphql/autogen/types';
import NextLink from 'next/link';
import React from 'react';
import { optimizedImage } from 'utils/imageHelpers';

import { GuildLinksSmall } from './Section/GuildLinks';

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
        <Link
          _hover={{
            textUnderline: 'none',
          }}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <MetaTileHeader>
            <VStack pos="relative" h="22rem" justifyContent="center" p={4}>
              {guild.logo ? (
                <Image
                  src={optimizedImage('logoURL', guild.logo)}
                  borderTopRadius={10}
                />
              ) : null}

              <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
                <Heading
                  size="lg"
                  color="white"
                  bgColor="rgba(255, 255, 255, 0.06)"
                  style={{ backdropFilter: 'blur(10px)' }}
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
            </VStack>
          </MetaTileHeader>
          <MetaTileBody justifyContent="space-between">
            <Flex flexDir="column" gap={2}>
              {guild.description ? (
                <VStack spacing={2} align="stretch">
                  <Text textStyle="caption">ABOUT</Text>
                  <Text fontSize="sm">{guild.description}</Text>
                </VStack>
              ) : null}
              <VStack spacing={2} align="stretch">
                <Text textStyle="caption">Skills</Text>
                <Text fontStyle="italic">Coming soon...</Text>
              </VStack>
              <Flex justifyContent="space-between">
                <VStack spacing={2} align="stretch">
                  <Text textStyle="caption">BARRIER OF ENTRY</Text>
                  <Text fontStyle="italic">Coming soon...</Text>
                </VStack>
                <VStack spacing={2} align="stretch">
                  <Text textStyle="caption">CONTACT</Text>
                  <GuildLinksSmall {...{ guild }} />
                </VStack>
              </Flex>
            </Flex>
          </MetaTileBody>
        </Link>
      </NextLink>
    </MetaTile>
  </LinkBox>
);
