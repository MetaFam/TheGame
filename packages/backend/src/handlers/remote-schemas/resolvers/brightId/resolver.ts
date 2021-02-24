import { CONFIG } from '../../../../config';
import { QueryResolvers } from '../../autogen/types';

const ENDPOINT = `${CONFIG.brightIdNodeUrl}/node/v5/verifications/${CONFIG.brightIdContext}`;

export const getBrightIdStatus: QueryResolvers['getBrightIdStatus'] = async (
  _,
  { contextId },
) => {
  console.log({ contextId });
  if (!contextId) return null;

  try {
    const response = await fetch(`${ENDPOINT}/${contextId}`);
    if (!response.ok) return null;
    console.log({ response });
    const responseData = await response.json();
    console.log({ responseData });
    return responseData.data;
  } catch (err) {
    return null;
  }
};
