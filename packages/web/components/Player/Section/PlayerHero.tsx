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

const Availability: React.FC<AvailabilityProps> = ({
  player: { availability_hours },
}) => (
  <>
    <Box width="1rem">
      <FaClock color="blueLight" width="1rem" />
    </Box>
    <Text fontSize={{ base: 'md', sm: 'lg' }} fontFamily="mono" mb="1">
      {`${availability_hours || '0'} h/week`}
    </Text>
  </>
);

const TimeZoneDisplay: React.FC<TimeZoneDisplayProps> = ({
  timeZone,
  offset,
}) => (
  <>
    <Box width="1rem">
      <FaGlobe color="blueLight" />
    </Box>
    <Text fontSize={{ base: 'md', sm: 'lg' }}>{timeZone || '-'}</Text>
    {offset ? <Text fontSize={{ base: 'xs', sm: 'sm' }}>{offset}</Text> : ''}
  </>
);

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
        <Flex
          width="100%"
          justifyContent="end"
          pos="absolute"
          right={4}
          top={4}
        >
          <IconButton
            variant="outline"
            aria-label="Edit Profile Info"
            size="lg"
            borderColor="#A426A4"
            background="rgba(17, 17, 17, 0.9)"
            color="#A426A4"
            _hover={{ color: 'white', borderColor: 'white' }}
            icon={<EditIcon />}
            isRound
          />
        </Flex>
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

        <SimpleGrid columns={2} gap={6} width="full">
          <PlayerHeroTile title="Display name">
            <Text>Vid</Text>
          </PlayerHeroTile>
          <PlayerHeroTile title="Personal pronouns">
            <Text>He</Text>
          </PlayerHeroTile>
        </SimpleGrid>

        <PlayerHeroTile title="Bio">
          <Text>
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
            <Text>9:00 AM - 5:00 PM</Text>
          </PlayerHeroTile>
        </SimpleGrid>

        <PlayerHeroTile title="Favorite emoji">
          <Text>😇</Text>
        </PlayerHeroTile>
      </VStack>
    </ProfileSection>
  );
};
