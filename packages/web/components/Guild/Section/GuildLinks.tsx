import {
  Box,
  ChainIcon,
  Flex,
  Heading,
  IconButton,
  Link,
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
          {guild.websiteUrl && (
            <WrapItem>
              <Link href={guild.websiteUrl} target="_blank" rel="noreferrer">
                <IconButton
                  aria-label="Website"
                  icon={<FaGlobe />}
                  {...linkButtonProps}
                />
              </Link>
            </WrapItem>
          )}
          {guild.discordInviteUrl && (
            <WrapItem>
              <Link
                href={guild.discordInviteUrl}
                target="_blank"
                rel="noreferrer"
              >
                <IconButton
                  aria-label="Discord Server"
                  icon={<FaDiscord />}
                  {...linkButtonProps}
                />
              </Link>
            </WrapItem>
          )}
          {guild.githubUrl && (
            <WrapItem>
              <Link href={guild.githubUrl} target="_blank" rel="noreferrer">
                <IconButton
                  aria-label="Github"
                  icon={<FaGithub />}
                  {...linkButtonProps}
                />
              </Link>
            </WrapItem>
          )}
          {guild.twitterUrl && (
            <WrapItem>
              <Link href={guild.twitterUrl} target="_blank" rel="noreferrer">
                <IconButton
                  aria-label="Twitter"
                  icon={<FaTwitter />}
                  {...linkButtonProps}
                />
              </Link>
            </WrapItem>
          )}
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
                    sx={{
                      textIndent: [0, '-1em'],
                      fontVariant: 'small-caps',
                    }}
                    fontSize="xs"
                    color={daoURL ? 'cyanText' : 'white'}
                    ml={[0, '1em']}
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
  const mediaLinks = [
    {
      url: guild.websiteUrl,
      label: 'Website',
      icon: <FaGlobe />,
    },
    {
      url: guild.discordInviteUrl,
      label: 'Discord Server',
      icon: <FaDiscord />,
    },
    {
      url: guild.githubUrl,
      label: 'Github',
      icon: <FaGithub />,
    },
    {
      url: guild.twitterUrl,
      label: 'Twitter',
      icon: <FaTwitter />,
    },
  ];
  const hasIconLink = mediaLinks.reduce(
    (acc, link) => acc || !!link.url,
    false,
  );

  return (
    <Wrap>
      {hasIconLink && (
        <Wrap mb={4}>
          {mediaLinks.map(
            ({ url, label, icon }) =>
              url && (
                <MetaTileLinkWrapper>
                  <IconButton
                    onClick={() => {
                      if (url) {
                        window?.open(url, '_blank')?.focus();
                      }
                    }}
                    aria-label={label}
                    minW={6}
                    w={6}
                    h={6}
                    borderRadius="full"
                    {...{ icon, ...linkButtonProps }}
                  />
                </MetaTileLinkWrapper>
              ),
          )}
        </Wrap>
      )}
    </Wrap>
  );
};
