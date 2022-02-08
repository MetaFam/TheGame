import { ModelManager } from '@glazed/devtools';
import { DIDDataStore } from '@glazed/did-datastore';
import { TileLoader } from '@glazed/tile-loader';
import {
  Button,
  Flex,
  MetaButton,
  MetaHeading,
  ModalBody,
  ModalFooter,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { extendedProfileModel, Maybe } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { ExplorerType } from 'graphql/autogen/types';
import { getExplorerTypes } from 'graphql/queries/enums/getExplorerTypes';
import { useUser, useWeb3 } from 'lib/hooks';
import React, { ReactElement, useEffect, useState } from 'react';

export type Props = {
  isEdit?: boolean;
  onClose?: () => void;
};

export const SetupPlayerType: React.FC<Props> = ({ isEdit, onClose }) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser();
  const { ceramic } = useWeb3();
  const toast = useToast();
  const [status, setStatus] = useState<Maybe<ReactElement | string>>(null);
  const [explorerType, setExplorerType] = useState<ExplorerType>();
  const [typeChoices, setTypeChoices] = useState<ExplorerType[]>([]);
  const isWizard = !isEdit;

  const load = () => {
    if (user) {
      if (explorerType === undefined && user.profile?.explorerType != null) {
        setExplorerType(user.profile.explorerType);
      }
    }
  };
  useEffect(load, [explorerType, user, user?.profile?.explorerType]);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await getExplorerTypes();
      setTypeChoices(response);
    };

    fetchTypes();
  }, [setTypeChoices]);

  const handleNextPress = async () => {
    setStatus('Saving Type Selection…');
    await save();
    onNextPress();
  };

  const save = async () => {
    if (!user) return;

    if (!ceramic) {
      toast({
        title: 'Ceramic Error',
        description: 'Ceramic is not defined. Cannot update.',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    if (user?.profile?.explorerType?.id !== explorerType?.id) {
      try {
        if (!ceramic.did?.authenticated) {
          setStatus('Authenticating DID…');
          await ceramic.did?.authenticate();
        }

        setStatus('Loading Profile Configuration…');

        const cache = new Map();
        const loader = new TileLoader({ ceramic, cache });
        const manager = new ModelManager(ceramic);
        manager.addJSONModel(extendedProfileModel);

        const store = new DIDDataStore({
          ceramic,
          loader,
          model: await manager.toPublished(),
        });

        setStatus('Saving to Ceramic…');
        await store.merge('extendedProfile', {
          explorerType: explorerType?.title,
        });
      } catch (err) {
        console.warn(err); // eslint-disable-line no-console
        toast({
          title: 'Error',
          description: `Unable to update player type. Error: ${
            (err as Error).message
          }`,
          status: 'error',
          isClosable: true,
        });
        setStatus(null);
      }
    }
  };

  const setup = (
    <FlexContainer mb={8}>
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
  return isWizard ? (
    setup
  ) : (
    <>
      <ModalBody>{setup}</ModalBody>

      {isEdit && onClose && (
        <FlexContainer>
          <ModalFooter py={6}>
            <Wrap justify="center" align="center" flex={1}>
              <WrapItem>
                <MetaButton
                  isDisabled={!!status}
                  onClick={async () => {
                    await save();
                    onClose();
                  }}
                >
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
        </FlexContainer>
      )}
    </>
  );
};
