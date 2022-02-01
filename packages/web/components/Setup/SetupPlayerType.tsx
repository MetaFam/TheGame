import {
  Button,
  Flex,
  MetaButton,
  MetaHeading,
  ModalFooter,
  SimpleGrid,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { ExplorerType } from 'graphql/autogen/types';
import { getExplorerTypes } from 'graphql/queries/enums/getExplorerTypes';
import { useUser } from 'lib/hooks';
import { useProfileField } from 'lib/store';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSaveCeramicProfile } from 'utils/cacheHelper';

export type Props = {
  isEdit?: boolean;
  onClose?: () => void;
};

export const SetupPlayerType: React.FC<Props> = ({ isEdit, onClose }) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser();
  const [status, setStatus] = useState<Maybe<ReactElement | string>>(null);
  const { value: existingType } = useProfileField<ExplorerType>({
    field: 'explorerType',
    player: user,
    owner: true,
  });
  const [explorerType, setExplorerType] = useState<Maybe<ExplorerType>>(
    existingType,
  );
  const [typeChoices, setTypeChoices] = useState<ExplorerType[]>([]);
  const saveToCeramic = useSaveCeramicProfile({});
  const isWizard = !isEdit;

  useEffect(() => {
    const fetchTypes = async () => {
      setTypeChoices(await getExplorerTypes());
    };

    fetchTypes();
  }, [setTypeChoices]);

  const handleNextPress = async () => {
    setStatus('Saving Type Selection…');
    await save();
    onNextPress();
  };

  const save = async () => {
    await saveToCeramic({
      values: { explorerTypeTitle: explorerType?.title },
      setStatus,
    });
  };

  return (
    <FlexContainer
      as="form"
      onSubmit={async (evt) => {
        evt.preventDefault();
        await save();
        onClose?.();
      }}
    >
      {isWizard && (
        <MetaHeading mb={5} textAlign="center">
          Player Type
        </MetaHeading>
      )}
      <Text mb={10} color={isWizard ? 'current' : 'white'}>
        Please read the features of each player type below, and select the one
        that suits you best.
      </Text>
      <SimpleGrid columns={[1, null, 3, 3]} spacing={4}>
        {typeChoices.map((choice) => (
          <FlexContainer
            key={choice.id}
            p={[4, null, 6]}
            bgColor={
              explorerType?.id === choice.id
                ? 'purpleBoxDark'
                : 'purpleBoxLight'
            }
            borderRadius="0.5rem"
            _hover={{ bgColor: 'purpleBoxDark' }}
            transition="background 0.25s"
            cursor="pointer"
            onClick={() => setExplorerType(choice)}
            align="stretch"
            justify="flex-start"
            border="2px"
            borderColor={
              explorerType?.id === choice.id ? 'purple.400' : 'transparent'
            }
          >
            <Text color="white" fontWeight="bold" mb={4}>
              {choice.title}
            </Text>
            <Text color="blueLight" textAlign="justify">
              {choice.description}
            </Text>
          </FlexContainer>
        ))}
      </SimpleGrid>

      {isEdit && onClose && (
        <ModalFooter mt={6}>
          <Wrap justify="center" align="center" flex={1}>
            <WrapItem>
              <MetaButton isDisabled={!!status} type="submit">
                {!status ? (
                  'Save Changes'
                ) : (
                  <Flex align="center">
                    <Spinner mr={3} />
                    {typeof status === 'string' ? (
                      <Text>{status}</Text>
                    ) : (
                      status
                    )}
                  </Flex>
                )}
              </MetaButton>
            </WrapItem>
            <WrapItem>
              <Button
                variant="ghost"
                onClick={onClose}
                color="white"
                _hover={{ bg: '#FFFFFF11' }}
                _active={{ bg: '#FF000011' }}
                disabled={!!status}
              >
                Close
              </Button>
            </WrapItem>
          </Wrap>
        </ModalFooter>
      )}

      {isWizard && (
        <MetaButton
          onClick={handleNextPress}
          mt={10}
          isDisabled={!explorerType}
          isLoading={!!status}
          loadingText={status?.toString()}
        >
          {nextButtonLabel}
        </MetaButton>
      )}
    </FlexContainer>
  );
};
