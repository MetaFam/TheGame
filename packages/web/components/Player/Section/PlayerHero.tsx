import { Avatar, Box, HStack, Image, Text, VStack } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import {
  getPlayerDescription,
  getPlayerImage,
  getPlayerName,
} from 'utils/playerHelpers';

import { PersonalityTypes } from '../../../graphql/types';
import { FlexContainer } from '../../Container';
import { ProfileSection } from '../../ProfileSection';
import { PlayerContacts } from '../PlayerContacts';
import { PlayerBrightID } from './PlayerBrightID';
import { PlayerCollab } from './PlayerCollab';

const BIO_LENGTH = 240;

type Props = { player: PlayerFragmentFragment };
export const PlayerHero: React.FC<Props> = ({ player }) => {
  const [show, setShow] = React.useState(
    getPlayerDescription(player).length < BIO_LENGTH,
  );

  return (
    <ProfileSection>
      <VStack spacing={8}>
        <Avatar
          w={{ base: '32', md: '56' }}
          h={{ base: '32', md: '56' }}
          src={getPlayerImage(player)}
          name={getPlayerName(player)}
        />
        <Box textAlign="center">
          <Text fontSize="xl" fontFamily="heading" mb="1">
            {getPlayerName(player)}
          </Text>
          <PlayerBrightID player={player} />
        </Box>
        <Box>
          <Text>
            {`${getPlayerDescription(player).substring(
              0,
              show ? getPlayerDescription(player).length : BIO_LENGTH,
            )}${show ? '' : '...'} `}
            {getPlayerDescription(player).length > BIO_LENGTH && (
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
            )}
          </Text>
        </Box>

        <HStack mt="2">
          <PlayerContacts player={player} />
        </HStack>
        <Box w="100%">
          <PlayerCollab player={player} />
        </Box>
        {player.EnneagramType && (
          <HStack spacing={4}>
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
              <Text color="blueLight">{player.EnneagramType.description}</Text>
            </FlexContainer>
          </HStack>
        )}
        {player.playerType?.title ? (
          <FlexContainer align="stretch">
            <Text color="white" fontWeight="bold">
              {player.playerType.title.toUpperCase()}
            </Text>
            <Text color="blueLight">{player.playerType.description}</Text>
          </FlexContainer>
        ) : null}
      </VStack>
    </ProfileSection>
  );
};
