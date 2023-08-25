import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { Quest, QuestFragment, QuestStatus_Enum } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import { usePlayerName } from 'lib/hooks/player/usePlayerName';
import { usePlayerURL } from 'lib/hooks/player/usePlayerURL';
import React, { useRef } from 'react';

import { RepetitionTag, StatusTag } from './QuestTags';

type Props = {
  quest: QuestFragment;
};

export const QuestDetailsHeader: React.FC<Props> = ({ quest }) => {
  const playerName = usePlayerName(quest.player);
  const playerProfileLinkURL = usePlayerURL(quest.player);
  const { user } = useUser();
  const isMyQuest = user?.id === (quest as Quest).player.id;
  const { repetition, cooldown, title, status } = quest;

  // Delete quest modal
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null); // focus returns here when modal is closed
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const setDeleted = () => {
    // Delete
    // Can I just use the updateQuestResult from edit.tsx, and just update the status?
    // e.g.
    // updateQuestInput = { status: DELETED }
    // then
    // updateQuest({id: quest.id, input: updateQuestInput})
    // console.log("DELETE "+quest.id);

    // Based on edit.tsx
    // const updateQuestInput = {
    //  status: QuestStatus_Enum.Open, // would be status: QuestStatus_Enum.Deleted once that's set up
    // };
    /**
    updateQuest({
      id: quest.id,
      input: updateQuestInput,
      skills: [], // Placeholder b/c not updating
      roles: [], // Placeholder b/c no updating
    }).then((res) => {
      if (res.data?.update_quest_by_pk && !res.error) {
        router.push("/quests");
        toast({
          title: 'Quest deleted',
          description: `The quest was deleted successfully`,
          status: 'success',
          isClosable: true,
          duration: 4000,        
        });
      } else {
        toast({
          title: 'Error while deleting quest',
          description: res.error?.message || 'unknown error',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      }


    });
    */

    // Close the modal
    onClose();

    // Show the toast
    // Pretend success
    // Or put the router push here
    // router.push("/quests");
    toast({
      title: 'Quest deleted',
      description: `The quest was deleted successfully`,
      status: 'success',
      isClosable: true,
      duration: 4000,
      // onCloseComplete: () => { history.push("/somewhere")}, // Redirect somwhere, could also use router.push if importing next/router
    });
  };
  return (
    <Flex
      as="header"
      alignItems="center"
      flexDirection={{
        base: 'column',
        md: 'row',
      }}
      gap={6}
      mb={[8, 8, 12]}
    >
      <Box w="full" flexBasis="100%">
        <Heading
          as="h1"
          fontFamily="body"
          fontWeight="600"
          fontSize={{ base: '5xl', md: '8xl' }}
          mb={5}
        >
          {title}
        </Heading>

        <Flex
          gap={2}
          fontSize="2xl"
          lineHeight="1.1"
          alignItems="flex-start"
          mb={5}
        >
          <Text as="div" fontWeight="400" whiteSpace="nowrap">
            Created by
          </Text>

          <Flex alignItems="flex-start" gap={2}>
            <PlayerAvatar player={quest.player} size="sm" />

            <Text
              wordBreak="break-all" /* in case of really long usernames or an ETH address as username */
            >
              <MetaLink href={playerProfileLinkURL}>{playerName}</MetaLink>
            </Text>
          </Flex>
        </Flex>

        <Flex gap={2}>
          <StatusTag status={status} />
          <RepetitionTag {...{ repetition, cooldown }} />
        </Flex>
      </Box>

      {/* Edit and delete buttons are displayed to the Quest Owner */}
      {isMyQuest && status === QuestStatus_Enum.Open && (
        <Box w="full" maxW={{ base: '100%', md: '12rem' }}>
          {/* Stacked vertically after md breakpoint */}
          <Stack spacing={5} direction={{ base: 'row', md: 'column' }}>
            <Button
              as="a" // so it can be used as a link
              href={`/quest/${quest.id}/edit`}
              variant="outline"
              borderWidth={2}
              size="lg"
              fontSize="md"
              w="full"
            >
              Edit quest
            </Button>

            <Button
              variant="warning"
              size="lg"
              fontSize="md"
              w="full"
              onClick={onOpen}
              ref={deleteButtonRef}
            >
              Delete quest
            </Button>

            {/* The modal for deleting a Quest */}
            <AlertDialog
              isCentered
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              finalFocusRef={deleteButtonRef}
            >
              <AlertDialogOverlay bg="blueProfileSection">
                <AlertDialogContent
                  borderRadius={4}
                  maxWidth="3xl"
                  bg="whiteAlpha.100"
                >
                  <AlertDialogHeader
                    fontSize={{
                      base: '3xl',
                      md: '5xl',
                    }}
                    px={10} // Leaves space for the Close button on small screens
                    fontWeight="400"
                    lineHeight="1.2"
                    maxWidth="md"
                    mb={3}
                    mx="auto"
                  >
                    Really delete quest?
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    <Text as="p" mb={3}>
                      Heads up! You’re about to delete the{' '}
                      <Text as="strong">{title}</Text> quest.
                    </Text>
                    <Text as="p" mb={1}>
                      Deleting the quest will:
                    </Text>
                    <UnorderedList mb={3}>
                      <ListItem>
                        Remove the quest for all current and past players, along
                        with any related achievements or NFTs
                      </ListItem>
                      <ListItem>Delete the quest permanently</ListItem>
                    </UnorderedList>
                    <Text as="p" mb={3}>
                      This cannot be undone.
                    </Text>
                    <Text as="p" mb={3}>
                      Are you sure you want to delete the quest?
                    </Text>
                  </AlertDialogBody>

                  <AlertDialogFooter
                    mt={3}
                    justifyContent="center"
                    gap={4}
                    flexDirection={{
                      base: 'column-reverse',
                      sm: 'row',
                    }}
                  >
                    <Button
                      variant="outline"
                      fontSize="1em"
                      fontWeight="400"
                      size="lg"
                      width={{ base: '100%', sm: 'auto' }}
                      borderWidth={2}
                      ref={cancelRef}
                      onClick={onClose}
                    >
                      No, I want to keep it
                    </Button>
                    <Button
                      variant="warning"
                      fontSize="1em"
                      fontWeight="400"
                      size="lg"
                      width={{ base: '100%', sm: 'auto' }}
                      borderWidth={2}
                      onClick={setDeleted}
                    >
                      Yes, delete quest
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Stack>
        </Box>
      )}
    </Flex>
  );
};
