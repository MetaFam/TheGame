import {
  Box,
  EditIcon,
  Flex,
  getTimeZoneFor,
  Grid,
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
import { PlayerContacts as Contacts } from 'components/Player/PlayerContacts';
import { PlayerHeroTile } from 'components/Player/Section/PlayerHeroTile';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { useProfileField, useUser } from 'lib/hooks';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useEffect, useState } from 'react';
import { FaClock, FaGlobe } from 'react-icons/fa';
import { BoxTypes } from 'utils/boxTypes';
import { getPlayerName } from 'utils/playerHelpers';

const MAX_BIO_LENGTH = 240;

type HeroProps = {
  player: Player;
  editing?: boolean;
};
type DisplayComponentProps = {
  player?: Maybe<Player>;
  Wrapper?: React.FC;
};

export const PlayerHero: React.FC<HeroProps> = ({ player, editing }) => {
  const { user } = useUser();
  const isOwnProfile = user ? user.id === player?.id : null;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ProfileSection
      {...{ editing }}
      type={BoxTypes.PLAYER_HERO}
      title={false}
      withoutBG
      p={[4, 2]}
    >
      {isOwnProfile && !editing && (
        <Box pos="absolute" right={[0, 4]} top={[0, 4]}>
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
              bg: 'transparent',
            }}
          />
        </Box>
      )}
      <Box align="center" mb={8} mt={2}>
        <PlayerAvatar
          w="min(var(--chakra-sizes-56), 100%)"
          h="min(var(--chakra-sizes-56), 100%)"
          {...{ player }}
        />
      </Box>
      <VStack spacing={6}>
        <Box textAlign="center" maxW="full">
          <Name {...{ player }} />
        </Box>

        <Description {...{ player }} />

        <HStack mt={2}>
          <Contacts {...{ player }} />
        </HStack>

        {/*
        <PlayerHeroTile title="Website">
          <Text>www.mycoolportfolio.com</Text>
        </PlayerHeroTile>
        */}

        <Grid
          templateColumns="repeat(auto-fill, minmax(9rem, 1fr))"
          w="full"
          rowGap={5}
        >
          <Pronouns {...{ player }} />
          <Availability {...{ player }} />
          <TimeZone {...{ player }} />
          <Emoji {...{ player }} />
        </Grid>

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
              <EditProfileForm {...{ player, onClose }} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </ProfileSection>
  );
};

export const Pronouns: React.FC<DisplayComponentProps> = ({
  player,
  Wrapper = React.Fragment,
}) => {
  const { pronouns } = useProfileField({
    field: 'pronouns',
    player,
  });
  // This is broken now…
  // Fix it by making the animation into a component which
  // saves the children and replaces them after fading in
  // and out. (If such a thing is possible…)
  //
  // const { animation } = useAnimateProfileChanges(pronouns)

  if (!pronouns || pronouns === '') {
    return null;
  }

  return (
    <Wrapper>
      <PlayerHeroTile title="Personal Pronouns">
        <MetaTag size="md" fontWeight="normal" backgroundColor="gray.600">
          {pronouns}
        </MetaTag>
      </PlayerHeroTile>
    </Wrapper>
  );
};

const Emoji: React.FC<DisplayComponentProps> = ({
  player,
  Wrapper = React.Fragment,
}) => {
  const { emoji } = useProfileField({
    field: 'emoji',
    player,
  });

  if (!emoji || emoji === '') {
    return null;
  }

  return (
    <Wrapper>
      <PlayerHeroTile title="Favorite Emoji">
        <Text fontSize="xl" lineHeight={0.85}>
          {emoji}
        </Text>
      </PlayerHeroTile>
    </Wrapper>
  );
};

const Description: React.FC<DisplayComponentProps> = ({
  player,
  Wrapper = React.Fragment,
}) => {
  const { description } = useProfileField({
    field: 'description',
    player,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow((description ?? '').length <= MAX_BIO_LENGTH);
  }, [description]);

  if (!description || description === '') {
    return null;
  }

  return (
    <Wrapper>
      <PlayerHeroTile title="Bio" align="flexStart">
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
    </Wrapper>
  );
};

const Name: React.FC<DisplayComponentProps> = ({
  player,
  Wrapper = React.Fragment,
}) => {
  const { name } = useProfileField({
    field: 'name',
    player,
    getter: getPlayerName,
  });

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Availability: React.FC<DisplayComponentProps> = ({
  player,
  Wrapper = React.Fragment,
}) => {
  const { value: current } = useProfileField<number>({
    field: 'availableHours',
    player,
  });
  const [hours, setHours] = useState<Maybe<number>>(current);
  const updateFN = () => setHours(current ?? null);
  const { animation } = useAnimateProfileChanges(current, updateFN);

  return (
    <Wrapper>
      <PlayerHeroTile title="Availability">
        <Flex alignItems="center">
          <Box pr={2}>
            <FaClock color="blueLight" />
          </Box>
          <FlexContainer
            align="stretch"
            transition="opacity 0.4s"
            opacity={animation === 'fadeIn' ? 1 : 0}
          >
            <Text fontSize={['md', 'lg']} pr={2}>
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
      </PlayerHeroTile>
    </Wrapper>
  );
};

const TimeZone: React.FC<DisplayComponentProps> = ({
  player,
  Wrapper = React.Fragment,
}) => {
  const { value: current } = useProfileField({
    field: 'timeZone',
    player,
  });
  const tz = getTimeZoneFor({ title: current });
  const timeZone = tz?.abbreviation ?? null;
  const short = (tz?.utc ?? '').replace(/:00\)$/, ')').replace(/ +/g, '');

  return (
    <Wrapper>
      <PlayerHeroTile title="Time Zone">
        <Flex align="center" whiteSpace="pre">
          <Box pr={2}>
            <FaGlobe color="blueLight" />
          </Box>
          {timeZone === null ? (
            <Text fontStyle="italic" fontSize={['md', 'lg']}>
              Unspecified
            </Text>
          ) : (
            <Tooltip label={tz?.name} hasArrow>
              <Wrap justify="center" align="center" userSelect="none">
                <WrapItem my="0 !important">
                  <Text
                    fontSize={['md', 'lg']}
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
      </PlayerHeroTile>
    </Wrapper>
  );
};
