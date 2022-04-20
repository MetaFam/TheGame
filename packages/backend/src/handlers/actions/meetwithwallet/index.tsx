import { ExtendedProfile } from '@metafam/utils';

import { AccountType_Enum } from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';

export const handledMeetWithWalletIntegration = async (
  playerId: string,
  fromKey: string,
  extendedProfile: ExtendedProfile,
): Promise<boolean> => {
  if (fromKey === 'meetWithWalletDomain') {
    if (extendedProfile[fromKey] === 'mww_remove') {
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
            identifier: extendedProfile[fromKey] as string,
          },
        ],
      });
    }
    return true;
  }
  return false;
};
