import { HStack, Input, MetaButton, Text, VStack } from '@metafam/ds';
import {
  CreateQuestCompletionInput,
  QuestFragmentFragment,
} from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { UriRegexp } from '../../utils/questHelpers';
import { ConfirmModal } from '../ConfirmModal';

const validations = {
  submission_text: {
    required: true,
  },
  submission_link: {
    pattern: UriRegexp,
  },
};

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
  const { register, errors, handleSubmit } = useForm<
    CreateQuestCompletionInput
  >();
  const [exitAlert, setExitAlert] = useState<boolean>(false);
  const router = useRouter();

  return (
    <VStack>
      <Text>Description</Text>
      <Input
        background="dark"
        placeholder="What did you do ?"
        isRequired
        name="submission_text"
        ref={register(validations.submission_text)}
        isInvalid={!!errors.submission_text}
      />

      <Text>Link</Text>
      <Input
        background="dark"
        placeholder="External link"
        name="submission_link"
        ref={register(validations.submission_link)}
        isInvalid={!!errors.submission_link}
      />
      <HStack>
        <MetaButton
          variant="outline"
          onClick={() => setExitAlert(true)}
          isDisabled={fetching || success}
        >
          Cancel
        </MetaButton>
        <MetaButton
          mt={10}
          isLoading={fetching}
          loadingText="Submitting..."
          onClick={handleSubmit(onSubmit)}
          isDisabled={success}
        >
          Submit
        </MetaButton>
      </HStack>

      <ConfirmModal
        isOpen={exitAlert}
        onNope={() => setExitAlert(false)}
        onYep={() => router.push(`/quest/${quest.id}`)}
        header="Are you sure you want to leave ?"
      />
    </VStack>
  );
};
