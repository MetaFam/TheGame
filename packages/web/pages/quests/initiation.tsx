import { Accordion, Box, Flex, Spinner, Text, VStack } from '@metafam/ds';
import { INITIATION_QUESTS_INFO } from '@metafam/utils/src/constants';
import { graphql } from '@quest-chains/sdk';
import { PageContainer } from 'components/Container';
import { Quest } from 'components/Quest/InitiationQuestTile';
import { HeadComponent } from 'components/Seo';
import { useLatestQuestChainData } from 'lib/hooks/useLatestQuestChainData';
import { useLatestQuestStatusesForUserAndChainData } from 'lib/hooks/useLatestQuestStatusesForUserAndChainData';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const { getQuestChainInfo } = graphql;

export type UserStatusType = {
  [questId: string]: {
    submissions: {
      description: string | undefined | null;
      externalUrl: string | undefined | null;
      timestamp: string;
    }[];
    reviews: {
      description: string | undefined | null;
      externalUrl: string | undefined | null;
      timestamp: string;
      reviewer: string;
      accepted: boolean;
    }[];
    status: graphql.Status;
  };
};

type Props = {
  questChain: graphql.QuestChainInfoFragment;
};

const InitiationQuests: React.FC<Props> = ({ questChain: inputQuestChain }) => {
  const { address } = INITIATION_QUESTS_INFO;
  const [progress, setProgress] = useState({
    total: 0,
    inReviewCount: 0,
    completeCount: 0,
  });

  const {
    questChain,
    fetching: fetchingQuests,
    refresh: refreshQuests,
  } = useLatestQuestChainData(inputQuestChain);

  const {
    questStatuses,
    fetching: fetchingStatus,
    refresh: refreshStatus,
  } = useLatestQuestStatusesForUserAndChainData(
    questChain?.chainId,
    questChain?.address,
    address,
  );

  const fetching = fetchingStatus || fetchingQuests;

  const refresh = useCallback(() => {
    refreshStatus();
    refreshQuests();
  }, [refreshQuests, refreshStatus]);

  const userStatus: UserStatusType = useMemo(() => {
    const userStat: UserStatusType = {};
    questStatuses.forEach((item) => {
      userStat[item.quest.questId] = {
        status: item.status,
        submissions: item.submissions.map((sub) => ({
          description: sub.description,
          externalUrl: sub.externalUrl,
          timestamp: sub.timestamp,
        })),
        reviews: item.reviews.map((sub) => ({
          description: sub.description,
          externalUrl: sub.externalUrl,
          timestamp: sub.timestamp,
          accepted: sub.accepted,
          reviewer: sub.reviewer.id,
        })),
      };
    });
    return userStat;
  }, [questStatuses]);

  useEffect(() => {
    if (questChain) {
      if (questChain?.quests) {
        const inReviewCount = questChain.quests.filter(
          (quest) => userStatus[quest.questId]?.status === 'review',
        ).length;
        const completeCount = questChain.quests.filter(
          (quest) => userStatus[quest.questId]?.status === 'pass',
        ).length;

        setProgress({
          inReviewCount: inReviewCount || 0,
          completeCount: completeCount || 0,
          total: questChain.quests.length || 0,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questChain, userStatus]);

  const canMint = useMemo(
    () =>
      !!address &&
      questChain?.token &&
      !questChain.token.owners.find((o) => o.id === address.toLowerCase()) &&
      Object.values(userStatus).length === questChain.quests.length &&
      Object.values(userStatus).reduce(
        (t, v) => t && v.status === graphql.Status.Pass,
        true,
      ),
    [questChain, address, userStatus],
  );

  if (!questChain) {
    return (
      <PageContainer>
        <Text> Quest Chain not found! </Text>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HeadComponent
        title="MetaGame Quests"
        description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
        url="https://my.metagame.wtf/quests/initiation"
      />

      <Flex
        gap={10}
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
      >
        {/* Left */}
        <Flex flexDirection="column" w="full">
          {/* Quest Chain Title */}
          <Flex justifyContent="space-between" w="full">
            <Flex flexDirection="column" mb={8}>
              <Text
                fontSize="5xl"
                fontWeight="bold"
                lineHeight="3.5rem"
                fontFamily="heading"
                mb={3}
              >
                {questChain.name}
              </Text>
              <Box>{questChain.chainId}</Box>
            </Flex>
          </Flex>

          {/* Quest Chain Description */}
          <Flex mb={8}>{questChain.description}</Flex>

          {/* Quest Chain Metadata */}
          <Flex mb={8} justifyContent="space-between" gap={1}>
            <Box>
              <Text color="whiteAlpha.600" fontSize="xs">
                TOTAL PLAYERS
              </Text>
              <Text>{questChain.numQuesters}</Text>
            </Box>
            <Box>
              <Text color="whiteAlpha.600" fontSize="xs">
                PLAYERS FINISHED
              </Text>
              <Text>{questChain.numCompletedQuesters}</Text>
            </Box>
            <Box>
              <Text color="whiteAlpha.600" fontSize="xs">
                QUESTS
              </Text>
              <Text>{questChain.quests.length}</Text>
            </Box>
            <Box>
              <Text color="whiteAlpha.600" fontSize="xs">
                DATE CREATED
              </Text>
              <Text>
                {new Date(questChain.createdAt * 1000).toLocaleDateString(
                  'en-US',
                )}
              </Text>
            </Box>
            <Box>
              <Text color="whiteAlpha.600" fontSize="xs">
                CREATED BY
              </Text>
              {questChain.createdBy.id}
            </Box>
          </Flex>

          {/* Actions */}
          <Flex
            w="full"
            justifyContent="space-between"
            h={6}
            alignItems="center"
            mb={6}
          >
            <Flex
              w="90%"
              borderColor="whiteAlpha.200"
              border="1px solid"
              borderRadius={3}
            >
              <Box
                bg="main"
                w={`${
                  (progress.total
                    ? progress.completeCount / progress.total
                    : 0) * 100
                }%`}
              />
              <Box
                bgColor="pending"
                w={`${
                  (progress.total
                    ? progress.inReviewCount / progress.total
                    : 0) * 100
                }%`}
              />
              <Box bgColor="grey" h={2} />
            </Flex>
            <Text>
              {`${Math.round(
                (progress.total ? progress.completeCount / progress.total : 0) *
                  100,
              )}%`}
            </Text>
          </Flex>
          <Flex>
            {/* Mint Tile */}
            {canMint && (
              <Flex pt={6} w="100%">
                NFT MINT TILE - TO BE IMPLEMENTED
                {/* <MintNFTTile
                  {...{
                    questChain,
                    onSuccess: refresh,
                    completed: questChain.quests.filter((q) => !q.paused)
                      .length,
                  }}
                /> */}
              </Flex>
            )}
          </Flex>

          {/* Quests */}
          <VStack spacing={6} w="100%" pt={8}>
            {fetching ? (
              <Spinner />
            ) : (
              <>
                <Flex
                  justifyContent="space-between"
                  w="full"
                  alignItems="center"
                >
                  <Text fontSize={40} fontFamily="heading">
                    QUESTS
                  </Text>
                </Flex>

                {/* would be really nice if this was refactored by 
                  separating the whole quest actions logic into its own component, so:
                  - edit quest
                  - upload proof */}
                <Accordion allowMultiple w="full">
                  {questChain.quests.map(
                    ({ name, description, questId }, index) =>
                      name &&
                      description && (
                        <Quest
                          key={questId}
                          name={`${index + 1}. ${name}`}
                          description={description}
                          bgColor={
                            // eslint-disable-next-line no-nested-ternary
                            userStatus[questId]?.status === 'pass'
                              ? 'main.300'
                              : userStatus[questId]?.status === 'review'
                              ? '#EFFF8F30'
                              : 'whiteAlpha.100'
                          }
                          questId={questId}
                          questChain={questChain}
                          userStatus={userStatus}
                          refresh={refresh}
                        />
                      ),
                  )}
                </Accordion>
              </>
            )}
          </VStack>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export const getStaticProps = async () => {
  let questChain;
  try {
    questChain = await getQuestChainInfo(
      INITIATION_QUESTS_INFO.chainId,
      INITIATION_QUESTS_INFO.address,
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `Could not fetch Quest Chain for address ${INITIATION_QUESTS_INFO.address}`,
      error,
    );
  }

  return {
    props: {
      questChain,
    },
    revalidate: 1,
  };
};

export default InitiationQuests;
