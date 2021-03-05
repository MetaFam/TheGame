import {
  Avatar, Box, HStack, Text, VStack
} from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { PersonalityOption } from 'graphql/types';
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
import { ColorImage } from './ColorImage';
import { PlayerBrightId } from './PlayerBrightId';
import { PlayerCollab } from './PlayerCollab';

const MAX_BIO_LENGTH = 240;

type Props = { player: PlayerFragmentFragment };
export const PlayerHero: React.FC<Props> = ({ player }) => {
  const description = getPlayerDescription(player);
  const [show, setShow] = React.useState(description.length <= MAX_BIO_LENGTH);
  const [types, setTypes] = React.useState<{
    [any: string]: PersonalityOption;
  }>();
  const mask = player?.ColorAspect?.mask;
  const type = mask && types?.[mask];

  const loadTypes = async () => {
    const { types: list } = await getPersonalityInfo();
    setTypes(list);
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
          <Text fontSize="xl" fontFamily="heading" mb={1}>
            {getPlayerName(player)}
          </Text>
          <PlayerBrightId player={player} />
        </Box>
        <Box>
          <Text>
            {show
              ? description
              : `${description.substring(0, MAX_BIO_LENGTH - 9)}…`
            }
            {description.length > MAX_BIO_LENGTH && (
              <Text
                as="span"
                fontFamily="body"
                fontSize="xs"
                color="cyanText"
                cursor="pointer"
                onClick={() => setShow(s => !s)}
                pl={1}
              >
                Read {show ? 'less' : 'more'}
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
          <HStack spacing={4} w='100%'>
            <ColorImage {...{ type, types }} maxH='8rem'/>
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
