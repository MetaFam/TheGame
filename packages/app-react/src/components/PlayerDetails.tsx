import React, { useState, useEffect, useCallback } from 'react';
import {useMutation} from "@apollo/react-hooks";

import ThreeBox from '3box';

import { Box } from '@material-ui/core';

import {useMyPlayer} from "../graphql/hooks";
import {getPlayerETHAddress} from "../utils/players";
import mutations from '../graphql/mutations';

function getProfilePicture(boxProfile: any) {
  const imageHash = boxProfile && boxProfile.image && boxProfile.image[0] && boxProfile.image[0].contentUrl && boxProfile.image[0].contentUrl['/'];
  if(imageHash) {
    return `https://ipfs.infura.io/ipfs/${imageHash}`;
  } else {
    return 'https://i.imgur.com/RXJO8FD.png';
  }
}

export default function PlayerDetails({ player }: { player: any }) {
  const myPlayer = useMyPlayer();
  const isMyPlayer = myPlayer && myPlayer.id === player.id;
  const [boxProfile, setBoxProfile] = useState<any>();
  const [usernameInput, setUsernameInput] = useState<string>(player.username);
  const [updateBoxProfiles] = useMutation(mutations.UpdateBoxProfiles);
  const [updateUsername] = useMutation(mutations.UpdateUsername);

  const ethAddress = getPlayerETHAddress(player);

  useEffect(() => {
    (async () => {

      const boxProfile = await ThreeBox.getProfile(ethAddress);
      setBoxProfile(boxProfile);

    })();
  }, [ethAddress]);

  const goToEditBoxProfile = useCallback(() => {
    window.open(`https://3box.io/${ethAddress}/edit`)
  }, [ethAddress]);

  const editUserName = useCallback(() => {
    // TODO Apollo does not updates caches as it expects that the mutation returns an object with id, but hasura returns { returning: [{id}] }
    updateUsername({
      variables: {
        username: usernameInput
      }
    }).then(res =>
      console.log('updated username', res.data)
    );
  }, [usernameInput, updateUsername]);

  const updateAccounts = useCallback(() => {
    updateBoxProfiles().then(res =>
      console.log('updated verified profiles', res.data.updateBoxProfile.updatedProfiles)
    );
  }, [updateBoxProfiles]);

  return (
    <Box>
      <h3>{player.username}</h3>
      <h4>{player.id}</h4>
      {isMyPlayer && <button onClick={goToEditBoxProfile}>Edit profile</button>}
      {isMyPlayer && <div>
        <input value={usernameInput} onChange={e => setUsernameInput(e.target.value)} />
        <button onClick={editUserName}>Change username</button>
      </div>}
      {boxProfile ?
        <div>
          <p><b>Name:</b> {boxProfile.name}</p>
          <p><b>Description:</b> {boxProfile.description}</p>
          <img src={getProfilePicture(boxProfile)} width={100} alt="profile"/>
        </div>
        :
        <p>Loading box profile</p>
      }
      <div>
        <h4>External accounts</h4>
        <ul>
          {player.Accounts.map((account: any) =>
            <li key={account.type}><b>{account.type}</b>: {account.identifier}</li>
          )}
        </ul>
        {isMyPlayer && <button onClick={updateAccounts}>Update accounts</button>}
      </div>
    </Box>
  )
}
