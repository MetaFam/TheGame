import { Text } from '@metafam/ds';
import Box from '3box';
import React from 'react';

export const Edit: React.FC = () => {
  const [box, setBox] = React.useState<Box.Box>();
  const [address, setAddress] = React.useState<string>('');
  const [isReady, setIsReady] = React.useState<boolean>(false);

  const [newProfile, setNewProfile] = React.useState<Box.BoxProfile>({});
  const [originalProfile, setOriginalProfile] = React.useState<Box.BoxProfile>(
    {},
  );
  const [isSaveLoading, setIsSaveLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getGeneralAndSpaceProfile = async () => {
      const myAddresses = await window.ethereum.enable();
      const myAddress = myAddresses[0];
      const myBox = await Box.openBox(myAddress, window.ethereum);
      const generalProfile = await Box.getProfile(myAddress);
      setNewProfile(generalProfile);
      setOriginalProfile(generalProfile);
      setBox(myBox);
      setAddress(myAddress);

      await myBox.syncDone.then(() => setIsReady(true));
    };

    getGeneralAndSpaceProfile();

    return () => {};
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSaveLoading(true);

    if (newProfile !== originalProfile && box !== undefined) {
      await box.public.set('name', newProfile.name);
      await box.public.set('description', newProfile.description);
    }

    setIsSaveLoading(false);
  };

  return (
    <>
      {isReady ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              <p>Name</p>
              <input
                style={{ color: 'black' }}
                id="name"
                type="text"
                value={newProfile.name}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, name: e.target.value })
                }
              />
            </label>
            <label htmlFor="description">
              <p>Description</p>
              <textarea
                style={{ color: 'black' }}
                id="description"
                value={newProfile.description}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, description: e.target.value })
                }
              />
            </label>
            <button type="submit">
              {isSaveLoading ? 'Saving...' : 'Submit'}
            </button>
          </form>
          <p>Your Address: {address}</p>
        </div>
      ) : (
        <Text mb={10}>Loading...</Text>
      )}
    </>
  );
};
