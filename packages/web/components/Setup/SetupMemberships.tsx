import {
  Box,
  Flex,
  Heading,
  HStack,
  MetaButton,
  MetaHeading,
  Text,
  Wrap,
} from '@metafam/ds';
import { Maybe, Optional } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { Membership } from 'graphql/types';
import { useWeb3 } from 'lib/hooks';
import React, { useState } from 'react';

import { getDaoLink, getMolochImage, LinkGuild } from '../Player/PlayerGuild';

export type SetupMembershipsProps = {
  memberships: Maybe<Optional<Array<Membership>>>;
  setMemberships: React.Dispatch<
    React.SetStateAction<Maybe<Optional<Array<Membership>>>>
  >;
};

export const SetupMemberships: React.FC<SetupMembershipsProps> = ({
  memberships,
}) => {
  const { connected } = useWeb3();
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const [loading, setLoading] = useState(false);

  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        Memberships
      </MetaHeading>
      {!memberships && (
        <Text mb={10} maxW="50rem">
          {connected ? 'Loading…' : 'Account Not Connected'}
        </Text>
      )}
      {memberships && memberships.length > 0 ? (
        <>
          <Text mb={10} maxW="50rem">
            We found the following guilds associated with your account and
            automatically added them to your profile. You can edit them later in
            your profile.
          </Text>
          <Wrap justify="center" mb={10} spacing={4} maxW="50rem">
            {memberships.map((member) => (
              <MembershipListing key={member.id} {...{ member }} />
            ))}
          </Wrap>
        </>
      ) : (
        <Text mb={10} maxW="50rem">
          We did not find any guilds associated with your account.
        </Text>
      )}
      <MetaButton
        onClick={() => {
          setLoading(true);
          onNextPress();
        }}
        mt={10}
        isLoading={loading}
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};

type MembershipListingProps = {
  member: Membership;
};

const MembershipListing: React.FC<MembershipListingProps> = ({
  member: {
    moloch: { id, title, chain },
  },
}) => {
  const guildLogo = getMolochImage(title ?? chain);
  const daoUrl = getDaoLink(chain, id);

  return (
    <LinkGuild {...{ daoUrl }} guildname={title}>
      <HStack alignItems="center" mb={4}>
        <Flex bg="purpleBoxLight" width={16} height={16} mr={6}>
          <Box
            bgImage={`url(${guildLogo})`}
            backgroundSize="cover"
            width={12}
            height={12}
            m="auto"
          />
        </Flex>
        <Box>
          <Heading
            _groupHover={{ textDecoration: 'underline' }}
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="xs"
            color={daoUrl ? 'cyanText' : 'white'}
            mb={1}
          >
            {title ?? `Unknown ${chain} DAO`}
          </Heading>
        </Box>
      </HStack>
    </LinkGuild>
  );
};
