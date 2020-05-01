import React from 'react';

import 'bulma';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';

import './game.css';

class Game extends React.Component {
	render() {
		return (
			<div className='tile is-child box game'>
				<div className='role-stat'>
					<div className='role'>
						<figure className='image is-128x128'>
							<img
								src='https://github.com/gemwise-invests/Meta-Skill/raw/master/asset/img/mage.png'
								alt=''
							/>
						</figure>

						<Badge badgeContent={4} color='primary'>
							<span className='tag is-primary is-light medium'>
								Developer
							</span>
						</Badge>
					</div>
					<div className='player-stat'>
						<ListItem>
							<ListItemText
								primary='Experience'
								secondary='2012 XP'
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary='Reputation'
								secondary='Diamond'
							/>
						</ListItem>
					</div>
				</div>
				<div className='skills'>
					<span className='tag is-success'>
						ReactJs
						<button className='delete is-small'></button>
					</span>
					<span className='tag is-success'>
						NodeJs
						<button className='delete is-small'></button>
					</span>
					<span className='tag is-success'>
						Web3
						<button className='delete is-small'></button>
					</span>
					<span className='tag is-success'>
						ExpressJs
						<button className='delete is-small'></button>
					</span>
					<span className='tag is-danger'>
						Solidity
						<button className='delete is-small'></button>
					</span>
				</div>
				<div className='buttons'>
					<button className='button is-small is-rounded'>
						Trust
					</button>
					<button className='button is-small is-rounded'>
						Message
					</button>
					<button className='button is-small is-rounded'>
						Contract
					</button>
				</div>
			</div>
		);
	}
}

export default Game;
