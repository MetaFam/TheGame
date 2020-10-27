import { MetaButton, MetaHeading, Text } from '@metafam/ds';
import Box from '3box';
import { FlexContainer } from 'components/Container';
import { Edit } from 'components/Setup/3BoxProfileEdit/Edit';
import { SetupContext } from 'contexts/SetupContext';
import React, { useContext, useEffect } from 'react';

export const Setup3Box: React.FC = () => {
  const { onNextPress, nextButtonLabel } = useContext(SetupContext);
  const [box, setBox] = React.useState<Box.Box>();
  const [profile, setProfile] = React.useState<Box.BoxProfile>();
  const [address, setAddress] = React.useState<string>('');
  const [isReady, setIsReady] = React.useState<boolean>(false);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {
    const myAddresses = await window.ethereum.enable();
    const myAddress = myAddresses[0];

    const myBox = await Box.openBox(myAddress, window.ethereum);
    const myProfile = await Box.getProfile(myAddress);

    setBox(myBox);
    setProfile(myProfile);
    setAddress(myAddress);

    await myBox.syncDone.then(() => setIsReady(true));
  };

  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        3Box Profile
      </MetaHeading>
      {isReady ? (
        <Edit
          // required
          box={box}
          currentUserAddr={address}
          // optional
          currentUser3BoxProfile={profile}
          // redirectFn
          // onSaveComplete={(address) => console.log('saved!', address)}
        />
      ) : (
        <Text mb={10}>Loading...</Text>
      )}

      <MetaButton onClick={onNextPress} mt={10}>
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
