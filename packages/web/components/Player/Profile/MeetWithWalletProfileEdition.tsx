import {
  Button,
  Link,
  MeetWithWalletIcon,
  Text,
  useToast,
  VStack,
} from '@metafam/ds';
import { ethereumHelper, Maybe } from '@metafam/utils';
import {
  AccountType_Enum,
  Player,
  useInsertPlayerAccountMutation,
  useRemovePlayerAccountMutation,
} from 'graphql/autogen/hasura-sdk';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { usePlayerHydrationContext } from '#contexts/PlayerHydrationContext';
import { useWeb3 } from '#lib/hooks/useWeb3';
import { errorHandler } from '#utils/errorHandler';
import { getPlayerMeetwithWalletCalendarUrl } from '#utils/playerHelpers';

interface MeetWithWalletProps {
  player?: Maybe<Player>;
}

enum AccountStatus {
  NotCreated,
  NotLinked,
  Linked,
}

const MeetWithWalletProfileEdition: React.FC<MeetWithWalletProps> = ({
  player,
}) => {
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [accountStatus, setAccountStatus] = useState(AccountStatus.NotCreated);
  const [calendarUrl, setCalendarUrl] = useState('');
  const toast = useToast();

  const { viemClients } = useWeb3();

  const [, insertAccount] = useInsertPlayerAccountMutation();
  const [, removeAccount] = useRemovePlayerAccountMutation();
  const { hydrateFromHasura } = usePlayerHydrationContext();

  const address = useMemo(
    () => player?.ethereumAddress,
    [player?.ethereumAddress],
  );

  const mwwDomain = useMemo(
    () => getPlayerMeetwithWalletCalendarUrl(player),
    [player],
  );

  const checkAccount = useCallback(async () => {
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
      console.error('Failed to verify Meet with wallet account', e);
      errorHandler(e as Error);
    }
    setLoading(false);
  }, [address, mwwDomain]);

  const linkAccount = useCallback(async () => {
    setConnecting(true);

    let calURL = calendarUrl;

    if (accountStatus === AccountStatus.NotCreated && !!viemClients) {
      try {
        const sigMessageResult = await (
          await fetch(`/api/integrations/meetwithwallet/${address}`, {
            method: 'PUT',
          })
        ).json();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const signature = await ethereumHelper.getSignature(
          viemClients.wallet,
          sigMessageResult.message,
          // ['meetwithwallet.xyz'],
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
        calURL = (
          await (
            await fetch(`/api/integrations/meetwithwallet/${address}`)
          ).json()
        ).calendar_url;
      } catch (e) {
        console.error('Meet with wallet account creation failed', e);
        errorHandler(e as Error);
      }
    }

    const result = await insertAccount({
      account: {
        playerId: player?.id,
        type: AccountType_Enum.Meetwithwallet,
        identifier: calURL,
      },
    });
    if (result.data?.insert_player_account_one?.identifier != null) {
      setAccountStatus(AccountStatus.Linked);
      hydrateFromHasura();
    } else {
      toast({
        title: 'Could Not Link Your Account',
        description: result.error?.message,
        status: 'error',
        isClosable: true,
        duration: 12000,
      });
    }

    setConnecting(false);
  }, [
    accountStatus,
    address,
    calendarUrl,
    hydrateFromHasura,
    insertAccount,
    player?.id,
    player?.profile?.timeZone,
    toast,
  ]);

  const disconnect = useCallback(async () => {
    const result = await removeAccount({
      playerId: player?.id,
      accountType: AccountType_Enum.Meetwithwallet,
    });
    if (result.data?.delete_player_account?.affected_rows === 1) {
      setAccountStatus(AccountStatus.NotLinked);
      hydrateFromHasura();
    } else {
      toast({
        title: 'Could not unlink your account',
        description: result.error?.message,
        status: 'error',
        isClosable: true,
        duration: 12000,
      });
    }
  }, [hydrateFromHasura, player?.id, removeAccount, toast]);

  useEffect(() => {
    checkAccount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    information,
    buttonCopy,
  }: { information: JSX.Element; buttonCopy: string } = useMemo(() => {
    let info: JSX.Element;
    let btnCopy: string;
    switch (accountStatus) {
      case AccountStatus.NotCreated:
        info = (
          <Text pb={4} color="white">
            <Link isExternal href="https://meetwithwallet.xyz">
              Meet with Wallet
            </Link>{' '}
            is a web3 powered meeting schedule platform. If you don't have an
            account, one will be created automatically for you on connect.
          </Text>
        );
        btnCopy = 'Connect to Meet with Wallet';
        break;
      case AccountStatus.NotLinked:
        info = (
          <Text pb={4} color="white">
            Meet with Wallet is a web3 powered meeting schedule platform. If you
            don't have an account, one will be created automatically for you on
            connect.
          </Text>
        );
        btnCopy = 'Connect to Meet with Wallet';
        break;
      case AccountStatus.Linked:
        info = (
          <Text pb={4} color="white">
            You connected your Meet with Wallet Calendar. You can configure it
            at{' '}
            <Link isExternal href="https://meetwithwallet.xyz">
              meetwithwallet.xyz
            </Link>
          </Text>
        );
        btnCopy = 'Disconnect calendar';
        break;
      default:
        info = <div />;
        btnCopy = '';
        break;
    }
    return {
      information: info,
      buttonCopy: btnCopy,
    };
  }, [accountStatus]);

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
    </VStack>
  );
};

export default MeetWithWalletProfileEdition;
