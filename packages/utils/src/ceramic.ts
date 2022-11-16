import type { EncodedManagedModel } from '@glazed/types';

const aliasKeys = ['schemas', 'definitions'] as const;

export const simplifyAliases = (aliases: Array<EncodedManagedModel>) => ({
  ...(Object.fromEntries(
    aliasKeys.map((key) => [
      key,
      Object.fromEntries(
        aliases
          .map((profile) =>
            Object.entries(profile[key]).map(([tileId, content]) => [
              content.alias,
              `ceramic://${tileId}`,
            ]),
          )
          .flat(),
      ),
    ]),
  ) as Record<typeof aliasKeys[number], Record<string, string>>),
  tiles: {},
});
