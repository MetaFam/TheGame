import { MetaButton, MetaHeading, MetaTag, Text, Wrap } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { SetupContext } from 'contexts/SetupContext';
import { Web3Context } from 'contexts/Web3Context';
import { getMemberships } from 'graphql/getMemberships';
import React, { useContext, useEffect } from 'react';

export const SetupMemberships: React.FC = () => {
  const { address, isConnected } = useContext(Web3Context);
  const {
    onNextPress,
    nextButtonLabel,
    memberships,
    setMemberships,
  } = useContext(SetupContext);
  useEffect(() => {
    getMemberships(address).then((data) => {
      setMemberships(data);
    });
  }, [address, setMemberships]);
  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        Memberships
      </MetaHeading>
      {!memberships &&
        (isConnected ? (
          <Text mb={10} maxW="50rem">
            Loading ...
          </Text>
        ) : (
          <Text mb={10} maxW="50rem">
            Account not connected
          </Text>
        ))}
      {memberships &&
        (memberships.length > 0 ? (
          <>
            <Text mb={10} maxW="50rem">
              We found the following guilds associated with your account and
              automatically added them to your profile. You can edit them later
              in your profile.
            </Text>
            <Wrap justify="center" mb={10} spacing={4} maxW="50rem">
              {memberships.map((member) => (
                <MetaTag key={member.id} size="lg" fontWeight="normal">
                  {member.moloch.title}
                </MetaTag>
              ))}
            </Wrap>
          </>
        ) : (
          <Text mb={10} maxW="50rem">
            We did not find any guilds associated with your account.
          </Text>
        ))}
      <MetaButton onClick={onNextPress} mt={10}>
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
