import {
  Box,
  EditIcon,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import { EditProfileForm } from 'components/EditProfileForm';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { FaClock, FaGlobe } from 'react-icons/fa';
import { getPlayerTimeZoneDisplay } from 'utils/dateHelpers';
import { getPlayerDescription } from 'utils/playerHelpers';

import { ProfileSection } from '../../ProfileSection';
import { PlayerContacts } from '../PlayerContacts';
import { PlayerBrightId } from './PlayerBrightId';
import { PlayerHeroTile } from './PlayerHeroTile';

const MAX_BIO_LENGTH = 240;

type Props = { player: PlayerFragmentFragment; isOwnProfile: boolean };
type AvailabilityProps = { availabilityHours?: number };
type TimeZoneDisplayProps = { timeZone?: string; offset?: string };

export const PlayerHero: React.FC<Props> = ({ player, isOwnProfile }) => {
  const description = getPlayerDescription(player);
  const [show, setShow] = useState(description.length <= MAX_BIO_LENGTH);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [timeZone, setTimeZone] = useState<string>('');
  const [offset, setOffset] = useState<string>('');
  const [availabilityHours, setAvailabilityHours] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('');

  const { user } = useUser();

  useEffect(() => {
    const person = isOwnProfile ? user?.player : player;

    if (person) {
      const timeDisplay = getPlayerTimeZoneDisplay(person.timezone);
      if (timeDisplay.timeZone) setTimeZone(timeDisplay.timeZone);
      if (timeDisplay.offset) setOffset(timeDisplay.offset);

      const hours = person.availability_hours;
      if (hours) setAvailabilityHours(hours);

      const { username } = person;
      if (username) setPlayerName(username);
    }
  }, [user, player, isOwnProfile]);

  return (
    <ProfileSection>
      {isOwnProfile && (
        <Box pos="absolute" right={5} top={5}>
          <IconButton
            _focus={{
              boxShadow: 'none',
            }}
            variant="outline"
            borderWidth={2}
            aria-label="Edit Profile Info"
            size="lg"
            borderColor="pinkShadeOne"
            background="rgba(17, 17, 17, 0.9)"
            color="pinkShadeOne"
            _hover={{ color: 'white', borderColor: 'white' }}
            onClick={onOpen}
            icon={<EditIcon />}
            isRound
            _active={{
              transform: 'scale(0.8)',
              backgroundColor: 'transparent',
            }}
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
            {playerName}
          </Text>
          <PlayerBrightId {...{ player }} />
        </Box>
        <Box>
          {description && (
            <PlayerHeroTile title="Bio">
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
            </PlayerHeroTile>
          )}
        </Box>

        <HStack mt={2}>
          <PlayerContacts player={player} />
        </HStack>

        {/* <SimpleGrid columns={2} gap={6} width="full">
          <PlayerHeroTile title="Display name">
            <Text>Vid</Text>
          </PlayerHeroTile>
          <PlayerHeroTile title="Personal pronouns">
            <Text>He</Text>
          </PlayerHeroTile>
        </SimpleGrid> */}
        {/* <PlayerHeroTile title="Website">
          <Text>www.mycoolportfolio.com</Text>
        </PlayerHeroTile> */}

        <SimpleGrid columns={2} gap={6} width="full">
          <PlayerHeroTile title="Availability">
            <Availability availabilityHours={availabilityHours} />
          </PlayerHeroTile>
          <PlayerHeroTile title="Timezone">
            <TimeZoneDisplay timeZone={timeZone} offset={offset} />
          </PlayerHeroTile>
        </SimpleGrid>

        {/* <SimpleGrid columns={2} gap={6} width="full">
          <PlayerHeroTile title="Country">
              <Text>United Kingdom</Text>
            </PlayerHeroTile>
          <PlayerHeroTile title="Office hours">
            <Flex dir="row" alignItems="center">
              9:00
              <Text fontSize="md" mr={1} ml={1}>
                AM
              </Text>
              - 5:00
              <Text fontSize="md" mr={1} ml={1}>
                PM
              </Text>
            </Flex>
          </PlayerHeroTile>
        </SimpleGrid> */}

        {player?.profile_cache?.emoji && (
          <PlayerHeroTile title="Favorite emoji">
            <Text>{player?.profile_cache?.emoji}</Text>
          </PlayerHeroTile>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW="80%"
          backgroundImage={`url(${BackgroundImage})`}
          bgSize="cover"
          bgAttachment="fixed"
          p={[4, 8, 12]}
        >
          <ModalHeader
            color="white"
            fontSize="4xl"
            alignSelf="center"
            fontWeight="normal"
          >
            Edit Profile
          </ModalHeader>
          <ModalCloseButton
            color="pinkShadeOne"
            size="xl"
            p={4}
            _focus={{
              boxShadow: 'none',
            }}
          />
          <ModalBody>
            <EditProfileForm user={user} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ProfileSection>
  );
};

const Availability: React.FC<AvailabilityProps> = ({ availabilityHours }) => (
  <Flex alignItems="center">
    <Box pr={2}>
      <FaClock color="blueLight" />
    </Box>
    <Text fontSize={{ base: 'md', sm: 'lg' }} pr={2}>
      {`${availabilityHours || '0'} h/week`}
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
