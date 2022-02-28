import { IconButton, Wrap, WrapItem } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { GuildFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaDiscord, FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';

type Props = {
  guild: GuildFragment;
};

export const GuildLinks: React.FC<Props> = ({ guild }) => (
  <ProfileSection title="Links">
    <Wrap>
      {guild.websiteUrl ? (
        <WrapItem>
          <a href={guild.websiteUrl} target="_blank" rel="noreferrer">
            <IconButton
              variant="outline"
              aria-label="Discord Server"
              size="lg"
              colorScheme="blackAlpha"
              icon={<FaGlobe />}
            />
          </a>
        </WrapItem>
      ) : null}
      {guild.discordInviteUrl ? (
        <WrapItem>
          <a href={guild.discordInviteUrl} target="_blank" rel="noreferrer">
            <IconButton
              variant="outline"
              aria-label="Discord Server"
              size="lg"
              bgColor="discord"
              icon={<FaDiscord />}
            />
          </a>
        </WrapItem>
      ) : null}
      {guild.githubUrl ? (
        <WrapItem>
          <a href={guild.githubUrl} target="_blank" rel="noreferrer">
            <IconButton
              variant="outline"
              aria-label="Github"
              size="lg"
              colorScheme="github"
              icon={<FaGithub />}
            />
          </a>
        </WrapItem>
      ) : null}
      {guild.twitterUrl ? (
        <WrapItem>
          <a href={guild.twitterUrl} target="_blank" rel="noreferrer">
            <IconButton
              variant="outline"
              aria-label="Twitter"
              size="lg"
              colorScheme="twitter"
              icon={<FaTwitter />}
            />
          </a>
        </WrapItem>
      ) : null}
    </Wrap>
  </ProfileSection>
);
