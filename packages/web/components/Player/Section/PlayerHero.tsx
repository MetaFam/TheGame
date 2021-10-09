import {
  Box,
  EditIcon,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from '@metafam/ds';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React, { useMemo } from 'react';
import { FaClock, FaGlobe } from 'react-icons/fa';
import { getPlayerTimeZoneDisplay } from 'utils/dateHelpers';
import { getPlayerDescription, getPlayerName } from 'utils/playerHelpers';

import { ProfileSection } from '../../ProfileSection';
import { PlayerContacts } from '../PlayerContacts';
import { PlayerBrightId } from './PlayerBrightId';
import { PlayerHeroTile } from './PlayerHeroTile';

const MAX_BIO_LENGTH = 240;

type Props = { player: PlayerFragmentFragment; isOwnProfile: boolean };
type AvailabilityProps = { player: PlayerFragmentFragment };
type TimeZoneDisplayProps = { timeZone?: string; offset?: string };

export const PlayerHero: React.FC<Props> = ({ player, isOwnProfile }) => {
  const description = getPlayerDescription(player);
  const [show, setShow] = React.useState(description.length <= MAX_BIO_LENGTH);

  const { timeZone, offset } = useMemo(
    () => getPlayerTimeZoneDisplay(player.timezone),
    [player.timezone],
  );

  return (
    <ProfileSection>
      {isOwnProfile && (
        <Box pos="absolute" right={5} top={5}>
          <IconButton
            variant="outline"
            aria-label="Edit Profile Info"
            size="lg"
            borderColor="pinkShadeOne"
            background="rgba(17, 17, 17, 0.9)"
            color="pinkShadeOne"
            _hover={{ color: 'white', borderColor: 'white' }}
            icon={<EditIcon />}
            isRound
          />
        </Box>
      )}
      <Box textAlign="center" mb={8} mt={2}>
        <PlayerAvatar
          w={{ base: 32, md: 56 }}
          h={{ base: 32, md: 56 }}
          {...{ player }}
        />
      </Box>
      <VStack spacing={6}>
        <Box textAlign="center">
          <Text fontSize="xl" fontFamily="heading" mb={1}>
            {getPlayerName(player)}
          </Text>
          <PlayerBrightId {...{ player }} />
        </Box>
        <Box>
          <Text fontSize={{ base: 'sm', sm: 'md' }}>
            {show
              ? description
              : `${description.substring(0, MAX_BIO_LENGTH - 9)}…`}
            {description.length > MAX_BIO_LENGTH && (
              <Text
                as="span"
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

        <SimpleGrid columns={2} gap={6} width="full">
          <PlayerHeroTile title="Display name">
            <Text>Vid</Text>
          </PlayerHeroTile>
          <PlayerHeroTile title="Personal pronouns">
            <Text>He</Text>
          </PlayerHeroTile>
        </SimpleGrid>

        <PlayerHeroTile title="Bio">
          <Text fontSize="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </Text>
        </PlayerHeroTile>
        <PlayerHeroTile title="Website">
          <Text>www.mycoolportfolio.com</Text>
        </PlayerHeroTile>

        <SimpleGrid columns={2} gap={6} width="full">
          <PlayerHeroTile title="Country">
            <Text>United Kingdom</Text>
          </PlayerHeroTile>
          <PlayerHeroTile title="Timezone">
            <TimeZoneDisplay timeZone={timeZone} offset={offset} />
          </PlayerHeroTile>
        </SimpleGrid>

        <SimpleGrid columns={2} gap={6} width="full">
          <PlayerHeroTile title="Availability">
            <Availability player={player} />
          </PlayerHeroTile>
          <PlayerHeroTile title="Office hours">
            <Flex dir="row" alignItems="center">
              9:00{' '}
              <Text fontSize="md" mr={1} ml={1}>
                AM
              </Text>{' '}
              - 5:00{' '}
              <Text fontSize="md" mr={1} ml={1}>
                PM
              </Text>
            </Flex>
          </PlayerHeroTile>
        </SimpleGrid>

        <PlayerHeroTile title="Favorite emoji">
          <Text>😇</Text>
        </PlayerHeroTile>
      </VStack>
    </ProfileSection>
  );
};

const Availability: React.FC<AvailabilityProps> = ({
  player: { availability_hours },
}) => (
  <Flex alignItems="center">
    <Box pr={2}>
      <FaClock color="blueLight" />
    </Box>
    <Text fontSize={{ base: 'md', sm: 'lg' }} pr={2}>
      {`${availability_hours || '0'} h/week`}
    </Text>
  </Flex>
);

const TimeZoneDisplay: React.FC<TimeZoneDisplayProps> = ({
  timeZone,
  offset,
}) => (
  <Flex alignItems="center">
    <Box pr={1}>
      <FaGlobe color="blueLight" />
    </Box>
    <Text fontSize={{ base: 'md', sm: 'lg' }} pr={1}>
      {timeZone || '-'}
    </Text>
    {offset ? <Text fontSize={{ base: 'sm', sm: 'md' }}>{offset}</Text> : ''}
  </Flex>
);
