import {
  Button,
  ConfirmModal,
  Field,
  Flex,
  Input,
  MetaButton,
  Spinner,
  Textarea,
} from '@metafam/ds';
import {
  CreateQuestCompletionInput,
  QuestFragment,
} from 'graphql/autogen/hasura-sdk';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { URIRegexp } from '#utils/questHelpers';

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
    formState: { errors, isSubmitting: submitting },
    handleSubmit,
  } = useForm<CreateQuestCompletionInput>();
  const [exitAlert, setExitAlert] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      align="start"
      direction="column"
    >
      <Field label="Description" error={errors.submissionText}>
        <Textarea
          placeholder="What did you do?"
          {...register('submissionText', {
            required: {
              value: true,
              message: 'This is a required field.',
            },
          })}
          isInvalid={!!errors.submissionText}
          bg="dark"
        />
      </Field>
      <Field label="Link" error={errors.submissionLink}>
        <Input
          placeholder="External link"
          {...register('submissionLink', {
            pattern: {
              value: URIRegexp,
              message: 'Supply a valid URL.',
            },
          })}
          isInvalid={!!errors.submissionLink}
          bg="dark"
        />
      </Field>
      <Flex mt={25} w="full" align="center" justify="space-around">
        <MetaButton
          type="submit"
          isLoading={fetching}
          loadingText="Submitting…"
          isDisabled={success || submitting}
        >
          {submitting ? <Spinner /> : 'Submit'}
        </MetaButton>
        <Button
          variant="ghost"
          onClick={() => setExitAlert(true)}
          _hover={{ bg: 'alphaWhite.400' }}
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
    </Flex>
  );
};
