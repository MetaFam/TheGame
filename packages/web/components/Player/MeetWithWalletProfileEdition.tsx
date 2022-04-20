import { Button, Link, MeetWithWalletIcon, Text, VStack } from '@metafam/ds';
import { ethereumHelper, Maybe } from '@metafam/utils';
import { Player } from 'graphql/autogen/types';
import { useProfileField, useWeb3 } from 'lib/hooks';
import React, { useEffect, useMemo, useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { getPlayerMeetwithWalletCalendarUrl } from 'utils/playerHelpers';

interface MeetWithWalletProps {
  player?: Maybe<Player>;
  setValue: UseFormSetValue<FieldValues>;
}

enum AccountStatus {
  NotCreated,
  NotLinked,
  Linked,
}

const MeetWithWalletProfileEdition: React.FC<MeetWithWalletProps> = ({
  player,
  setValue,
}) => {
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [pleaseSave, setPleaseSave] = useState(false);
  const [accountStatus, setAccountStatus] = useState(AccountStatus.NotCreated);
  const [calendarUrl, setCalendarUrl] = useState('');

  const { provider } = useWeb3();

  const address = useMemo(() => player?.ethereumAddress, [
    player?.ethereumAddress,
  ]);

  let information: JSX.Element;
  let buttonCopy: string;

  // 9tails.eth: As there is no current way of editing Profile Accounts,
  // and the MWW integratino happens on the EditProfileModal, to avoid
  // adding a new column to the table just to do the followig, I decided
  // to this this cast as any to use the information from the form and
  // don't do bigger changes on the data structure just because of it
  const profileFields = useProfileField({
    field: 'meetWithWalletDomain',
    player,
    getter: getPlayerMeetwithWalletCalendarUrl,
  });

  // eslint-disable-next-line
  const mwwDomain = (profileFields as any).meetWithWalletDomain || null;

  const checkAccount = async () => {
    if (mwwDomain && mwwDomain !== 'mww_remove') {
      setAccountStatus(AccountStatus.Linked);
      setLoading(false);
      return;
    }

    try {
      const result = await (
        await fetch(`/api/integrations/meetwithwallet/${address}`)
      ).json();
      if (result.calendar_url) {
        setAccountStatus(AccountStatus.NotLinked);
        setCalendarUrl(result.calendar_url);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to verify Meet with wallet account', e);
    }
    setLoading(false);
  };

  const linkAccount = async () => {
    setConnecting(true);

    let calURl = calendarUrl;

    if (accountStatus === AccountStatus.NotCreated && provider != null) {
      try {
        const sigMessageResult = await (
          await fetch(`/api/integrations/meetwithwallet/${address}`, {
            method: 'PUT',
          })
        ).json();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const signature = await ethereumHelper.getSignature(
          provider,
          sigMessageResult.message,
          ['meetwithwallet.xyz'],
        );
        const accountRequest = {
          address,
          signature,
          timezone:
            player?.profile?.timeZone ||
            Intl.DateTimeFormat().resolvedOptions().timeZone,
          nonce: sigMessageResult.nonce,
        };

        await fetch(`/api/integrations/meetwithwallet/${address}`, {
          method: 'POST',
          body: JSON.stringify(accountRequest),
        });
        calURl = (
          await (
            await fetch(`/api/integrations/meetwithwallet/${address}`)
          ).json()
        ).calendar_url;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Meet with wallet account creation failed', e);
      }
    }

    setValue('meetWithWalletDomain', calURl, { shouldDirty: true });

    setConnecting(false);
    setPleaseSave(true);
    setAccountStatus(AccountStatus.Linked);
  };

  const disconnect = async () => {
    setValue('meetWithWalletDomain', 'mww_remove', { shouldDirty: true });
    setPleaseSave(true);
    setAccountStatus(AccountStatus.NotLinked);
  };

  useEffect(() => {
    checkAccount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  switch (accountStatus) {
    case AccountStatus.NotCreated:
      information = (
        <Text pb={4} color="white">
          <Link isExternal href="https://meetwithwallet.xyz">
            Meet with Wallet
          </Link>{' '}
          is a web3 powered meeting schedule platform. If you don't have an
          account, one will be created automatically for you.
        </Text>
      );
      buttonCopy = 'Connect to Meet with Wallet';
      break;
    case AccountStatus.NotLinked:
      information = (
        <Text pb={4} color="white">
          Meet with Wallet is a web3 powered meeting schedule platform. If you
          don't have an account, one will be created automatically for you.
        </Text>
      );
      buttonCopy = 'Connect to Meet with Wallet';
      break;
    case AccountStatus.Linked:
      information = (
        <Text pb={4} color="white">
          You connected your Meet with Wallet Calendar. You can configure it at{' '}
          <Link isExternal href="https://meetwithwallet.xyz">
            meetwithwallet.xyz
          </Link>
        </Text>
      );
      buttonCopy = 'Disconnect calendar';
      break;
    default:
      information = <div />;
      buttonCopy = '';
      break;
  }

  return (
    <VStack alignItems="flex-start">
      {information}
      <Button
        onClick={() =>
          accountStatus === AccountStatus.Linked ? disconnect() : linkAccount()
        }
        isLoading={loading || connecting}
        leftIcon={<MeetWithWalletIcon />}
        variant="outline"
      >
        {buttonCopy}
      </Button>
      {pleaseSave && (
        <Text pb={4} color="white">
          Please save to apply Meet with wallet changes
        </Text>
      )}
    </VStack>
  );
};

export default MeetWithWalletProfileEdition;
