import {
  Button,
  ConfirmModal,
  Flex,
  Input,
  MetaButton,
  Text,
  VStack,
} from '@metafam/ds';
import {
  CreateQuestCompletionInput,
  QuestFragment,
} from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { URIRegexp } from 'utils/questHelpers';

type Props = {
  quest: QuestFragment;
  onSubmit: (data: CreateQuestCompletionInput) => void;
  success?: boolean;
  fetching?: boolean;
};

export const CompletionForm: React.FC<Props> = ({
  quest,
  onSubmit,
  success,
  fetching,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateQuestCompletionInput>();
  const [exitAlert, setExitAlert] = useState<boolean>(false);
  const router = useRouter();

  return (
    <VStack>
      <Text>Description</Text>
      <Input
        placeholder="What did you do?"
        {...register('submissionText', {
          required: {
            value: true,
            message: 'This is a required field.',
          },
        })}
        isInvalid={!!errors.submissionText}
        background="dark"
      />

      <Text>Link</Text>
      <Input
        placeholder="External link"
        {...register('submissionLink', {
          pattern: {
            value: URIRegexp,
            message: 'Supply a valid URL.',
          },
        })}
        isInvalid={!!errors.submissionLink}
        background="dark"
      />
      <Flex align="center" justify="center" mt={10}>
        <MetaButton
          isLoading={fetching}
          loadingText="Submitting…"
          onClick={handleSubmit(onSubmit)}
          isDisabled={success}
        >
          Submit
        </MetaButton>
        <Button
          variant="ghost"
          onClick={() => setExitAlert(true)}
          isDisabled={fetching || success}
          _hover={{ bg: '#FFFFFF11' }}
        >
          Cancel
        </Button>
      </Flex>

      <ConfirmModal
        isOpen={exitAlert}
        onNope={() => setExitAlert(false)}
        onYep={() => router.push(`/quest/${quest.id}`)}
        header="Are you sure you want to leave?"
      />
    </VStack>
  );
};
