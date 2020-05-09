import React, { useState, useEffect, useCallback } from 'react';

import ThreeBox from '3box';

import { Box } from '@material-ui/core';

import {useMyPlayer} from "../graphql/hooks";

function getProfilePicture(boxProfile: any) {
  const imageHash = boxProfile?.image[0]?.contentUrl['/'];
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

  const ethAddress = player.Accounts.find((a: any) => a.type === "ETHEREUM").identifier;

  useEffect(() => {
    (async () => {

      const boxProfile = await ThreeBox.getProfile(ethAddress);
      setBoxProfile(boxProfile);

    })();
  }, [ethAddress]);

  const goToEdit = useCallback(() => {
    window.open(`https://3box.io/${ethAddress}/edit`)
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
    </Box>
  )
}
