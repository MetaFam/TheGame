import { AccountType_Enum } from '../../../lib/autogen/hasura-sdk.js';
import { client } from '../../../lib/hasuraClient.js';

export const handleMeetWithWalletIntegration = async (
  playerId: string,
  mwwValue: string,
) => {
  if (mwwValue === 'mww_remove') {
    await client.RemovePlayerAccount({
      playerId,
      accountType: AccountType_Enum.Meetwithwallet,
    });
  } else {
    await client.UpsertAccount({
      objects: [
        {
          playerId,
          type: AccountType_Enum.Meetwithwallet,
          identifier: mwwValue,
        },
      ],
    });
  }
};
