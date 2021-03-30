import { Flex, MetaHeading } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  legacyGuilds: GuildFragmentFragment[];
  guild: GuildFragmentFragment;
};

export const GuildJoinSetup: React.FC<Props> = ({legacyGuilds, guild}) => {
  return (
    <FlexContainer flex="1" justify="start" mt={5}>
      <MetaHeading textAlign="center" mb={10} size="md">
        Add guild information
      </MetaHeading>
      { /* TODO get design input, change content and make responsive */ }
      <Flex
        direction="row"
        bg="whiteAlpha.200"
        style={{ backdropFilter: 'blur(7px)' }}
        rounded="lg"
        p="6"
        my="6"
        w="100%"
        align="stretch"
        justify="space-between"
      >

      </Flex>
    </FlexContainer>
  );
};
