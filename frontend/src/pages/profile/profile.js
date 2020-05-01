import React from 'react';

import 'bulma';
import { Chip, Badge } from '@material-ui/core';

import Bio from '../../components/bio/bio';
import Game from '../../components/game/game';
import Quick from '../../components/quick/quick';
import Activities from '../../components/activities/activities';
import Achievements from '../../components/achievements/achievements';
import NFT from '../../components/nft/nft';
import Social from '../../components/social/social';

import './profile.css';

class Profile extends React.Component {
	render() {
		return (
			<div class='tile is-ancestor'>
				<div class='tile is-1 is-vertical is-parent'>
					<Quick />
				</div>
				<div class='tile is-3 is-vertical is-parent'>
					<Bio account={this.props.account} />
					<Game />
				</div>

				<div class='tile is-7 is-vertical'>
					<div className='chips'>
						<Badge color='secondary' variant='dot'>
							<Chip label='Quests' clickable color='primary' />
						</Badge>
						<Chip label='Skill Tree' clickable color='primary' />
						<Chip label='Raids' clickable color='primary' />
					</div>

					<div className='tile'>
						{/* <div class='tile is-parent'>
							<Dao />
						</div> */}
						<div class='tile is-parent'>
							<Social />
						</div>
					</div>

					<div class='tile'>
						<div class='tile is-parent'>
							<Achievements />
						</div>
						<div class='tile is-parent'>
							<Activities />
						</div>
					</div>
				</div>
				<div class='tile is-1 is-vertical is-parent'>
					<NFT />
				</div>
			</div>
		);
	}
}

export default Profile;
