import {
  Box,
  ChainIcon,
  Flex,
  Heading,
  IconButton,
  MetaTileLinkWrapper,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { LinkGuild } from 'components/Player/PlayerGuild';
import { ProfileSection } from 'components/Section/ProfileSection';
import { GuildFragment } from 'graphql/autogen/types';
import React from 'react';
import {
  FaDiscord,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaHome,
  FaTwitter,
} from 'react-icons/fa';
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

  const links = {
    websiteUrl: {
      label: 'Visit our website',
      link: guild.websiteUrl,
      icon: <FaHome />,
    },
    discordInviteUrl: {
      label: 'Join our Discord server',
      link: guild.discordInviteUrl,
      icon: <FaDiscord />,
    },
    githubUrl: {
      label: 'Check our work on GitHub',
      link: guild.githubUrl,
      icon: <FaGithub />,
    },
    twitterUrl: {
      label: 'Find us on Twitter',
      link: guild.twitterUrl,
      icon: <FaTwitter />,
    },
  };

  return (
    <ProfileSection
      title="Social"
      type={BoxTypes.GUILD_LINKS}
      editing={editing}
    >
      {hasIconLink && (
        <VStack mb={4} w="full">
          {Object.entries(links).map(([key, value]) => {
            if (!guild[key as keyof GuildFragment]) return '';
            return (
              <a
                href={value.link || ''}
                target="_blank"
                rel="noreferrer"
                style={{ width: '100%' }}
                role="group"
                key={key}
              >
                <Flex
                  justifyContent="start"
                  alignContent="center"
                  color={'violet'}
                  width={'full'}
                  px={4}
                  py={3}
                  background={'blackAlpha.300'}
                  transition={'ease-in-out'}
                  transitionDuration={'300'}
                  _hover={{
                    background: 'blackAlpha.500',
                  }}
                  _active={{
                    background: 'blackAlpha.700',
                  }}
                  rounded={'md'}
                >
                  <Box my="auto" ml={2}>
                    {value.icon}
                  </Box>
                  <Text mx="auto" fontWeight={600}>
                    {value.label}
                  </Text>
                  <Box
                    my="auto"
                    mr={1}
                    opacity={0}
                    _groupHover={{ opacity: 0.8 }}
                    _groupActive={{ opacity: 1 }}
                  >
                    <FaExternalLinkAlt fill="currentColor" />
                  </Box>
                </Flex>
              </a>
            );
          })}
        </VStack>
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
        <VStack mb={4}>
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
              Website
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
        </VStack>
      )}
    </Wrap>
  );
};
