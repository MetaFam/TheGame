import { CONFIG } from '../../../../config';
import { QueryResolvers } from '../../autogen/types';

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
    const responseData = await response.json();
    return responseData.data;
  } catch (err) {
    return null;
  }
};
