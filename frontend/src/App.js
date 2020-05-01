import React from 'react';

import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';

import 'bulma';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';

import Profile from './pages/profile/profile';

const THEME = createMuiTheme({
	typography: {
		fontFamily: "'Manrope', sans-serif;",
	},
});

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			infuraId: process.env.REACT_APP_INFURA_ID,
		},
	},
	fortmatic: {
		package: Fortmatic,
		options: {
			key: process.env.REACT_APP_FORTMATIC_ID,
		},
	},
};

const web3Modal = new Web3Modal({
	network: 'ropsten',
	cacheProvider: false,
	providerOptions,
});

class App extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	loginHandler = async () => {
		web3Modal.clearCachedProvider();
		const provider = await web3Modal.connect();
		const web3 = new Web3(provider);
		const accounts = await web3.eth.getAccounts();

		this.setState({ provider, web3, account: accounts[0] });
	};

	render() {
		return (
			<ThemeProvider theme={THEME}>
				<div className='main'>
					{this.state.account ? (
						<Profile account={this.state.account} />
					) : (
						<button
							className='button is-primary is-medium is-rounded connect'
							onClick={this.loginHandler}
						>
							Connect
						</button>
					)}
				</div>
			</ThemeProvider>
		);
	}
}

export default App;
