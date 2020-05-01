import React from 'react';

import 'bulma';

import { TextField } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import './social.css';

class Token extends React.Component {
	render() {
		return (
			<div className='tile is-child container box'>
				<div className='dao'>
					<ListItem>
						<ListItemAvatar>
							<Avatar src='https://handbook.raidguild.org/img/rg-icon.png'></Avatar>
						</ListItemAvatar>
						<ListItemText
							primary='RaidGuild'
							secondary='20 Shares'
						/>
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar src='https://cdn-images-1.medium.com/max/326/1*1rMv9dd9Rk7F7U8mLlovyQ@2x.jpeg'></Avatar>
						</ListItemAvatar>
						<ListItemText
							primary='MetaCartel'
							secondary='10 Shares'
						/>
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar src='https://avatars3.githubusercontent.com/u/58242757?s=200&v=4'></Avatar>
						</ListItemAvatar>
						<ListItemText primary='MetaGame' secondary='20 Seeds' />
					</ListItem>
				</div>
				<div className='token'>
					<span className='tag'>$SAIMANO</span>
					<br></br>
					<TextField
						id='outlined-number'
						label='0.012 ETH/$SAIMANO'
						type='number'
						InputLabelProps={{
							shrink: true,
						}}
						variant='outlined'
					/>
					<br></br>
					<button className='button is-small is-rounded'>Buy</button>
					<br></br>
					<div className='social'>
						<a href='#' target='_blank'>
							<i className='fab fa-twitter fa-2x'></i>
						</a>
						<a href='#' target='_blank'>
							<i className='fab fa-facebook fa-2x'></i>
						</a>
						<a href='#' target='_blank'>
							<i className='fab fa-github fa-2x'></i>
						</a>
						<a href='#' target='_blank'>
							<i className='fab fa-linkedin fa-2x'></i>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Token;
