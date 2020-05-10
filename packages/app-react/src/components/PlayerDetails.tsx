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
  const [updateBoxProfiles] = useMutation(mutations.UpdateBoxProfiles);

  const ethAddress = getPlayerETHAddress(player);

  useEffect(() => {
    (async () => {

      const boxProfile = await ThreeBox.getProfile(ethAddress);
      setBoxProfile(boxProfile);

    })();
  }, [ethAddress]);

  const goToEdit = useCallback(() => {
    window.open(`https://3box.io/${ethAddress}/edit`)
  }, []);

  const updateAccounts = useCallback(() => {
    updateBoxProfiles().then(res =>
      console.log('updated verified profiles', res.data.updateBoxProfile.updatedProfiles)
    );
  }, []);

  return (
    <Box>
      {player.id}
      {isMyPlayer && <button onClick={goToEdit}>Edit profile</button>}
      {boxProfile ?
        <div>
          <p><b>Name:</b> {boxProfile.name}</p>
          <p><b>Description:</b> {boxProfile.description}</p>
          <img src={getProfilePicture(boxProfile)} width={100} alt="profile-image"/>
        </div>
        :
        <p>Loading box profile</p>
      }
      <div>
        <h4>External accounts</h4>
        <ul>
          {player.Accounts.map((account: any) =>
            <li><b>{account.type}</b>: {account.identifier}</li>
          )}
        </ul>
        {isMyPlayer && <button onClick={updateAccounts}>Update accounts</button>}
      </div>
    </Box>
  )
}
