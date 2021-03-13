import {
  MetaButton,
  MetaHeading,
  MetaTag,
  Text,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { Membership } from 'graphql/types';
import { useWeb3 } from 'lib/hooks';
import React from 'react';

export type SetupMembershipsProps = {
  memberships: Array<Membership> | null | undefined;
  setMemberships: React.Dispatch<
    React.SetStateAction<Array<Membership> | null | undefined>
  >;
}

export const SetupMemberships: React.FC<SetupMembershipsProps> = (
  ({memberships}) => {
    const { isConnected } = useWeb3();
    const { onNextPress, nextButtonLabel } = useSetupFlow();

    return (
      <FlexContainer>
        <MetaHeading mb={5} textAlign="center">
          Member&#xAD;ships
        </MetaHeading>
        {((!memberships) && (
          <Text mb={10} maxW="50rem">
            {(isConnected
              ? 'Loading…'
              : 'Account not connected.'
            )}
          </Text>
        ))}
        {memberships &&
          ((memberships.length > 0)
            ? (
              <>
                <Text mb={10} maxW="50rem">
                  We found the following guilds associated
                  with your account and automatically added
                  them to your profile. You can edit them
                  later in your profile.
                </Text>
                <Wrap justify="center" mb={10} spacing={4} maxW="50rem">
                  {memberships.map((member) => (
                    <WrapItem key={member.id}>
                      <MetaTag size="lg" fontWeight="normal">
                        {member.moloch.title}
                      </MetaTag>
                    </WrapItem>
                  ))}
                </Wrap>
              </>
            ) : (
              <Text mb={10} maxW="50rem">
                We did not find any guilds associated with your account.
              </Text>
            )
          )
        }
        <MetaButton
          mt={10}
          onClick={onNextPress}
          ref={input => input?.focus()}
        >
          {nextButtonLabel}
        </MetaButton>
      </FlexContainer>
    );
  }
);
