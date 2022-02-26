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
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { Maybe, Optional } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { Membership } from 'graphql/types';
import React, { useState } from 'react';
import { getDaoLink } from 'utils/daoHelpers';

import { useMounted, useWeb3 } from '../../lib/hooks';
import { DaoHausLink } from '../Player/PlayerGuild';

export type SetupMembershipsProps = {
  memberships: Array<Membership> | null | undefined;
  setMemberships: React.Dispatch<
    React.SetStateAction<Optional<Maybe<Array<Membership>>>>
  >;
};

export const SetupMemberships: React.FC<SetupMembershipsProps> = ({
  memberships,
}) => {
  const { connecting, connected } = useWeb3();
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const [loading, setLoading] = useState(false);
  const mounted = useMounted();

  return (
    <FlexContainer mb={8}>
      <MetaHeading mb={5} textAlign="center">
        Member&shy;ships
      </MetaHeading>
      {(() => {
        if (!memberships) {
          return (
            <Flex>
              <Spinner mr={4} />
              <Text mb={10} maxW="50rem">
                {!mounted || connecting || connected
                  ? 'Loading…'
                  : 'Account Not Connected'}
              </Text>
            </Flex>
          );
        }

        if (memberships.length === 0) {
          return (
            <Text mb={10} maxW="50rem">
              We did not find any guilds associated with your account.
            </Text>
          );
        }

        return (
          <Box maxW="50rem">
            <Text mb={10}>
              We found the following guilds associated with your account and
              automatically added them to your profile. You can edit them later
              in your profile.
            </Text>
            <Wrap columns={2} spacing={4}>
              {memberships?.map((member) => (
                <WrapItem key={member.id}>
                  <MembershipListing {...{ member }} />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        );
      })()}
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
  const daoURL = getDaoLink(member.moloch.chain, member.moloch.id);

  const { avatarURL, chain, title } = member.moloch;

  return (
    <DaoHausLink {...{ daoURL }} bg="dark">
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
