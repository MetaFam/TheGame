import Box from '3box';
import React from 'react';

export const Edit: React.FC = ({
  box,
  currentUser3BoxProfile,
  currentUserAddr,
}) => {
  const [newProfile, setNewProfile] = React.useState<
    Record<string, string | number>
  >({});
  const [originalProfile, setOriginalProfile] = React.useState<
    Record<string, string | number>
  >({});
  const [isSaveLoading, setIsSaveLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getGeneralAndSpaceProfile = async () => {
      const generalProfile =
        currentUser3BoxProfile || (await Box.getProfile(currentUserAddr));
      setNewProfile(generalProfile);
      setOriginalProfile(generalProfile);
    };

    getGeneralAndSpaceProfile();

    return () => {};
  }, [currentUser3BoxProfile, box, currentUserAddr]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSaveLoading(true);

    if (newProfile !== originalProfile) {
      await box.public.set('name', newProfile.name);
      await box.public.set('description', newProfile.description);
      console.log(newProfile.name);
      console.log(newProfile.description);
    }

    setIsSaveLoading(false);
  };

  return (
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
        <button type="submit">{isSaveLoading ? 'Saving...' : 'Submit'}</button>
      </form>
      <p>Your Address: {currentUserAddr}</p>
    </div>
  );
};
