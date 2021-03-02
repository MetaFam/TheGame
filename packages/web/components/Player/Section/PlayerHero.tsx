import { Avatar, Box, HStack, Image, Text, VStack } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { PersonalityPartInfo } from 'graphql/types';
import React, { useEffect } from 'react';
import {
  getPlayerDescription,
  getPlayerImage,
  getPlayerName,
} from 'utils/playerHelpers';

import { getPersonalityInfo } from '../../../graphql/getPersonalityInfo';
import { FlexContainer } from '../../Container';
import { ProfileSection } from '../../ProfileSection';
import { PlayerContacts } from '../PlayerContacts';
import { PlayerCollab } from './PlayerCollab';

const MAX_BIO_LENGTH = 240;

type Props = { player: PlayerFragmentFragment };
export const PlayerHero: React.FC<Props> = ({ player }) => {
  const description = getPlayerDescription(player);
  const [show, setShow] = React.useState(description.length <= MAX_BIO_LENGTH);
  const [types, setTypes] = React.useState<{
    [any: string]: PersonalityPartInfo;
  }>();
  const type = types?.[player.color_mask];

  const loadTypes = async () => {
    const { types: ts } = await getPersonalityInfo();
    setTypes(ts);
  };
  useEffect(() => {
    loadTypes();
  }, []);

  return (
    <ProfileSection>
      <VStack spacing={8}>
        <Avatar
          w={{ base: 32, md: 56 }}
          h={{ base: 32, md: 56 }}
          src={getPlayerImage(player)}
          name={getPlayerName(player)}
        />
        <Box textAlign="center">
          <Text fontSize="xl" fontFamily="heading" mb="1">
            {getPlayerName(player)}
          </Text>
        </Box>
        <Box>
          <Text>
            {show
              ? description
              : `${description.substring(0, MAX_BIO_LENGTH)}…`}
            {description.length > MAX_BIO_LENGTH && (
              <Text
                as="span"
                fontFamily="body"
                fontSize="xs"
                color="cyanText"
                cursor="pointer"
                onClick={() => setShow((s) => !s)}
              >
                Read {show ? 'Less' : 'More'}
              </Text>
            )}
          </Text>
        </Box>

        <HStack mt={2}>
          <PlayerContacts player={player} />
        </HStack>
        <Box w="100%">
          <PlayerCollab player={player} />
        </Box>
        {type && (
          <HStack spacing={4}>
            <Image
              w="100%"
              maxW="4rem"
              src={type.image}
              alt={type.name}
              style={{ mixBlendMode: 'color-dodge' }}
            />
            <FlexContainer align="stretch">
              <Text color="white" fontWeight="bold">
                {type.name}
              </Text>
              <Text color="blueLight">{type.description}</Text>
            </FlexContainer>
          </HStack>
        )}
        {player.playerType?.title && (
          <FlexContainer align="stretch">
            <Text color="white" fontWeight="bold" textTransform="uppercase">
              {player.playerType.title}
            </Text>
            <Text color="blueLight">{player.playerType.description}</Text>
          </FlexContainer>
        )}
      </VStack>
    </ProfileSection>
  );
};
