import { CONFIG } from '#config.js';

const CONTEXT = 'MetaGame';

const ENDPOINT = `${CONFIG.brightIdAppURL}/node/v5/verifications/${CONTEXT}`;

export type BrightIdStatus = {
  unique: boolean
  app: string
  context: string
  contextids: Array<string>
}


export const getBrightIdStatus = async (
  _: unknown,
  { contextId }: { contextId: string },
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
