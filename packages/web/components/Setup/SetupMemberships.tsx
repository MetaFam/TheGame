import {
  Box,
  Center,
  ChainIcon,
  Flex,
  Heading,
  HStack,
  Image,
  MetaButton,
  MetaHeading,
  SimpleGrid,
  Text,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { Membership } from 'graphql/types';
import React, { useState } from 'react';
import { getDaoLink } from 'utils/daoHelpers';

import { useWeb3 } from '../../lib/hooks';
import { DaoHausLink } from '../Player/PlayerGuild';

export type SetupMembershipsProps = {
  memberships: Array<Membership> | null | undefined;
  setMemberships: React.Dispatch<
    React.SetStateAction<Array<Membership> | null | undefined>
  >;
};

export const SetupMemberships: React.FC<SetupMembershipsProps> = ({
  memberships,
}) => {
  const { connected } = useWeb3();
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const [loading, setLoading] = useState(false);

  return (
    <FlexContainer mb={8}>
      <MetaHeading mb={5} textAlign="center">
        Memberships
      </MetaHeading>
      {!memberships && (
        <Text mb={10} maxW="50rem">
          {connected ? 'Loading…' : 'Account Not Connected'}
        </Text>
      )}
      {memberships &&
        (memberships.length > 0 ? (
          <Box maxW="50rem">
            <Text mb={10}>
              We found the following guilds associated with your account and
              automatically added them to your profile. You can edit them later
              in your profile.
            </Text>
            <SimpleGrid columns={2} spacing={4}>
              {memberships.map((member) => (
                <MembershipListing key={member.id} member={member} />
              ))}
            </SimpleGrid>
          </Box>
        ) : (
          <Text mb={10} maxW="50rem">
            We did not find any guilds associated with your account.
          </Text>
        ))}
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

const MembershipListing: React.FC<MembershipListingProps> = ({ member }) => {
  const daoUrl = getDaoLink(member.moloch.chain, member.moloch.id);

  const { avatarUrl, chain, title } = member.moloch;

  return (
    <DaoHausLink daoUrl={daoUrl}>
      <HStack alignItems="center" mb={4}>
        <Flex bg="purpleBoxLight" width={16} height={16} mr={6}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              w="3.25rem"
              h="3.25rem"
              m="auto"
              borderRadius={4}
            />
          ) : (
            <ChainIcon chain={chain} boxSize={16} p={2} />
          )}
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
            <Center justifyContent="left">
              {title ?? (
                <Text>
                  Unknown{' '}
                  <Text as="span" textTransform="capitalize">
                    {chain}
                  </Text>{' '}
                  DAO
                </Text>
              )}
              <ChainIcon chain={chain} ml={2} boxSize={3} />
            </Center>
          </Heading>
        </Box>
      </HStack>
    </DaoHausLink>
  );
};
