import {
  Box,
  ChainIcon,
  Flex,
  Heading,
  HStack,
  Image,
  MetaButton,
  MetaHeading,
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
import { getDAOLink } from 'utils/daoHelpers';

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
            <Text mb={10} maxW="35rem" textAlign="center">
              We found the following guilds associated with your account and
              automatically added them to your profile.
            </Text>
            <Wrap columns={2} spacing={4} justify="center">
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

const MembershipListing: React.FC<MembershipListingProps> = ({
  member: { moloch },
}) => {
  const { id: molochId, avatarURL, chain, title } = moloch;
  const daoURL = getDAOLink(chain, molochId);

  return (
    <DaoHausLink
      {...{ daoURL }}
      bg="dark"
      border="2px transparent solid"
      _hover={{ borderColor: 'purpleBoxLight' }}
    >
      <HStack align="center">
        <Flex bg="purpleBoxLight" width={16} height={16} mr={1}>
          {avatarURL ? (
            <Image
              src={avatarURL}
              w="3.25rem"
              h="3.25rem"
              m="auto"
              borderRadius={4}
            />
          ) : (
            <ChainIcon {...{ chain }} boxSize={16} p={2} />
          )}
        </Flex>
        <Heading
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="xs"
          color={daoURL ? 'cyanText' : 'white'}
          justify="center"
          align="center"
        >
          {title ?? (
            <Text as={React.Fragment}>
              Unknown{' '}
              <Text as="span" textTransform="capitalize">
                {chain}
              </Text>{' '}
              DAO
            </Text>
          )}
          <ChainIcon {...{ chain }} mx={2} boxSize={4} />
        </Heading>
      </HStack>
    </DaoHausLink>
  );
};
