import {
  AddIcon,
  Box,
  Button,
  ChainIcon,
  chakra,
  EditIcon,
  Flex,
  Heading,
  IconButton,
  Image,
  LoadingState,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
  ViewAllButton,
  VStack,
} from '@metafam/ds';
import { LinkGuild } from 'components/Player/PlayerGuild';
import { ProfileSection } from 'components/Section/ProfileSection';
import {
  Player,
  useUpdatePlayerGuildVisibilityMutation,
} from 'graphql/autogen/types';
import { getAllMemberships, GuildMembership } from 'graphql/getMemberships';
import React, { useEffect, useMemo, useState } from 'react';
import ReactGridLayout, { Layout } from 'react-grid-layout';
import { BsEyeFill } from 'react-icons/bs';
import { MdDragHandle } from 'react-icons/md';
import { BoxTypes } from 'utils/boxTypes';
import { getDAOLink } from 'utils/daoHelpers';
import { optimizedImage } from 'utils/imageHelpers';

import { AddPlayerGuild } from './MembershipModals/AddPlayerGuild';

type DAOListingProps = {
  membership: GuildMembership;
  editing?: boolean;
  playerId?: string;
};

export const DAOListing: React.FC<DAOListingProps> = ({
  membership: {
    title,
    memberShares,
    daoShares,
    memberRank,
    memberXP,
    chain,
    address,
    logoURL,
    guildname,
  },
}) => {
  const stake = useMemo(() => {
    if (memberXP != null) {
      return `XP: ${Math.floor(memberXP)}`;
    }
    if (daoShares != null) {
      const member = memberShares ? Number(memberShares) : null;
      const dao = Number(daoShares);
      const percent = member != null ? ((member * 100) / dao).toFixed(3) : '?';
      return (
        <chakra.span
          textAlign={['center', 'left']}
          display={['flex', 'inline']}
          flexDirection={['column', 'inherit']}
        >
          <chakra.span mr={[0, 1]} _after={{ content: [undefined, '":"'] }}>
            Shares
          </chakra.span>
          <chakra.span whiteSpace="nowrap" title={`${percent}%`}>
            <Text as="sup">
              {member != null ? member.toLocaleString() : 'Unknown'}
            </Text>{' '}
            <chakra.span fontSize="lg" pos="relative" top={0.5}>
              ⁄
            </chakra.span>{' '}
            <Text as="sub">{dao.toLocaleString()}</Text>
          </chakra.span>
        </chakra.span>
      );
    }
    return null;
  }, [memberShares, memberXP, daoShares]);

  const daoURL = useMemo(() => getDAOLink(chain, address), [chain, address]);

  return (
    <LinkGuild {...{ daoURL, guildname }}>
      <Flex align="center" mb={4} p={2}>
        <Flex align="center">
          <Box bg="purpleBoxLight" minW={16} h={16} borderRadius={8}>
            {logoURL ? (
              <Image
                src={optimizedImage('logoURL', logoURL)}
                w={14}
                h={14}
                mx="auto"
                my={1}
                borderRadius={4}
              />
            ) : (
              <ChainIcon {...{ chain }} boxSize={16} p={2} />
            )}
          </Box>
          <ChainIcon {...{ chain }} mx={2} boxSize="1.5em" />
        </Flex>
        <Flex w="full" direction="column" align="start">
          <Heading
            fontWeight="bold"
            style={{ fontVariant: 'small-caps' }}
            fontSize="xs"
            color={daoURL ? 'cyanText' : 'white'}
            ml={[0, '1em']}
            sx={{ textIndent: [0, '-1em'] }}
            textAlign={['center', 'left']}
            flexGrow={1}
          >
            {title ?? (
              <Text as="span">
                Unknown{' '}
                <Text as="span" textTransform="capitalize">
                  {chain}
                </Text>{' '}
                DAO
              </Text>
            )}
          </Heading>
          <Flex align="center" mt="0 !important">
            {memberRank && (
              <Text fontSize="xs" casing="capitalize" mr={3}>
                {memberRank}
              </Text>
            )}
            <Text fontSize="xs" ml={[1.5, 0]}>
              {stake}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </LinkGuild>
  );
};

export const GuildListing: React.FC<DAOListingProps> = React.forwardRef(
  ({
    membership: {
      title,
      memberShares,
      daoShares,
      memberRank,
      memberXP,
      chain,
      address,
      logoURL,
      visible,
      guildId,
    },
    playerId,
  }) => {
    const [, updatePlayerGuildVisibility] =
      useUpdatePlayerGuildVisibilityMutation();

    const handleUpdateVisibility = async () => {
      try {
        const response = await updatePlayerGuildVisibility({
          playerId,
          guildId,
          visible: !visible,
        });
        // Handle the response if necessary.
        // For example, you might want to update the UI based on the mutation's result:
        // if (response && response.data) {

        // }
      } catch (error) {
        throw Error(
          `Error upserting the Dework profile: ${(error as Error).message}`,
        );
      }
    };

    const stake = useMemo(() => {
      if (memberXP != null) {
        return `XP: ${Math.floor(memberXP)}`;
      }
      if (daoShares != null) {
        const member = memberShares ? Number(memberShares) : null;
        const dao = Number(daoShares);
        const percent =
          member != null ? ((member * 100) / dao).toFixed(3) : '?';
        return (
          <chakra.span
            textAlign={['center', 'left']}
            display={['flex', 'inline']}
            flexDirection={['column', 'inherit']}
          >
            <chakra.span mr={[0, 1]} _after={{ content: [undefined, '":"'] }}>
              Shares
            </chakra.span>
            <chakra.span whiteSpace="nowrap" title={`${percent}%`}>
              <Text as="sup">
                {member != null ? member.toLocaleString() : 'Unknown'}
              </Text>{' '}
              <chakra.span fontSize="lg" pos="relative" top={0.5}>
                ⁄
              </chakra.span>{' '}
              <Text as="sub">{dao.toLocaleString()}</Text>
            </chakra.span>
          </chakra.span>
        );
      }
      return null;
    }, [memberShares, memberXP, daoShares]);

    const daoURL = useMemo(() => getDAOLink(chain, address), [chain, address]);

    return (
      <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 4,
          py: 3,
          rounder: 'lg',
          bg: '#604B8B',
          mt: '1em',
          borderRadius: '8px',
        }}
      >
        <Flex align="center">
          <IconButton
            aria-label="hide guild"
            size="lg"
            icon={<BsEyeFill />}
            variant="unstyled"
            onClick={async () => {
              handleUpdateVisibility();
            }}
          ></IconButton>
          <Box bg="purpleBoxLight" minW={16} h={16} borderRadius={8}>
            {logoURL ? (
              <Image
                src={optimizedImage('logoURL', logoURL)}
                w={14}
                h={14}
                mx="auto"
                my={1}
                borderRadius={4}
              />
            ) : (
              <ChainIcon {...{ chain }} boxSize={16} p={2} />
            )}
          </Box>
          <ChainIcon {...{ chain }} mx={2} boxSize="1.5em" />
        </Flex>
        <Flex w="full" direction="column" align="start">
          <Heading
            fontWeight="bold"
            style={{ fontVariant: 'small-caps' }}
            fontSize="xs"
            color={daoURL ? 'cyanText' : 'white'}
            ml={[0, '1em']}
            sx={{ textIndent: [0, '-1em'] }}
            textAlign={['center', 'left']}
            flexGrow={1}
          >
            {title ?? (
              <Text as="span">
                Unknown{' '}
                <Text as="span" textTransform="capitalize">
                  {chain}
                </Text>{' '}
                DAO
              </Text>
            )}
          </Heading>
          <Flex align="center" mt="0 !important">
            {memberRank && (
              <Text fontSize="xs" casing="capitalize" mr={3}>
                {memberRank}
              </Text>
            )}
            <Text fontSize="xs" ml={[1.5, 0]}>
              {stake}
            </Text>
          </Flex>
        </Flex>
        <IconButton
          aria-label="drag n drop handle"
          size="lg"
          icon={<MdDragHandle />}
          variant="unstyled"
        ></IconButton>
      </Flex>
    );
  },
);

export const DAOMembershipSmall: React.FC<DAOListingProps> = ({
  membership: { title, chain, address, logoURL, guildname },
}) => {
  const daoURL = useMemo(() => getDAOLink(chain, address), [chain, address]);

  return (
    <Tooltip label={title ?? `Unknown ${chain} DAO`}>
      <Flex
        onClick={(e) => {
          e.preventDefault();
          if (guildname != null) {
            window.location.href = `/guild/${guildname}`;
          } else if (daoURL != null) {
            window?.open(daoURL, '_blank')?.focus();
          }
        }}
        align="center"
        justifyContent="center"
        bgColor="rgba(255, 255, 255, 0.06)"
        minW={8}
        h={8}
        borderRadius={8}
        pointerEvents="all"
      >
        {logoURL ? (
          <Image
            src={optimizedImage('logoURL', logoURL)}
            w={6}
            h={6}
            borderRadius="full"
            _hover={{ transform: 'scale(4)' }}
            transition="transform 0.2s"
          />
        ) : (
          <ChainIcon {...{ chain, tooltip: false }} boxSize={9} p={2} />
        )}
      </Flex>
    </Tooltip>
  );
};

type MembershipListProps = {
  isOpen: boolean;
  onClose: () => void;
  memberships: Array<GuildMembership>;
};

const MembershipListModal: React.FC<MembershipListProps> = ({
  isOpen,
  onClose,
  memberships,
}) => (
  <Modal {...{ isOpen, onClose }}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>DAO Memberships</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={2}
          p={4}
          justifyContent="center"
        >
          {memberships.map((membership) => (
            <DAOListing key={membership.memberId} {...{ membership }} />
          ))}
        </SimpleGrid>
      </ModalBody>
    </ModalContent>
  </Modal>
);

type MembershipSectionProps = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerMemberships: React.FC<MembershipSectionProps> = ({
  player,
  isOwnProfile,
  editing,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [memberships, setMemberships] = useState<GuildMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [editView, setEditView] = useState(false);
  const [addGuildView, setAddGuildView] = useState(false);
  const [layout, setLayout] = useState<Layout[]>();

  useEffect(() => {
    getAllMemberships(player).then(({ all }) => {
      setLoading(false);
      setMemberships(all);
    });
  }, [player]);

  useEffect(() => {
    const layouts: Layout[] = [];
    memberships?.map((membership) =>
      layouts.push({ i: membership.memberId, x: 0, y: 0, w: 3, h: 3 }),
    );
    setLayout(layouts);
  }, [memberships]);

  return (
    <ProfileSection
      title="Guild Memberships"
      type={BoxTypes.PLAYER_DAO_MEMBERSHIPS}
      {...{ isOwnProfile, editing }}
      sx={{
        bg: editView ? '#422F6A' : '',
      }}
    >
      {isOwnProfile && (
        <Box pos="absolute" right={-1} top={2}>
          <Button
            _hover={{ textDecoration: 'none' }}
            bg={'000000000'}
            onClick={() => {
              setEditView(!editView);
            }}
          >
            <IconButton
              aria-label="Edit Profile Info"
              size="lg"
              background="transparent"
              color="pinkShadeOne"
              icon={<EditIcon />}
              _hover={{ color: 'white' }}
              _focus={{ boxShadow: 'none' }}
              _active={{ transform: 'scale(0.8)' }}
              isRound
            />
          </Button>
        </Box>
      )}
      {!editView && loading && <LoadingState mb={6} />}

      {!editView && !loading && memberships.length === 0 && (
        <Text fontStyle="italic" textAlign="center" mb={4}>
          No Guild member&shy;ships found for{' '}
          {isOwnProfile ? 'you' : 'this player'}.
        </Text>
      )}

      <VStack align="stretch">
        {!editView &&
          memberships
            .filter((m) => m.visible)
            .slice(0, 4)
            .map((membership) => (
              <DAOListing {...{ membership }} key={membership.memberId} />
            ))}
      </VStack>

      {!editView && memberships.length > 4 && (
        <Box textAlign="end">
          <MembershipListModal {...{ isOpen, onClose, memberships }} />
          <ViewAllButton onClick={onOpen} size={memberships.length} />
        </Box>
      )}

      {editView && (
        <>
          <Text textAlign="left" mb={4}>
            Here you can modify your existing guild memberships, or add new
            ones.
            <br />
            Verified Guild Memberships can only be hidden whereas unverified
            ones can be removed.
          </Text>
          <ReactGridLayout
            isDraggable={!!editView}
            preventCollision={false}
            cols={12}
            rowHeight={30}
            layout={layout}
            onLayoutChange={(currentLayout) => setLayout(currentLayout)}
          >
            {memberships?.map((membership) => (
              <GuildListing
                {...{ membership }}
                key={membership.memberId}
                playerId={player?.id}
              />
            ))}
          </ReactGridLayout>
          <Button
            variant="unstyled"
            size="md"
            h="72px"
            w="100%"
            bg="#E9DFF133"
            border="2px dotted #ffffff25"
            onClick={() => setAddGuildView(!addGuildView)}
            leftIcon={<AddIcon />}
          >
            Add Membership
          </Button>
        </>
      )}
      {editView && addGuildView && (
        <>
          <AddPlayerGuild
            isOpen={addGuildView}
            onClose={() => setAddGuildView(false)}
            player={player}
          />
        </>
      )}
    </ProfileSection>
  );
};
