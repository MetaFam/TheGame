import { Button, Wrap, WrapItem } from '@metafam/ds';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaDiscord, FaGlobe } from 'react-icons/fa';

type Props = {
  guild: GuildFragmentFragment;
};

export const GuildLinks: React.FC<Props> = ({ guild }) => (
  <Wrap>
    {guild.website_url ? (
      <WrapItem>
        <Button
          as="a"
          href={guild.website_url}
          target="_blank"
          size="xs"
          colorScheme="blackAlpha"
          leftIcon={<FaGlobe />}
        >
          Website
        </Button>
      </WrapItem>
    ) : null}
    {guild.discord_invite_url ? (
      <WrapItem>
        <Button
          as="a"
          href={guild.discord_invite_url}
          target="_blank"
          size="xs"
          bgColor="discord"
          _hover={{ bgColor: 'discordDark' }}
          leftIcon={<FaDiscord />}
        >
          Discord
        </Button>
      </WrapItem>
    ) : null}
  </Wrap>
);
