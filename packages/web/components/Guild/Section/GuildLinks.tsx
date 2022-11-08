import {
  Box,
  ChainIcon,
  Flex,
  Heading,
  IconButton,
  MetaTileLinkWrapper,
  Text,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { LinkGuild } from 'components/Player/PlayerGuild';
import { ProfileSection } from 'components/Section/ProfileSection';
import { GuildFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaDiscord, FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
import { BoxTypes } from 'utils/boxTypes';
import { getDAOLink } from 'utils/daoHelpers';

type Props = {
  guild: GuildFragment;
  editing: boolean;
};

export const linkButtonProps = {
  variant: 'outline',
  size: 'lg',
  colorScheme: 'blackAlpha',
  _hover: {
    color: 'white',
    bgColor: 'blackAlpha.500',
  },
};

export const GuildLinks: React.FC<Props> = ({ guild, editing }) => {
  const hasIconLink =
    guild.websiteUrl ||
    guild.discordInviteUrl ||
    guild.githubUrl ||
    guild.twitterUrl;

  return (
    <ProfileSection title="Links" type={BoxTypes.GUILD_LINKS} editing={editing}>
      {hasIconLink && (
        <Wrap mb={4}>
          {guild.websiteUrl ? (
            <WrapItem>
              <a href={guild.websiteUrl} target="_blank" rel="noreferrer">
                <IconButton
                  aria-label="Discord Server"
                  icon={<FaGlobe />}
                  {...linkButtonProps}
                />
              </a>
            </WrapItem>
          ) : null}
          {guild.discordInviteUrl ? (
            <WrapItem>
              <a href={guild.discordInviteUrl} target="_blank" rel="noreferrer">
                <IconButton
                  aria-label="Discord Server"
                  icon={<FaDiscord />}
                  {...linkButtonProps}
                />
              </a>
            </WrapItem>
          ) : null}
          {guild.githubUrl ? (
            <WrapItem>
              <a href={guild.githubUrl} target="_blank" rel="noreferrer">
                <IconButton
                  aria-label="Github"
                  icon={<FaGithub />}
                  {...linkButtonProps}
                />
              </a>
            </WrapItem>
          ) : null}
          {guild.twitterUrl ? (
            <WrapItem>
              <a href={guild.twitterUrl} target="_blank" rel="noreferrer">
                <IconButton
                  aria-label="Twitter"
                  icon={<FaTwitter />}
                  {...linkButtonProps}
                />
              </a>
            </WrapItem>
          ) : null}
        </Wrap>
      )}
      <Wrap justify="space-between" w="full" spacing={4} mb={2}>
        {guild.daos?.map((dao, index) => {
          const daoURL =
            dao.url || getDAOLink(dao.network, dao.contractAddress);

          return (
            <WrapItem key={index}>
              <LinkGuild {...{ daoURL }} guildname={null}>
                <Flex align="center" py={2} gap={2}>
                  <Box bg="purpleBoxLight" minW={12} h={12} borderRadius={8}>
                    <ChainIcon chain={dao.network} boxSize={12} p={2} />
                  </Box>
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
                    {dao.label ?? (
                      <Text as="span">
                        Unknown{' '}
                        <Text as="span" textTransform="capitalize">
                          {dao.network}
                        </Text>{' '}
                        DAO
                      </Text>
                    )}
                  </Heading>
                </Flex>
              </LinkGuild>
            </WrapItem>
          );
        })}
      </Wrap>
    </ProfileSection>
  );
};

type GuildLinkSmall = {
  guild: GuildFragment;
};

export const GuildLinksSmall: React.FC<GuildLinkSmall> = ({ guild }) => {
  const hasIconLink =
    guild.websiteUrl ||
    guild.discordInviteUrl ||
    guild.githubUrl ||
    guild.twitterUrl;

  return (
    <Wrap>
      {hasIconLink && (
        <Wrap mb={4}>
          {guild.websiteUrl ? (
            <MetaTileLinkWrapper>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (guild.websiteUrl)
                    window?.open(guild.websiteUrl, '_blank')?.focus();
                }}
                aria-label="Discord Server"
                icon={<FaGlobe />}
                minW={6}
                w={6}
                h={6}
                borderRadius="full"
                {...linkButtonProps}
              />
            </MetaTileLinkWrapper>
          ) : null}
          {guild.discordInviteUrl ? (
            <MetaTileLinkWrapper>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (guild.discordInviteUrl)
                    window?.open(guild.discordInviteUrl, '_blank')?.focus();
                }}
                aria-label="Discord Server"
                icon={<FaDiscord />}
                minW={6}
                w={6}
                h={6}
                borderRadius="full"
                {...linkButtonProps}
              />
            </MetaTileLinkWrapper>
          ) : null}
          {guild.githubUrl ? (
            <MetaTileLinkWrapper>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (guild.githubUrl)
                    window?.open(guild.githubUrl, '_blank')?.focus();
                }}
                aria-label="Github"
                icon={<FaGithub />}
                minW={6}
                w={6}
                h={6}
                borderRadius="full"
                {...linkButtonProps}
              />
            </MetaTileLinkWrapper>
          ) : null}
          {guild.twitterUrl ? (
            <MetaTileLinkWrapper>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (guild.twitterUrl)
                    window?.open(guild.twitterUrl, '_blank')?.focus();
                }}
                aria-label="Twitter"
                icon={<FaTwitter />}
                minW={6}
                w={6}
                h={6}
                borderRadius="full"
                {...linkButtonProps}
              />
            </MetaTileLinkWrapper>
          ) : null}
        </Wrap>
      )}
    </Wrap>
  );
};
