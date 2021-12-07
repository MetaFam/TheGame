import {
  ConfirmModal,
  HStack,
  Input,
  MetaButton,
  Text,
  VStack,
} from '@metafam/ds';
import {
  CreateQuestCompletionInput,
  QuestFragmentFragment,
} from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { URIRegexp } from 'utils/questHelpers';

type Props = {
  quest: QuestFragmentFragment;
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
        {...register('submission_text', {
          required: {
            value: true,
            message: 'This is a required field.',
          },
        })}
        isInvalid={!!errors.submission_text}
        background="dark"
      />

      <Text>Link</Text>
      <Input
        placeholder="External link"
        {...register('submission_link', {
          pattern: {
            value: URIRegexp,
            message: 'Supply a valid URL.',
          },
        })}
        isInvalid={!!errors.submission_link}
        background="dark"
      />
      <HStack>
        <MetaButton
          mt={10}
          isLoading={fetching}
          loadingText="Submitting…"
          onClick={handleSubmit(onSubmit)}
          isDisabled={success}
        >
          Submit
        </MetaButton>
        <MetaButton
          variant="outline"
          onClick={() => setExitAlert(true)}
          isDisabled={fetching || success}
        >
          Cancel
        </MetaButton>
      </HStack>

      <ConfirmModal
        isOpen={exitAlert}
        onNope={() => setExitAlert(false)}
        onYep={() => router.push(`/quest/${quest.id}`)}
        header="Are you sure you want to leave?"
      />
    </VStack>
  );
};
