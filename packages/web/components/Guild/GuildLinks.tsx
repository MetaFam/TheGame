import { IconButton, Wrap, WrapItem } from '@metafam/ds';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaDiscord, FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';

import { ProfileSection } from '../ProfileSection';

type Props = {
  guild: GuildFragmentFragment;
};

export const GuildLinks: React.FC<Props> = ({ guild }) => {
  return (
    <ProfileSection title="Links">
      <Wrap>
        {guild.website_url ? (
          <WrapItem>
            <a href={guild.website_url} target="_blank" rel="noreferrer">
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
        {guild.discord_invite_url ? (
          <WrapItem>
            <a
              href={guild.discord_invite_url}
              target="_blank"
              rel="noreferrer"
            >
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
        {guild.github_url ? (
          <WrapItem>
            <a href={guild.github_url} target="_blank" rel="noreferrer">
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
        {guild.twitter_url ? (
          <WrapItem>
            <a href={guild.twitter_url} target="_blank" rel="noreferrer">
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
};
