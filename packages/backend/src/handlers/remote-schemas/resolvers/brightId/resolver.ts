import { fetch } from '@metafam/utils';

import { CONFIG } from '../../../../config.js';
import { BrightIdStatus, QueryResolvers } from '../../autogen/types.js';

const CONTEXT = 'MetaGame';

const ENDPOINT = `${CONFIG.brightIdAppURL}/node/v5/verifications/${CONTEXT}`;

export const getBrightIdStatus: QueryResolvers['getBrightIdStatus'] = async (
  _,
  { contextId },
) => {
  if (!contextId) return null;

  try {
    const response = await fetch(`${ENDPOINT}/${contextId}`);
    if (!response.ok) return null;
    const responseData = (await response.json()) as { data: BrightIdStatus };
    return responseData.data;
  } catch (err) {
    return null;
  }
};
