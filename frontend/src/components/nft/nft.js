import React from 'react';

import 'bulma';

import Tooltip from '@material-ui/core/Tooltip';

import './nft.css';

const dummy = [
  {
    url: 'https://gitcoin.co/dynamic/kudos/60/collaboration_machine',
    title: 'Collaboration Machine',
  },
  {
    url: 'https://gitcoin.co/dynamic/kudos/10864/sustain_web3_winner',
    title: 'Sustain Web3 Winner',
  },
  {
    url: 'https://gitcoin.co/dynamic/kudos/17049/stop_covid_winner',
    title: 'Stop Covid Winner',
  },
  {
    url: 'https://gitcoin.co/dynamic/kudos/17033/cosmos',
    title: 'Cosmos',
  },
];

class NFT extends React.Component {
  render() {
    return (
      <div className="tile is-child box nft">
        {dummy.map((item, index) => (
          <Tooltip title={item.title} placement="left" key={index}>
            <figure className="image is-32x32">
              <img className="is-rounded" src={item.url} alt="" />
            </figure>
          </Tooltip>
        ))}
      </div>
    );
  }
}

export default NFT;
