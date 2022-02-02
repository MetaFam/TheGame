import {
  Box,
  EditIcon,
  Flex,
  getTimeZoneFor,
  HStack,
  IconButton,
  MetaTag,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import BackgroundImage from 'assets/main-background.jpg';
import { FlexContainer } from 'components/Container';
import { EditProfileForm } from 'components/EditProfileForm';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerBrightId } from 'components/Player/Section/PlayerBrightId';
import { PlayerHeroTile } from 'components/Player/Section/PlayerHeroTile';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { useProfileField, useUser } from 'lib/hooks';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useEffect, useState } from 'react';
import { FaClock, FaGlobe } from 'react-icons/fa';
import { BoxType } from 'utils/boxTypes';
import { getPlayerName } from 'utils/playerHelpers';

const MAX_BIO_LENGTH = 240;

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  canEdit?: boolean;
};
type DisplayComponentProps = {
  person?: Maybe<Player>;
  isOwnProfile?: boolean;
};

export const PlayerHero: React.FC<Props> = ({
  player,
  isOwnProfile,
  canEdit,
}) => {
  const { user } = useUser();
  const person = (isOwnProfile ? user : player) as Player;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ProfileSection {...{ canEdit }} boxType={BoxType.PLAYER_HERO} withoutBG>
      {isOwnProfile && !canEdit && (
        <Box pos="absolute" right={5} top={5}>
          <IconButton
            _focus={{ boxShadow: 'none' }}
            variant="outline"
            borderWidth={2}
            aria-label="Edit Profile Info"
            size="lg"
            borderColor="pinkShadeOne"
            bg="rgba(17, 17, 17, 0.9)"
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
          {...{ player, isOwnProfile }}
        />
      </Box>
      <VStack spacing={6}>
        <Box textAlign="center" maxW="full">
          <PlayerName {...{ person, isOwnProfile }} />
          <PlayerBrightId player={person} />
        </Box>
        <PlayerDescription {...{ person, isOwnProfile }} />

        <HStack mt={2}>
          <PlayerContacts {...{ player: person }} />
        </HStack>

        <PlayerPronouns {...{ person, isOwnProfile }} />

        {/*
        <PlayerHeroTile title="Website">
          <Text>www.mycoolportfolio.com</Text>
        </PlayerHeroTile>
        */}

        <Flex justify="stretch" w="full">
          <PlayerHeroTile title="Availability">
            <Availability {...{ person, isOwnProfile }} />
          </PlayerHeroTile>
          <PlayerHeroTile title="Time Zone">
            <TimeZone {...{ person, isOwnProfile }} />
          </PlayerHeroTile>
        </Flex>

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

        <PlayerEmoji {...{ person, isOwnProfile }} />
      </VStack>

      {isOwnProfile && (
        <Modal {...{ isOpen, onClose }}>
          <ModalOverlay />
          <ModalContent
            maxW={['100%', 'min(80%, 60rem)']}
            backgroundImage={`url(${BackgroundImage})`}
            bgSize="cover"
            bgAttachment="fixed"
            p={[0, 8, 12]}
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
              p={{ base: 1, sm: 4 }}
              _focus={{
                boxShadow: 'none',
              }}
            />
            <ModalBody p={[0, 2]}>
              <EditProfileForm {...{ player: person ?? null, onClose }} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </ProfileSection>
  );
};

export const PlayerPronouns: React.FC<DisplayComponentProps> = ({
  person,
  isOwnProfile = false,
}) => {
  const { pronouns } = useProfileField({
    field: 'pronouns',
    player: person,
    owner: isOwnProfile,
  });
  // This is broken now…
  // Fix it by making the animation into a component which
  // saves the children and replaces them after fading in
  // and out. (If such a thing is possible…)
  const { animation } = useAnimateProfileChanges(pronouns);

  if (!pronouns || pronouns === '') {
    return null;
  }

  return (
    <PlayerHeroTile title="Personal Pronouns">
      <FlexContainer
        align="stretch"
        transition="opacity 0.4s"
        opacity={animation === 'fadeIn' ? 1 : 0}
      >
        <MetaTag size="md" fontWeight="normal" backgroundColor="gray.600">
          {pronouns}
        </MetaTag>
      </FlexContainer>
    </PlayerHeroTile>
  );
};

const PlayerEmoji: React.FC<DisplayComponentProps> = ({
  person,
  isOwnProfile = false,
}) => {
  const { emoji } = useProfileField({
    field: 'emoji',
    player: person,
    owner: isOwnProfile,
  });

  if (!emoji || emoji === '') {
    return null;
  }

  return (
    <PlayerHeroTile title="Favorite Emoji">
      <Text ml={10} mt={0} fontSize={45} lineHeight={0.75}>
        {emoji}
      </Text>
    </PlayerHeroTile>
  );
};

const PlayerDescription: React.FC<DisplayComponentProps> = ({
  person,
  isOwnProfile = false,
}) => {
  const { description } = useProfileField({
    field: 'description',
    player: person,
    owner: isOwnProfile,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow((description ?? '').length <= MAX_BIO_LENGTH);
  }, [description]);

  if (!description || description === '') {
    return null;
  }

  return (
    <Box align="flexStart" w="100%">
      <PlayerHeroTile title="Bio">
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          textAlign="justify"
          whiteSpace="pre-wrap"
        >
          {show || description.length <= MAX_BIO_LENGTH
            ? description
            : `${description.substring(0, MAX_BIO_LENGTH - 9)}…`}
          {description.length > MAX_BIO_LENGTH && (
            <Text
              as="span"
              fontSize="xs"
              color="cyanText"
              cursor="pointer"
              onClick={() => setShow((s) => !s)}
              px={0.5}
              ml={2}
              bg="#FFFFFF22"
              border="1px solid #FFFFFF99"
              borderRadius="15%"
              _hover={{ bg: '#FFFFFF44' }}
            >
              Read {show ? 'Less' : 'More'}
            </Text>
          )}
        </Text>
      </PlayerHeroTile>
    </Box>
  );
};

const PlayerName: React.FC<DisplayComponentProps> = ({
  person,
  isOwnProfile = false,
}) => {
  const { name } = useProfileField({
    field: 'name',
    player: person,
    owner: isOwnProfile,
    getter: getPlayerName,
  });

  return (
    <Text
      fontSize="xl"
      fontFamily="heading"
      mb={1}
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      overflowX="hidden"
      title={name ?? undefined}
    >
      {name}
    </Text>
  );
};

const Availability: React.FC<DisplayComponentProps> = ({
  person,
  isOwnProfile = false,
}) => {
  const { value: current } = useProfileField<number>({
    field: 'availableHours',
    owner: isOwnProfile,
    player: person ?? null,
  });
  const [hours, setHours] = useState<Maybe<number>>(current);
  const updateFN = () => setHours(current ?? null);
  const { animation } = useAnimateProfileChanges(current, updateFN);

  return (
    <Flex alignItems="center">
      <Box pr={2}>
        <FaClock color="blueLight" />
      </Box>
      <FlexContainer
        align="stretch"
        transition="opacity 0.4s"
        opacity={animation === 'fadeIn' ? 1 : 0}
      >
        <Text fontSize={{ base: 'md', sm: 'lg' }} pr={2}>
          {hours == null ? (
            <Text as="em">Unspecified</Text>
          ) : (
            <>
              <Text as="span" mr={0.5}>
                {hours}
              </Text>
              <Text as="span" title="hours per week">
                <Text as="sup">hr</Text>⁄<Text as="sub">week</Text>
              </Text>
            </>
          )}
        </Text>
      </FlexContainer>
    </Flex>
  );
};

const TimeZone: React.FC<DisplayComponentProps> = ({
  person,
  isOwnProfile = false,
}) => {
  const { value: current } = useProfileField({
    field: 'timeZone',
    owner: isOwnProfile,
    player: person ?? null,
  });
  const tz = getTimeZoneFor({ title: current });
  const [timeZone, setTimeZone] = useState<string | null>(
    tz?.abbreviation ?? null,
  );
  const [offset, setOffset] = useState<string>(tz?.utc ?? '');
  const updateFN = () => {
    if (tz) {
      setTimeZone(tz.abbreviation);
      setOffset(tz.utc);
    }
  };
  const short = offset.replace(/:00\)$/, ')').replace(/ +/g, '');
  const { animation } = useAnimateProfileChanges(tz, updateFN);

  return (
    <Flex alignItems="center">
      <FlexContainer
        align="stretch"
        transition="opacity 0.4s"
        opacity={animation === 'fadeIn' ? 1 : 0}
      >
        <Flex align="center" whiteSpace="pre">
          <Box pr={2}>
            <FaGlobe color="blueLight" />
          </Box>
          {timeZone === null ? (
            <Text fontStyle="italic">Unspecified</Text>
          ) : (
            <Tooltip label={tz?.name} hasArrow>
              <Wrap justify="center" align="center">
                <WrapItem my="0 !important">
                  <Text
                    fontSize={{ base: 'md', sm: 'lg' }}
                    pr={1}
                    overflowX="hidden"
                    textOverflow="ellipsis"
                  >
                    {timeZone || '−'}
                  </Text>
                </WrapItem>
                {short && (
                  <WrapItem my="0 !important">
                    <Text fontSize={{ base: 'sm', sm: 'md' }} whiteSpace="pre">
                      {short}
                    </Text>
                  </WrapItem>
                )}
              </Wrap>
            </Tooltip>
          )}
        </Flex>
      </FlexContainer>
    </Flex>
  );
};
