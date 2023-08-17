import {
  ComposeDBField,
  ComposeDBPayloadValue,
  Optional,
} from '@metafam/utils';

import { useUser } from '../useUser';
import { useGetPlayerProfileFromComposeDB } from './useGetPlayerProfileFromComposeDB';

/* 
 [Alec] I was originally using 

 query GetProfileField {
    viewer {
      profile {
        ${field}
      }
    }
  }

  but there is no way to specify *which* profile you're interested in if you end up with more than one (which is what happened to me during testing)
*/

export const useGetOwnProfileFieldFromComposeDB = <
  T extends ComposeDBPayloadValue,
>(
  field: ComposeDBField,
) => {
  const { user } = useUser();

  const { error, fetching, result } = useGetPlayerProfileFromComposeDB(
    user?.ceramicProfileId,
  );

  return { error, fetching, result: result?.[field] as Optional<T> };
};
