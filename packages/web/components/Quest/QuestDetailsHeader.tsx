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
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@metafam/ds';
import {
  Quest,
  QuestFragment,
  QuestStatus_Enum,
  useUpdateQuestMutation,
} from 'graphql/autogen/hasura-sdk';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

import { MetaLink } from '#components/Link';
import { PlayerAvatar } from '#components/Player/PlayerAvatar';
import { useUser } from '#lib/hooks';
import { usePlayerName } from '#lib/hooks/player/usePlayerName';
import { usePlayerURL } from '#lib/hooks/player/usePlayerURL';

import { RepetitionTag, StatusTag } from './QuestTags';

type Props = {
  quest: QuestFragment;
};

export const QuestDetailsHeader: React.FC<Props> = ({ quest }) => {
  const playerName = usePlayerName(quest.player);
  const playerProfileLinkURL = usePlayerURL(quest.player);
  const { user } = useUser();
  const isMyQuest = user?.id === (quest as Quest).player.id;
  const {
    repetition,
    cooldown,
    title,
    status,
    quest_skills: questSkills,
    quest_roles: questRoles,
  } = quest;

  // Archive quest modal
  const cancelRef = useRef<HTMLButtonElement>(null);
  const archiveButtonRef = useRef<HTMLButtonElement>(null); // focus returns here when modal is closed
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const [, updateQuest] = useUpdateQuestMutation(); // Don't need to use updateQuestResult that's returned from useUpdateQuestMutation e.g const [updateQuestResult, updateQuest] = ...

  // Original skills and roles are needed (required field) for the updateQuest mutation
  // because the updateQuest mutation deletes existing skills/roles and then adds in those
  // that were submitted via the form (either the existing skills/roles or changes to them)
  // If we keep the original skills/roles in, the quest can still be unarchived if needed

  // Roles objects
  const rolesObjects = questRoles.map((r) => ({
    questId: quest.id,
    role: r.PlayerRole.role,
  }));

  // Skills objects
  const skillsObjects = questSkills.map((s) => ({
    questId: quest.id,
    skillId: s.skill.id,
  }));

  const setQuestAsArchived = () => {
    // 1. Archive it
    // Based on edit.tsx

    const updateQuestInput = {
      status: QuestStatus_Enum.Archived,
    };

    updateQuest({
      id: quest.id,
      input: updateQuestInput,
      skills: skillsObjects,
      roles: rolesObjects,
    }).then((res) => {
      if (res.data?.update_quest_by_pk && !res.error) {
        router.push('/quests');
        toast({
          title: 'Quest archived',
          description: `The quest was successfully archived`,
          status: 'success',
          isClosable: true,
          duration: 4000,
        });
      } else {
        toast({
          title: 'Error while archiving quest',
          description: res.error?.message || 'unknown error',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      }
    });

    // 2. Close the modal after the action
    onClose();
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

      {/* Edit and Archive buttons are displayed to the Quest Owner */}
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
              ref={archiveButtonRef}
            >
              Archive quest
            </Button>

            {/* The modal for archiving a Quest */}
            <AlertDialog
              isCentered
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              finalFocusRef={archiveButtonRef}
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
                    You sure ’bout that?
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    <Text as="p" mb={3}>
                      You’re about to archive the{' '}
                      <Text as="strong">{title}</Text> quest.
                    </Text>
                    <Text as="p" mb={3}>
                      It will no longer appear in the Quests Explorer, but the
                      records of completions will remain and you will still be
                      able to see the quest through a direct link.
                    </Text>
                    <Text as="p" mb={3}>
                      Is that what you want?
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
                      Nah
                    </Button>
                    <Button
                      variant="warning"
                      fontSize="1em"
                      fontWeight="400"
                      size="lg"
                      width={{ base: '100%', sm: 'auto' }}
                      borderWidth={2}
                      onClick={setQuestAsArchived}
                    >
                      Yes, please
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
