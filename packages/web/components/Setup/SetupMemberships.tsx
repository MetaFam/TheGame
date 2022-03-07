import {
  Box,
  ChainIcon,
  Flex,
  Heading,
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
import { ExternalDaoLink } from '../Player/PlayerGuild';

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
            <Text mb={10} textAlign="center">
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
    <ExternalDaoLink
      daoURL={daoURL}
      bg="rgba(0, 0, 0, 0.2)"
      border="2px transparent solid"
      _hover={{ borderColor: 'purpleBoxLight' }}
    >
      <Flex align="center" p={2}>
        <Flex align="center">
          <Box bg="purpleBoxLight" minW={16} h={16} borderRadius={8}>
            {avatarURL ? (
              <Image
                src={avatarURL}
                w={14}
                h={14}
                mx="auto"
                my={1}
                borderRadius={4}
              />
            ) : (
              <ChainIcon {...{ chain }} boxSize={16} p={2} />
            )}
          </Box>
          <ChainIcon {...{ chain }} mx={2} boxSize="1.5em" />
        </Flex>
        <Heading
          fontWeight="bold"
          style={{ fontVariant: 'small-caps' }}
          fontSize="xs"
          color="cyanText"
          ml={[0, '1em']}
          sx={{ textIndent: [0, '-1em'] }}
          textAlign={['center', 'left']}
          flexGrow={1}
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
        </Heading>
      </Flex>
    </ExternalDaoLink>
  );
};
