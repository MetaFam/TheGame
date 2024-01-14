import { HStack, ListItem, Stack, Text, UnorderedList } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { getPlayerPinnedQuestchains } from 'graphql/queries/player';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { GoLinkExternal } from 'react-icons/go';

export const QuestChainsPinned: React.FC = () => {
  const { user } = useUser();

  const [pinnedQuestChains, setPinnedQuestChains] = useState<
    Array<{
      id: any;
      questchain_id: string;
    }>
  >([]);

  useEffect(() => {
    const getPinnedQuestChains = async (playerId: string) => {
      const pinnedQCs = await getPlayerPinnedQuestchains(playerId);
      if (pinnedQCs) {
        setPinnedQuestChains(pinnedQCs.pinned_questchains);
      }
    };
    if (user?.id) getPinnedQuestChains(user.id);
  }, [setPinnedQuestChains, user?.id]);

  const extractQuestChainName = (questchainId: string) =>
    questchainId.split('-')[1];

  const formatUrl = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  return (
    <Stack p={6} w="100%" gap={4}>
      <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
        Pinned Quest Chains
      </Text>
      {pinnedQuestChains.length > 0 ? (
        <UnorderedList spacing={3}>
          {pinnedQuestChains.map((qc) => (
            <ListItem key={qc.id}>
              <MetaLink
                href={`/academy/${formatUrl(
                  extractQuestChainName(qc.questchain_id),
                )}`}
              >
                <HStack>
                  <Text>{extractQuestChainName(qc.questchain_id)}</Text>
                  <GoLinkExternal />
                </HStack>
              </MetaLink>
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Text>
          You haven't started any Quest Chains yet. Visit the{' '}
          <MetaLink href="/academy">Academy</MetaLink> to get started!
        </Text>
      )}
    </Stack>
  );
};
