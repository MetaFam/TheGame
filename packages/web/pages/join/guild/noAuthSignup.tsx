import { Flex, LoadingState, MetaHeading, useToast } from '@metafam/ds';
import { FlexContainer, PageContainer } from 'components/Container';
import { EditGuildFormInputs, GuildForm } from 'components/Guild/GuildForm';
import { UnverifiedGuildForm } from 'components/Guild/UnverifiedGuildForm';
import React from 'react';

export const NoAuthSignup: React.FC = () => (
  <PageContainer>
    <FlexContainer flex="1" justify="start" mt={5}>
      <MetaHeading textAlign="center" mb={10} size="md">
        Add guild information
      </MetaHeading>
      <Flex
        direction="column"
        bg="whiteAlpha.200"
        backdropFilter="blur(7px)"
        rounded="lg"
        p="6"
        my="6"
        w="max-content"
        align="stretch"
        justify="space-between"
      >
        {/* <UnverifiedGuildForm /> */}
      </Flex>
    </FlexContainer>
  </PageContainer>
);
