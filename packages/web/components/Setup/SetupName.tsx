import { Input, InputGroup, MetaButton, MetaHeading, Text } from '@metafam/ds';
import Box from '3box';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import React from 'react';

export const SetupName: React.FC = () => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const [box, setBox] = React.useState<Box.Box>();
  const [isReady, setIsReady] = React.useState(false);
  const [name, setName] = React.useState<string | undefined>('');
  const [newName, setNewName] = React.useState<string | undefined>('');
  const [isUpdating, setIsUpdating] = React.useState(false);

  React.useEffect(() => {
    const getUsername = async () => {
      const myAddresses = await window.ethereum.enable();
      const myAddress = myAddresses[0];
      const myBox = await Box.openBox(myAddress, window.ethereum);
      const myProfile = await Box.getProfile(myAddress);
      setName(myProfile.name);
      setNewName(myProfile.name);
      setBox(myBox);

      await myBox.syncDone.then(() => setIsReady(true));
    };
    getUsername();
  }, []);

  const onHandleNextPress = async () => {
    setIsUpdating(true);

    if (newName === name) {
      onNextPress();
    }

    if (box !== undefined && newName !== '') {
      await box.public.set('name', newName);
      onNextPress();
    }
  };

  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        Your Name
      </MetaHeading>
      {isReady ? (
        <>
          <Text mb={10}>(Part of your 3Box profile.)</Text>
          <InputGroup borderColor="transparent" mb={10}>
            <Input
              background="dark"
              placeholder={name === '' || name === undefined ? 'JOHN DOE' : ''}
              type="text"
              isDisabled={isUpdating}
              value={newName === '' || newName === undefined ? '' : newName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewName(e.target.value)
              }
            />
          </InputGroup>
          <MetaButton
            onClick={onHandleNextPress}
            mt={10}
            isDisabled={name === '' || name === undefined}
            isLoading={isUpdating}
            loadingText="Saving"
          >
            {nextButtonLabel}
          </MetaButton>
        </>
      ) : (
        <Text>Loading 3Box username...</Text>
      )}
    </FlexContainer>
  );
};
