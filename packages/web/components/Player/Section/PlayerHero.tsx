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
import { FlexContainer } from 'components/Container';
import { EditProfileForm } from 'components/EditProfileForm';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerBrightId } from 'components/Player/Section/PlayerBrightId';
import { PlayerHeroTile } from 'components/Player/Section/PlayerHeroTile';
import { PlayerPronouns } from 'components/Player/Section/PlayerPronouns';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useEffect, useState } from 'react';
import { FaClock, FaGlobe } from 'react-icons/fa';
import { BoxType } from 'utils/boxTypes';
import { getPlayerTimeZoneDisplay } from 'utils/dateHelpers';
import { getPlayerDescription, getPlayerName } from 'utils/playerHelpers';

const MAX_BIO_LENGTH = 240;

type Props = {
  player: PlayerFragmentFragment;
  isOwnProfile?: boolean;
  canEdit?: boolean;
};
type AvailabilityProps = { person: PlayerFragmentFragment | null | undefined };
type TimeZoneDisplayProps = {
  person: PlayerFragmentFragment | null | undefined;
};

export const PlayerHero: React.FC<Props> = ({
  player,
  isOwnProfile,
  canEdit,
}) => {
  const description = getPlayerDescription(player);
  const [show, setShow] = useState(description.length <= MAX_BIO_LENGTH);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [playerName, setPlayerName] = useState<string>('');

  const { user } = useUser();

  const person = isOwnProfile ? user?.player : player;
  useEffect(() => {
    if (person) {
      setPlayerName(getPlayerName(person));
    }
  }, [person]);

  return (
    <ProfileSection canEdit={canEdit} boxType={BoxType.PLAYER_HERO}>
      {isOwnProfile && !canEdit && (
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

        <PlayerPronouns person={person} />

        {/* <SimpleGrid columns={2} gap={6} width="full">
          <PlayerHeroTile title="Display name">
            <Text>Vid</Text>
          </PlayerHeroTile> 
        </SimpleGrid> */}
        {/* <PlayerHeroTile title="Website">
          <Text>www.mycoolportfolio.com</Text>
        </PlayerHeroTile> */}

        <SimpleGrid columns={2} gap={6} width="full">
          <PlayerHeroTile title="Availability">
            <Availability person={person} />
          </PlayerHeroTile>
          <PlayerHeroTile title="Timezone">
            <TimeZoneDisplay person={person} />
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

const Availability: React.FC<AvailabilityProps> = ({ person }) => {
  const [availabilityHours, setAvailabilityHours] = useState<number>(0);
  const updateFN = () => setAvailabilityHours(person?.availability_hours || 0);
  const { animation } = useAnimateProfileChanges(
    person?.availability_hours,
    updateFN,
  );
  return (
    <Flex alignItems="center">
      <Box pr={2}>
        <FaClock color="blueLight" />
      </Box>
      <FlexContainer
        align="stretch"
        transition=" opacity 0.4s"
        opacity={animation === 'fadeIn' ? 1 : 0}
      >
        <Text fontSize={{ base: 'md', sm: 'lg' }} pr={2}>
          {`${availabilityHours || '0'} h/week`}
        </Text>
      </FlexContainer>
    </Flex>
  );
};

const TimeZoneDisplay: React.FC<TimeZoneDisplayProps> = ({ person }) => {
  const timeDisplay = getPlayerTimeZoneDisplay(person?.timezone);
  const [timeZone, setTimeZone] = useState<string>('');
  const [offset, setOffset] = useState<string>('');
  const updateFN = () => {
    if (timeDisplay.timeZone) setTimeZone(timeDisplay.timeZone);
    if (timeDisplay.offset) setOffset(timeDisplay.offset);
  };

  const { animation } = useAnimateProfileChanges(
    timeDisplay.timeZone,
    updateFN,
  );
  return (
    <Flex alignItems="center">
      <Box pr={1}>
        <FaGlobe color="blueLight" />
      </Box>
      <FlexContainer
        align="stretch"
        transition=" opacity 0.4s"
        opacity={animation === 'fadeIn' ? 1 : 0}
      >
        <Text fontSize={{ base: 'md', sm: 'lg' }} pr={1}>
          {timeZone || '-'}
        </Text>
        {offset ? (
          <Text fontSize={{ base: 'sm', sm: 'md' }}>{offset}</Text>
        ) : (
          ''
        )}
      </FlexContainer>
    </Flex>
  );
};
