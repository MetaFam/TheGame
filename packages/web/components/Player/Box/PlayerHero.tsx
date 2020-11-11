import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Image,
  P,
  Text,
} from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import {
  getPlayerDescription,
  getPlayerImage,
  getPlayerName,
} from 'utils/playerHelpers';

import { PersonalityTypes } from '../../../graphql/types';
import { FlexContainer } from '../../Container';
import { PlayerBox } from './PlayerBoxe';

type Props = { player: PlayerFragmentFragment };
export const PlayerHero: React.FC<Props> = ({ player }) => {
  const [show, setShow] = React.useState(false);

  return (
    <PlayerBox>
      <Container>
        <Flex pt={16} pb={6} pl={2} pr={2} direction="column" align="center">
          <Avatar
            w={{ base: '32', md: '56' }}
            h={{ base: '32', md: '56' }}
            src={getPlayerImage(player)}
            name={getPlayerName(player)}
          />
          <Box pt="8" textAlign="center">
            <Text fontSize="xl" fontFamily="heading" mb="1">
              {getPlayerName(player)}
            </Text>
            {player.playerType?.title && (
              <Text color="offwhite" casing="uppercase">
                {player.playerType.title.toUpperCase()}
              </Text>
            )}
          </Box>
          <Box pt="12" w="100%" textAlign="left">
            <>
              <P>
                {`${getPlayerDescription(player).substring(
                  0,
                  show ? getPlayerDescription(player).length : 115,
                )}${show || '...'} `}
                <Text
                  as="span"
                  fontFamily="body"
                  fontSize="xs"
                  color="cyanText"
                  cursor="pointer"
                  onClick={() => setShow(!show)}
                >
                  Read {show ? 'less' : 'more'}
                </Text>
              </P>
            </>
          </Box>
          <Box pt="8">
            {player.EnneagramType && (
              <HStack py={6} spacing={4}>
                <Image
                  w="100%"
                  maxW="4rem"
                  src={PersonalityTypes[player.EnneagramType.name].image}
                  alt={player.EnneagramType.name}
                  style={{ mixBlendMode: 'color-dodge' }}
                />
                <FlexContainer align="stretch">
                  <Text color="white" fontWeight="bold">
                    {player.EnneagramType.name}
                  </Text>
                  <Text color="blueLight">
                    {player.EnneagramType.description}
                  </Text>
                </FlexContainer>
              </HStack>
            )}
          </Box>
        </Flex>
      </Container>
    </PlayerBox>
  );
};
