import React from 'react';

import 'bulma';
import { TextField } from '@material-ui/core';

import './bio.css';

class Bio extends React.Component {
	render() {
		return (
			<div className='tile is-child box bio'>
				<figure className='image is-128x128'>
					<img
						className='is-rounded'
						src='https://bulma.io/images/placeholders/128x128.png'
						alt=''
					/>
				</figure>
				<TextField
					id='standard-required'
					label='Name'
					defaultValue='Saimano'
				/>
				<br></br>
				<TextField
					id='outlined-multiline-static'
					label='Bio'
					multiline
					rows={3}
					defaultValue='Am Awesome!'
					variant='outlined'
				/>
				<br></br>
				<button className='button is-rounded is-small'>Save</button>
			</div>
		);
	}
}

export default Bio;
