import {
  Button,
  Center,
  Input,
  InputGroup,
  SimpleGrid,
  Stack,
  Text,
} from '@metafam/ds';
import { Maybe, Optional } from '@metafam/utils';
import { ExplorerType } from 'graphql/autogen/types';
import { getExplorerTypes } from 'graphql/queries/enums/getExplorerTypes';
import React, { useEffect, useState } from 'react';

import { ProfileWizardPane } from './ProfileWizardPane';
import { MaybeModalProps, WizardPaneCallbackProps } from './WizardPane';

export type ExplorerTypesType = {
  selectedType: Maybe<string>;
  setSelectedType: (
    arg: string | ((type: Optional<Maybe<string>>) => Maybe<string>),
  ) => void;
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
              align="stretch"
              justify="flex-start"
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
export const SetupPlayerType: React.FC<MaybeModalProps> = ({
  onClose,
  buttonLabel,
}) => {
  const field = 'explorerTypeTitle';

  return (
    <ProfileWizardPane
      {...{ field, onClose, buttonLabel }}
      title="Player Type"
      prompt="Which one suits you best?"
    >
      {({ register, loading, current, setter }: WizardPaneCallbackProps) => (
        <Center mt={5}>
          <Input type="hidden" {...register(field, {})} />
          <ExplorerTypes
            selectedType={current}
            setSelectedType={setter}
            disabled={loading}
          />
        </Center>
      )}
    </ProfileWizardPane>
  );
};
