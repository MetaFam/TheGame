import {
  Box,
  EditIcon,
  Flex,
  getTimeZoneFor,
  Grid,
  HStack,
  IconButton,
  MeetWithWalletIcon,
  MetaButton,
  MetaTag,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { EditProfileModal } from 'components/EditProfileModal';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerContacts as Contacts } from 'components/Player/PlayerContacts';
import { PlayerHeroTile } from 'components/Player/Section/PlayerHeroTile';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { useProfileField, useUser } from 'lib/hooks';
import { usePlayerName } from 'lib/hooks/player/usePlayerName';
import React, { useEffect, useState } from 'react';
import { FaClock, FaGlobe } from 'react-icons/fa';
import { BoxTypes } from 'utils/boxTypes';
import { getPlayerMeetwithWalletCalendarUrl } from 'utils/playerHelpers';

const MAX_BIO_LENGTH = 240;

type HeroProps = {
  player: Player;
  editing?: boolean;
  ens?: string;
};
type DisplayComponentProps = {
  player?: Maybe<Player>;
  Wrapper?: React.FC;
};

export const PlayerHero: React.FC<HeroProps> = ({ player, editing, ens }) => {
  const { user } = useUser();

  const isOwnProfile = user ? user.id === player?.id : null;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 9tails.eth: As there is no current way of editing Profile Accounts,
  // and the MWW integration happens on the EditProfileModal, to avoid
  // adding a new column to the table just to do the following, I decided
  // to this this cast as any to use the information from the form and
  // don't do bigger changes on the data structure just because of it
  const profileFields = useProfileField({
    field: 'meetWithWalletDomain',
    player,
    getter: getPlayerMeetwithWalletCalendarUrl,
  });

  // eslint-disable-next-line
  const mwwDomain = (profileFields as any).meetWithWalletDomain || null;

  return (
    <ProfileSection {...{ editing }} type={BoxTypes.PLAYER_HERO} title={false}>
      {isOwnProfile && !editing && (
        <IconButton
          pos="absolute"
          right={2}
          top={2}
          aria-label="Edit Profile Info"
          size="lg"
          background="transparent"
          color="pinkShadeOne"
          icon={<EditIcon />}
          _hover={{ color: 'white' }}
          _focus={{ boxShadow: 'none' }}
          _active={{ transform: 'scale(0.8)' }}
          isRound
          onClick={onOpen}
        />
      )}
      <Flex mb={8} mt={2} justify="center">
        <PlayerAvatar size="3xl" {...{ player }} />
      </Flex>
      <VStack spacing={6}>
        <Box textAlign="center" maxW="full">
          <Name {...{ player, ens }} />
        </Box>

        <Description {...{ player }} />

        <HStack mt={2}>
          <Contacts {...{ player }} />
        </HStack>

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

        {mwwDomain && mwwDomain !== 'mww_remove' && (
          <MetaButton
            target="_blank"
            href={`${mwwDomain}?utm_source=metafam&utm_medium=site`}
            leftIcon={<MeetWithWalletIcon />}
          >
            Meet With Me
          </MetaButton>
        )}
      </VStack>

      {isOwnProfile && <EditProfileModal {...{ player, isOpen, onClose }} />}
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
      <PlayerHeroTile title="Pronouns">
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
        <Text fontSize="3xl" lineHeight={0.85}>
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
        <MarkdownViewer>{description}</MarkdownViewer>
      </PlayerHeroTile>
    </Wrapper>
  );
};

const Name: React.FC<DisplayComponentProps> = ({
  player,
  Wrapper = React.Fragment,
}) => {
  const playerName = usePlayerName(player);

  return (
    <Wrapper>
      <Text
        fontSize="xl"
        fontFamily="heading"
        mb={1}
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflowX="hidden"
        title={playerName}
      >
        {playerName}
      </Text>
    </Wrapper>
  );
};

const Availability: React.FC<DisplayComponentProps> = ({
  player,
  Wrapper = React.Fragment,
}) => {
  const { value: hours } = useProfileField<number>({
    field: 'availableHours',
    player,
  });

  return (
    <Wrapper>
      <PlayerHeroTile title="Availability">
        <Flex alignItems="center">
          <Box pr={2}>
            <FaClock color="blueLight" />
          </Box>
          <FlexContainer align="stretch">
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
