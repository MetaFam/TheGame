---
title: 🤔 How to become an Ethereum Developer by Joseph
---

So you want to get started in Ethereum? I get several requests for info and resources and roadmaps every week so I decided to make this collection. I hope this helps and provides some more direction and is less overwhelming than other giant lists.

There are many different ways to learn and become a dev, this is just one that I recommend.

To build a full Ethereum app from scratch you will need understanding of 3 things:
1. Writing smart contracts for Ethereum in Solidity
2. Reading and writing to contracts from the web using Ethers.js or Web3.js
3. Creating a front-end that people can use to interact

Last updated: July 15th, 2021
Contact [@cupOJoseph](https://twitter.com/cupojoseph) to add something

## 0 -> 1 : Where to start
1. Ask for help. So far so good!
2. Spend 1 hour doing [my most basic Solidity workshop, creating a simple token from scratch video](https://www.youtube.com/watch?v=UGiA709mQSg).
3. Complete CryptoZombies tutorials which gets you through basic syntax for solidity: https://cryptozombies.io/
4. Do the free solidity course on Chainshot which will cement your understanding of smart contracts. You dont need to join their bootcamp to access it. https://www.chainshot.com/courses
5. Start writing your own simple contracts on http://remix.ethereum.org/, a simple interface. Use https://oneclickdapp.com/ to make calls and share a link to a simple front end for experiments. Deploy them on a [test network like Rinkeby where the coins are fake](https://faucet.rinkeby.io/) so there are no real transaction fees for experimenting 
6. To make your own front ends connected to your smart contract you may want to learn more javascript libraries like Redwood, although there are many others and if you are already a react dev you should just stick with what you already know. [Here's a tutorial for that from my friend Patrick](https://medium.com/coinmonks/using-redwoodjs-to-create-an-ethereum-app-8c385815b717). If you have no javasrcipt experience, go back to Chainshot or CodeAcademy.
7. Use my site https://ethhole.com/learning for a list of helpful resources.
8. Come up with something you want to make to build a little portfolio, if you need inspiration check out practice projects at https://ethhole.com/challenge
9. Figure out what knowledge you are missing to reach your goal and ask for help on http://reddit.com/r/ethdev

## 1 -> 100 : Where to go deeper

Okay, you've made some simple dapps and you understand the stack of building apps on Ethereum. Nice! Now its time to get a little deeper if you want to get a serious dev job

1. Launch an [ERC20 token using Open Zeppelin (OZ)](https://docs.openzeppelin.com/contracts/3.x/erc20), it doesnt have to do anything, but you need to understand using OZ and token standards. [Here's a 60 second tutorial I made.](https://medium.com/the-capital/how-to-launch-a-blockchain-token-on-ethereum-in-60-seconds-or-less-218f7540fcab) Experiment with some other standards, like ERC721, and 1155
2. To create any significant dapp other people need an API to index transactions happening and track stuff. Use [theGraph](https://thegraph.com/) to create a subgraph for your token
3. Join a [hackathon on Gitcoin, or do a bounty their](https://gitcoin.co/hackathon-list/) to add more serious projects to your portfolio and get more practice. 
4. Start building some integrations using SDKs from the most popular dapps. You need to understand liquidity pools which is the basis of DeFi, so do an experiment with [Uniswap SDK](https://uniswap.org/docs/v2/).
5. Use [Hardhat](https://hardhat.org) to create tests, add print statements to your smart contracts, create a more streamlined developer experience and workflow.

## You did it!

Okay now you are a full Ethereum dev because you: 
- Have mutliple complete dapps in your portfolio, even if they are simple
- Know how to write a smart contract that does just about anything, and deploy it.
- Know how to create an API and a nice front end that can read and write to your dapp

