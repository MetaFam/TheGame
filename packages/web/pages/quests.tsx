import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  HStack,
  InfoIcon,
  LoadingState,
  MetaButton,
  Text,
  Tooltip,
  useToast,
  VStack,
} from '@metafam/ds';
import { Constants } from '@metafam/utils';
import { PageContainer } from 'components/Container';
import { QuestFilter } from 'components/Quest/QuestFilter';
import { QuestList } from 'components/Quest/QuestList';
import { questListDescriptionCss } from 'components/Quest/QuestListDescriptionCss';
import { HeadComponent } from 'components/Seo';
import { PlayerRole } from 'graphql/autogen/types';
import { getSSRClient } from 'graphql/client';
import { getQuests } from 'graphql/getQuests';
import { getPlayerRoles } from 'graphql/queries/enums/getRoles';
import { usePSeedBalance } from 'lib/hooks/balances';
import { useQuestFilter } from 'lib/hooks/quests';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { isAllowedToCreateQuest } from 'utils/questHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async (): Promise<{
  props: {
    urqlState: any;
    roleChoices: Array<PlayerRole>;
  };
  revalidate: 1;
}> => {
  const roleChoices = await getPlayerRoles();
  const [ssrClient, ssrCache] = getSSRClient();
  // This populates the cache server-side
  await getQuests(undefined, ssrClient);

  return {
    props: {
      urqlState: ssrCache.extractData(),
      roleChoices,
    },
    revalidate: 1,
  };
};

const QuestsPage: React.FC<Props> = ({ roleChoices }) => {
  const router = useRouter();
  const {
    quests,
    aggregates,
    fetching,
    error,
    queryVariables,
    setQueryVariable,
  } = useQuestFilter();
  const { pSeedBalance, fetching: fetchingBalance } = usePSeedBalance();
  const toast = useToast();
  const canCreateQuest = useMemo(
    () => isAllowedToCreateQuest(pSeedBalance),
    [pSeedBalance],
  );

  // Quest dashboard widget tooltip
  // - The text is shown as a hoverable tooltip for big screens
  // - For small screens the tooltip is replaced with a toggle accordion
  const questDashboardTooltipText = {
    title: 'Quests info right in your dashboard',
    text: 'Note that there are two quest-related dashboard widgets as well. One for managing submissions for quests you created, and another for viewing your own submissions. Click on “Edit Layout” on the dashboard page to check them out.',
  };

  return (
    <PageContainer sx={questListDescriptionCss}>
      <HeadComponent
        title="MetaGame Quests"
        description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
        url="https://metagame.wtf/quests"
      />
      {/* VStack is used for consistent spacing between its children, and to provide a full height container as the flow root for the sticky nav */}
      <VStack w="100%" spacing={8} pb={8}>
        <Box w="full" maxW="7xl">
          <Accordion
            allowToggle
            w="full"
            mt={{ base: '3', sm: '0' }}
            display={{ base: 'block', md: 'none' }}
          >
            <AccordionItem
              px={2}
              py={2}
              bgColor="blackAlpha.400"
              borderColor="whiteAlpha.400"
              borderRadius={4}
              borderWidth={1}
              fontSize="sm"
            >
              {/* "AccordionButton must be wrapped in an element with role=heading" */}
              <h2>
                <AccordionButton color="gray.300" fontSize="sm" p={0}>
                  <AccordionIcon mr={2} />
                  {questDashboardTooltipText.title}
                </AccordionButton>
              </h2>
              <AccordionPanel color="white" pb={2} pl={6}>
                <Text maxW="60ch">{questDashboardTooltipText.text}</Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Flex
            align="left"
            alignItems="center"
            flexDirection={{
              base: 'column',
              md: 'row',
            }}
            gap={6}
          >
            <HStack w="full" flexBasis="100%">
              <Heading
                as="h1"
                fontFamily="body"
                fontWeight="600"
                fontSize={{ base: '4xl', sm: '5xl' }}
              >
                Quest Explorer
              </Heading>
              <Tooltip label={questDashboardTooltipText.text}>
                <InfoIcon display={{ base: 'none', md: 'block' }} />
              </Tooltip>
            </HStack>
            <Box w="full" maxW={{ base: '100%', md: '11rem' }}>
              <Tooltip
                label={
                  !canCreateQuest &&
                  `You need to hold at least ${Constants.PSEED_FOR_QUEST} pSEED to create a quest.`
                }
              >
                <MetaButton
                  borderRadius={4}
                  fontSize="md"
                  letterSpacing="auto"
                  size="md"
                  w="full"
                  isLoading={fetchingBalance}
                  onClick={() => {
                    if (!canCreateQuest) {
                      toast({
                        title: 'Error',
                        description: `Insufficient pSEED Balance. Must have ≥ ${Constants.PSEED_FOR_QUEST} pSEED.`,
                        status: 'error',
                        isClosable: true,
                      });
                    } else {
                      router.push('/quest/create');
                    }
                  }}
                >
                  Create Quest
                </MetaButton>
              </Tooltip>
            </Box>
          </Flex>
        </Box>

        <QuestFilter
          quests={quests || []}
          {...{
            roleChoices,
            aggregates,
            queryVariables,
            setQueryVariable,
          }}
        />

        <Box w="full" maxW="7xl">
          <Box w="full">
            {fetching && <LoadingState />}
            {error && <Text>{`Error: ${error.message}`}</Text>}
            {quests && !fetching && <QuestList {...{ quests }} />}
          </Box>
        </Box>
      </VStack>
    </PageContainer>
  );
};

export default QuestsPage;
