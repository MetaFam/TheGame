import { Box, Flex, HStack, Link, Text, VStack } from '@metafam/ds';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { getPersonalityInfo } from 'graphql/getPersonalityInfo';
import { PersonalityOption } from 'graphql/types';
import React, { useEffect } from 'react';
import { getPlayerDescription, getPlayerName } from 'utils/playerHelpers';

import { FlexContainer } from '../../Container';
import { ProfileSection } from '../../ProfileSection';
import { ColorBar } from '../ColorBar';
import { PlayerContacts } from '../PlayerContacts';
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
        <PlayerAvatar
          w={{ base: 32, md: 56 }}
          h={{ base: 32, md: 56 }}
          {...{ player }}
        />
        <Box textAlign="center">
          <Text fontSize="xl" fontFamily="heading" mb={1}>
            {getPlayerName(player)}
          </Text>
          <PlayerBrightId player={player} />
        </Box>
        <Box>
          <Text fontSize={{ base: 'sm', sm: 'md' }}>
            {show
              ? description
              : `${description.substring(0, MAX_BIO_LENGTH - 9)}…`}
            {description.length > MAX_BIO_LENGTH && (
              <Text
                as="span"
                fontFamily="body"
                fontSize="xs"
                color="cyanText"
                cursor="pointer"
                onClick={() => setShow((s) => !s)}
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
        {type && types && (
          <Flex direction="column" id="color" mb={0} w="100%">
            <Text
              fontSize="xs"
              color="blueLight"
              casing="uppercase"
              mb={3}
              textAlign="left"
            >
              Color Disposition
            </Text>
            <Link
              isExternal
              href={`//dysbulic.github.io/5-color-radar/#/combos/${type.mask.toString(
                2,
              )}`}
              maxH="6rem"
            >
              <ColorBar mask={type.mask} />
            </Link>
            <Text color="blueLight" mt={4} style={{ textIndent: 16 }}>
              {type.description}
            </Text>
          </Flex>
        )}
        {player.playerType?.title && (
          <FlexContainer align="stretch" fontSize={{ base: 'sm', sm: 'md' }}>
            <Text color="white" fontWeight="bold" casing="uppercase">
              {player.playerType.title}
            </Text>
            <Text color="blueLight" style={{ textIndent: 16 }}>
              {player.playerType.description}
            </Text>
          </FlexContainer>
        )}
      </VStack>
    </ProfileSection>
  );
};
