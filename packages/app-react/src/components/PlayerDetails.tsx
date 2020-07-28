import { useMutation } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import React, { useCallback, useState } from 'react';

import { useMyPlayer } from '../graphql/hooks';
import { UpdateBoxProfiles, UpdateUsername } from '../graphql/mutations';

export const PlayerDetails: React.FC<{ player: any }> = ({ player }) => {
  const myPlayer = useMyPlayer();
  const isMyPlayer = myPlayer && myPlayer.id === player.id;
  const [usernameInput, setUsernameInput] = useState<string>(player.username);
  const [updateBoxProfiles] = useMutation(UpdateBoxProfiles);
  const [updateUsername] = useMutation(UpdateUsername);

  const ethAddress = player.ethereum_address;
  const boxProfile = player.box_profile;

  const goToEditBoxProfile = useCallback(() => {
    window.open(`https://3box.io/${ethAddress}/edit`);
  }, [ethAddress]);

  const editUserName = useCallback(() => {
    // TODO Apollo does not updates caches as it expects that the mutation returns an object with id, but hasura returns { returning: [{id}] }
    updateUsername({
      variables: {
        username: usernameInput,
      },
    }).then(res => console.log('updated username', res.data));
  }, [usernameInput, updateUsername]);

  const updateAccounts = useCallback(() => {
    updateBoxProfiles().then(res =>
      console.log(
        'updated verified profiles',
        res.data.updateBoxProfile.updatedProfiles,
      ),
    );
  }, [updateBoxProfiles]);

  return (
    <Box>
      <h3>{player.username}</h3>
      <h4>{player.id}</h4>
      {isMyPlayer && (
        <button type="button" onClick={goToEditBoxProfile}>
          Edit profile
        </button>
      )}
      {isMyPlayer && (
        <div>
          <input
            value={usernameInput}
            onChange={e => setUsernameInput(e.target.value)}
          />
          <button type="button" onClick={editUserName}>
            Change username
          </button>
        </div>
      )}
      {boxProfile ? (
        <div>
          <p>
            <b>Name:</b> {boxProfile.name}
          </p>
          <p>
            <b>Description:</b> {boxProfile.description}
          </p>
          <img src={boxProfile.imageUrl} width={100} alt="profile" />
        </div>
      ) : (
        <p>Loading box profile</p>
      )}
      <div>
        <h4>External accounts</h4>
        <ul>
          {player.Accounts.map((account: any) => (
            <li key={account.type}>
              <b>{account.type}</b>: {account.identifier}
            </li>
          ))}
        </ul>
        {isMyPlayer && (
          <button type="button" onClick={updateAccounts}>
            Update accounts
          </button>
        )}
      </div>
    </Box>
  );
};
