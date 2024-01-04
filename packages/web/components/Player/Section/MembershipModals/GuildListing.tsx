import {
  Box,
  ChainIcon,
  chakra,
  Flex,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
  Tooltip,
} from '@metafam/ds';
import { LinkGuild } from 'components/Player/PlayerGuild';
import { Exact, GuildType_Enum, InputMaybe } from 'graphql/autogen/types';
import { GuildMembership } from 'graphql/getMemberships';
import React, { useMemo } from 'react';
import {
  BsEyeFill,
  BsEyeSlashFill,
  BsPatchCheckFill,
  BsPatchQuestion,
} from 'react-icons/bs';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdDragHandle, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { getDAOLink } from 'utils/daoHelpers';
import { optimizedImage } from 'utils/imageHelpers';

export type SmallGuild = Exact<{
  id: string;
  description?: InputMaybe<string> | undefined;
  guildname: string;
  joinURL?: InputMaybe<string> | undefined;
  logo: string;
  name: string;
  websiteURL?: InputMaybe<string> | undefined;
  type: GuildType_Enum;
}>


export type DAOListingProps = {
  membership: GuildMembership;
  editing?: boolean;
  draggable?: boolean;
  playerId?: string;
  onClose?: () => void;
  updateVisibility?: (visible: boolean) => void;
  deleteMembership?: () => void;
};

export const GuildListing = React.forwardRef<HTMLDivElement, DAOListingProps>(
  (
    {
      membership: {
        id,
        title,
        memberShares,
        daoShares,
        memberRank,
        memberXP,
        chain,
        address,
        logoURL,
        visible,
        guildname,
        legitimacy,
      },
      editing = false,
      draggable = true,
      updateVisibility,
      deleteMembership,
    },
    ref,
  ) => {
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

    const inside = (
      <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 4,
          py: 3,
          rounder: 'lg',
          bg: 'rgba(0, 0, 0, 0.16)',
          mt: '1em',
          borderRadius: '8px',
          _hover: {
            bg: 'rgba(0, 0, 0, 0.24)',
          },
        }}
        {...{ ref }}
      >
        <Flex align="center">
          {editing && (
            <>
              {legitimacy === 'VERIFIED' ?
                <FormLabel
                  display="flex"
                  justifyContent="center"
                  _hover={{ cursor: 'pointer', color: 'purple.200' }}
                >
                  {visible ? (
                    <BsEyeFill size="1.5rem" />
                  ) : (
                    <BsEyeSlashFill size="1.5rem" />
                  )}
                  <Input
                    type="checkbox"
                    aria-label="hide guild"
                    id={`visible:${id}`}
                    checked={visible}
                    onChange={({ target: { checked } }) => {
                      updateVisibility?.(checked);
                    }}
                    display="none"
                  />
                </FormLabel>
                : <IconButton
                  aria-label='delete guild'
                  size='lg'
                  variant="unstyled"
                  icon={<MdOutlineRemoveCircleOutline />}
                  onClick={deleteMembership}
                />
              }
            </>
          )}
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
              legitimacy === 'VERIFIED' ? <ChainIcon {...{ chain }} boxSize={16} p={2} /> : ""
            )}
          </Box>
          { legitimacy === 'VERIFIED' ?  <ChainIcon {...{ chain }} mx={2} boxSize="1.5em" /> : <></>}
          <Tooltip label={`This Guild has ${legitimacy === 'VERIFIED' ? 'been verified' : 'not been verified '}`} placement='top' hasArrow>
            <Box mr={2} ml={2}>
              {legitimacy === 'VERIFIED' ? <BsPatchCheckFill /> : <BsPatchQuestion />}
            </Box>
          </Tooltip>
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
        {editing && draggable && (
          <IconButton
            className="guildDragHandle"
            aria-label="drag n drop handle"
            sx={{ cursor: 'grab', _active: { cursor: 'grabbing' } }}
            size="lg"
            icon={<MdDragHandle />}
            variant="unstyled"
          />
        )}
      </Flex>
    );

    return editing ? (
      inside
    ) : (
      <LinkGuild {...{ daoURL, guildname }}>{inside}</LinkGuild>
    );
  },
);

export const GuildListingSmall: React.FC<SmallGuild> = ({
  guildname,
  name,
  logo,
  websiteURL
}) => (
  <Flex
    onClick={(e) => {
      e.preventDefault();
      if (guildname !== null) {
        window.location.href = `/guild/${guildname}`;
      }
    }}
    align="center"
    justifyContent="space-between"
    bgColor="rgba(255, 255, 255, 0.06)"
    px="4"
    py="3"
    borderRadius={8}
    pointerEvents="all"
  >
    <Image
      src={optimizedImage('logoURL', logo)}
      h="48px"
      w="48px"
      borderRadius="8px"
    />
    <Icon color="cyan" boxSize={6} as={BsPatchQuestion} />
    <Box>
      <Text fontWeight="bold">
        {name}
      </Text>
      <Text>
        {websiteURL}
      </Text>
    </Box>
    <Icon boxSize={6} as={IoIosCheckmarkCircleOutline} />
  </Flex >
);
