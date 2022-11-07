import {
  Box,
  Button,
  Center,
  ExternalLinkIcon,
  Flex,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useDisclosure,
} from '@metafam/ds';
import { CompletionStatusTag } from 'components/Quest/QuestTags';
import {
  QuestCompletionFragment,
  QuestCompletionStatus_Enum,
} from 'graphql/autogen/types';
import { getCompletedQuestsByPlayerQuery } from 'graphql/getQuests';
import { useUser } from 'lib/hooks';
import React, { useEffect, useMemo, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

export const DashboardQuestsCompleted: React.FC = () => {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [quests, setQuests] = useState<Array<QuestCompletionFragment>>([]);

  const questsByStatus = useMemo(
    () =>
      quests.reduce(
        (
          grouping: {
            [key in QuestCompletionStatus_Enum]?: Array<QuestCompletionFragment>;
          },
          quest,
        ) => {
          if (!grouping[quest.status]) {
            // eslint-disable-next-line no-param-reassign
            grouping[quest.status] = [];
          }
          grouping[quest.status]?.push(quest);
          return grouping;
        },
        {},
      ),
    [quests],
  );

  useEffect(() => {
    const loadQuests = async () => {
      try {
        const response = await getCompletedQuestsByPlayerQuery(user?.id);
        if (response.length) {
          setQuests(response);
        }
      } catch (error) {
        console.error("Couldn't fetch quests", error);
        errorHandler(error as Error);
      }
    };
    loadQuests();
  }, [user?.id]);

  return quests.length ? (
    <>
      <Box mt={2}>
        <UnorderedList>
          {quests.slice(0, 10).map((quest) => (
            <ListItem key={quest.id}>
              <Flex mb={2}>
                <Center mr={2}>
                  <Link href={`/quest/${quest.questId}`} color="white">
                    <Text fontSize="l">{quest.completed?.title}</Text>
                  </Link>
                </Center>
                <CompletionStatusTag status={quest.status} />
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      {quests.length && (
        <Box position="absolute" top={4} right={2}>
          <Button
            color="pinkShadeOne"
            background="transparent"
            _hover={{ color: 'white' }}
            _focus={{ boxShadow: 'none' }}
            _active={{ transform: 'scale(0.8)' }}
            onClick={onOpen}
          >
            Show All
          </Button>
        </Box>
      )}
      <Modal {...{ isOpen, onClose }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Quests
            <Text
              fontStyle="italic"
              color="gray.400"
              textAlign="center"
              fontSize="md"
              mt={1}
            >
              These are all the quests you have taken on at some point.
            </Text>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Tabs
              backgroundColor={'rgba(0, 0, 0, 0.25);'}
              borderRadius={8}
              padding={[1, 2]}
            >
              <TabList borderBottomWidth={0} pr={4} pl={0}>
                <Tab>
                  Pending (
                  {questsByStatus[QuestCompletionStatus_Enum.Pending]?.length ||
                    0}
                  )
                </Tab>
                <Tab>
                  Accepted (
                  {questsByStatus[QuestCompletionStatus_Enum.Accepted]
                    ?.length || 0}
                  )
                </Tab>
                <Tab>
                  Rejected (
                  {questsByStatus[QuestCompletionStatus_Enum.Rejected]
                    ?.length || 0}
                  )
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <QuestTypeTabContent
                    statusType={QuestCompletionStatus_Enum.Pending}
                    quests={questsByStatus[QuestCompletionStatus_Enum.Pending]}
                  />
                </TabPanel>
                <TabPanel>
                  <QuestTypeTabContent
                    statusType={QuestCompletionStatus_Enum.Accepted}
                    quests={questsByStatus[QuestCompletionStatus_Enum.Accepted]}
                  />
                </TabPanel>
                <TabPanel>
                  <QuestTypeTabContent
                    statusType={QuestCompletionStatus_Enum.Rejected}
                    quests={questsByStatus[QuestCompletionStatus_Enum.Rejected]}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              variant="ghost"
              onClick={onClose}
              color="magenta"
              _hover={{ bg: '#FFFFFF11' }}
              _active={{ bg: '#FF000011' }}
            >
              Go Back to Dashboard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  ) : (
    <Text fontStyle="italic" textAlign="center" mb="1rem">
      No completed quests found for you.
    </Text>
  );
};

interface QuestTypeTabContentProps {
  statusType: QuestCompletionStatus_Enum;
  quests?: Array<QuestCompletionFragment>;
}
const QuestTypeTabContent: React.FC<QuestTypeTabContentProps> = ({
  statusType,
  quests,
}) => (
  <>
    {quests == null || quests.length === 0 ? (
      `You currently have no ${statusType.toLocaleLowerCase()} quests.`
    ) : (
      <UnorderedList>
        {quests.map((quest) => (
          <ListItem key={quest.id}>
            <Flex mb={2}>
              <Center>
                <Link href={`/quest/${quest.questId}`} color="white">
                  <Text fontSize="l">{quest.completed?.title}</Text>
                </Link>
              </Center>
              {quest.submissionLink && (
                <Link href={quest.submissionLink} isExternal>
                  <Button
                    ml={2}
                    variant="ghost"
                    h={8}
                    p="xs"
                    color="#D59BD5"
                    backgroundColor={'rgba(255, 255, 255, 0.04);'}
                    _hover={{ bg: '#FFFFFF11' }}
                    _active={{ bg: '#FF000011' }}
                    rightIcon={<ExternalLinkIcon boxSize={3} />}
                  >
                    <Text fontSize="xs">See proof of delivery</Text>
                  </Button>
                </Link>
              )}
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
    )}
  </>
);
