import {
  Button,
  Center,
  Input,
  InputGroup,
  SimpleGrid,
  Stack,
  Text,
} from '@metafam/ds';
import { composeDBProfileFieldExplorerType } from '@metafam/utils';
import { ExplorerType } from 'graphql/autogen/types';
import { mutationComposeDBCreateProfileDisposition } from 'graphql/composeDB/mutations/profile';
import { composeDBDocumentProfileDisposition } from 'graphql/composeDB/queries/profile';
import { getExplorerTypes } from 'graphql/queries/enums/getExplorerTypes';
import { useWeb3 } from 'lib/hooks';
import { useQuerySelfFromComposeDB } from 'lib/hooks/ceramic/useGetOwnProfileFromComposeDB';
import { usePlayerSetupSaveToComposeDB } from 'lib/hooks/ceramic/usePlayerSetupSaveToComposeDB';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useShowToastOnQueryError } from './SetupProfile';
import { MaybeModalProps, WizardPane } from './WizardPane';

const field = composeDBProfileFieldExplorerType;

export const SetupPlayerType: React.FC<MaybeModalProps> = ({
  onClose,
  buttonLabel,
  title = 'Player Type',
}) => {
  const { connected } = useWeb3();
  const {
    error,
    result: existing,
    fetching,
  } = useQuerySelfFromComposeDB<string>({
    indexName: composeDBDocumentProfileDisposition,
    field,
  });

  useShowToastOnQueryError(error);

  const formMethods = useForm<{ [field]: string | undefined }>();
  const {
    watch,
    setValue,
    formState: { dirtyFields },
    register,
  } = formMethods;

  useEffect(() => {
    setValue(field, existing);
  }, [existing, setValue]);

  const current = watch(field, existing);
  const dirty = current !== existing || !!dirtyFields[field];

  const { onSubmit, status } = usePlayerSetupSaveToComposeDB<string>({
    mutationQuery: mutationComposeDBCreateProfileDisposition,
    isChanged: dirty,
  });

  return (
    <WizardPane
      {...{ field, onClose, onSubmit, status, buttonLabel }}
      title={title}
      prompt="Which one suits you best?"
    >
      <Center mt={5}>
        <Input type="hidden" {...register(field, {})} />
        <ExplorerTypes
          selectedType={current}
          setSelectedType={(newValue) => setValue(field, newValue)}
          disabled={!connected || fetching}
        />
      </Center>
    </WizardPane>
  );
};

export type ExplorerTypesType = {
  selectedType?: string;
  setSelectedType: (arg: string) => void;
  disabled?: boolean;
};

export const ExplorerTypes: React.FC<ExplorerTypesType> = ({
  selectedType,
  setSelectedType,
  disabled = false,
}) => {
  const [choices, setChoices] = useState<Array<ExplorerType>>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      setChoices(await getExplorerTypes());
    };

    fetchTypes();
  }, [setChoices]);

  return (
    <InputGroup>
      <SimpleGrid
        maxW={{ base: '25rem', md: '60rem' }}
        columns={{ base: 1, md: 3 }}
        spacing={4}
        margin="auto"
      >
        {choices.map((choice) => {
          const selected = selectedType === choice.title;

          return (
            <Button
              height="full"
              whiteSpace="normal"
              key={choice.id}
              p={[4, null, 6]}
              bgColor={selected ? 'purpleBoxDark' : 'purpleBoxLight'}
              borderRadius="lg"
              _hover={{ filter: 'hue-rotate(-10deg)' }}
              cursor="pointer"
              onClick={() => setSelectedType(choice.title)}
              display="flex"
              alignItems="stretch"
              justifyContent="flex-start"
              border="2px"
              borderColor={selected ? 'purple.400' : 'transparent'}
              isDisabled={disabled}
            >
              <Stack>
                <Text color="white" fontWeight="bold" mb={4}>
                  {choice.title}
                </Text>
                <Text color="blueLight" textAlign="justify" fontWeight="normal">
                  {choice.description}
                </Text>
              </Stack>
            </Button>
          );
        })}
      </SimpleGrid>
    </InputGroup>
  );
};
