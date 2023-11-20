import {
  Box,
  ChainIcon,
  chakra,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
} from '@metafam/ds';
import { LinkGuild } from 'components/Player/PlayerGuild';
import { GuildMembership } from 'graphql/getMemberships';
import React, { useMemo } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { MdDragHandle } from 'react-icons/md';
import { getDAOLink } from 'utils/daoHelpers';
import { optimizedImage } from 'utils/imageHelpers';

export type DAOListingProps = {
  membership: GuildMembership;
  editing?: boolean;
  playerId?: string;
  onClose?: () => void;
  updateVisibility?: (visible: boolean) => void;
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
      updateVisibility,
    },
    ref,
  ) => {
    //@to-do ADD A BADGE FOR LEGITIMACY NITEGEIST
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
          }
        }}
        {...{ ref }}
      >
        <Flex align="center">
          {editing && (
            <FormLabel
              display="flex"
              justifyContent="center"
              _hover={{ cursor: 'pointer', color: 'purple.200' }}
            >
              {visible ? (
                <BsEyeFill size="2.5rem" />
              ) : (
                <BsEyeSlashFill size="2.5rem" />
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
        {editing && (
          <IconButton
            aria-label="drag n drop handle"
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
