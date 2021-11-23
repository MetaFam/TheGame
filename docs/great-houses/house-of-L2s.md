---
title: 🔀 House of Layer 2s and Sidechains
image: https://i.imgur.com/NAE3DkB.png
---

by [@Shegen](https://twitter.com/shegenerates)

<details>
<summary>🤔 Wait, WhoTF is @Shegen!?</summary>
<br />
Shegenerates, a prof solidity developer, crypto native, and DAO Queen.
<br />
<br />

Missing something or do you have something to add? [DM me](https://twitter.com/shegenerates).
</details>

# Shegen's Layer 2 Primer

![A generic network graphic](https://i.imgur.com/NAE3DkB.png)


## What's a Layer 2 Chain?
Ethereum is the primary layer (layer 1) of the Ethereum Ecosystem. It has extremely strong security and finality (The order that things happen on it is final). Those are great features for networks which move lots of value. But with such great features, the demand for including your transactions on limited bandwidth of Ethereum can be high, leading to expensive transaction fees.

Enter the Layer 2 Chain (L2): **a network that is run seperately from Ethereum, but is able to inherit its security, while processing transactions faster and cheaper than mainnet.** 

L2s are our current approach to scaling Ethereum, allowing us to make cheaper transactions. There are usually trade-offs when making crypto transactions cheaper, such as decentralization or security. 

### Side chain vs Layer 2
One additional other note, recently the term L2 has been used interchangeably for networks built on top of Ethereum as an extra layer (L2), and chains that have their own security which just connect to mainnet via bridges. 

With this technical definition, Polygon and xDAI are considered "sidechains", while Arbitrum and other similar chains that use "rollups" to publish transaction data to mainnet Ethereum are considered true L2s.

True L2s are able to be cheaper and faster than mainnet, and still secure, because they use **[Rollups](https://ethereum.org/en/developers/docs/scaling/#rollups) to seperate execution and data posting**. Rollups are special math that allows for doing all the calculations and computation for a transaction in one cheap place, and then posts the data with the result to mainnet Ethereum.

## What is a Layer 2 not?
It's not just a better/cheaper Ethereum. No L2 has the same level of security and decentralization of mainnet Ethereum. Cheaper fees are nice, but its also good to remember that your email is full of spam because it's free to send you email.

## Rollops and Side Chains and VMs, oh my!

## The Landscape:
Currently, there are dozens of L2/sidechain networks. They have varying levels of decentralization, reliance on mainnet security, onramp/offramp limits, and features. 

You can add all of these networks to your metamask by visiting https://chainlist.org/. Any L2 that works with Ethereum and uses the Ethereum Virtual Machine (EVM) should be compatible with what ever wallet you are using, for example MetaMask. 

When choosing to transact on a L2, it can be helpful to know what the options are. So here's a breakdown of some.

### xDAI
>xDAI is the DAO chain.
-- Dekan Brown

Official Docs: https://www.xdaichain.com/

The xDAI side chain converts mainnet DAI tokens into xDAI to be its native coin. The way ETH works on mainnet, xDAI works on the xDAI network. The obvous benefit of this, is that it's incredibly stable since 1 DAI token is pegged to $1 in value. This makes it a great chain to host DAOs on, because the DAO doesnt have to worry about price fluctations. 

xDAI is slightly MetaFam adjacent, because the Cartel is a member of the [governance board](https://www.xdaichain.com/for-users/governance). xDAI has [19 validator pools](https://blockscout.com/xdai/mainnet/validators) of trusted communities, and a token called [$STAKE](https://www.coingecko.com/en/coins/xdai-stake).. well... staked by validators. However, you don't need any of this token to use the Network.

xDAI inherits security from mainnet, because the coin being used is backed by mainnet DAI. But its security is considered a bit less than some other options. 

### Polygon
Official Docs: https://polygon.technology/

Polygon is a side chain with its own network, great scalability, and energy efficient Proof of Stake consensus. The native asset of the Polygon chain is the [$Matic](https://www.coingecko.com/en/coins/polygon) token, which also exists on mainnet Ethereum. A lot of great scaling research is happening on Polygon. Polygon has [63 active validator](https://polygonscan.com/stat/miner/3?range=7&blocktype=blocks) pools at the moment, with plans to scale into a more decentralized network as it grows.

### Arbitrum
Official Docs: https://arbitrum.io/

Arbitrum is a L2 that usues Optimistic rollups to post batches of cheap transactions to mainnet Ethereum. It has no native token, and just uses ETH for transaction fees. 

Transactions are submitted through and aggregator to the Arbitrum chain, although this is not required. There is no limit on how many aggregators can exist, nor on who can be an aggregator. To improve efficiency, aggregators will usually package together multiple client transactions into a single message to be submitted to the Arbitrum chain.


### Optimism 
Official Docs: https://www.optimism.io/

Arbitrum is a L2 that usues "[optimistic rollups](https://research.paradigm.xyz/rollups)" to post the result of cheap faster transactions to mainnet Ethereum. It has no native token, and just uses ETH for transaction fees. Optimism has a week wait time for removing funds from the network.

![A screenshot of the bridge, showing the 7 day wait to claim funds removed from the network.](https://i.imgur.com/x72t2NU.png)


### Ronin
Official Docs: https://skymavis.com/#product
Explorer:

Ronin is a cheap fast sidechain that hosts Axie Infinity, and all the assets for that game. While Ronin works well, it is not public for any other developers to built anything they want on it, different from our other examples. A $RON token will be released soon, but is not yet live at the time of writing this.


### More? Yes. Many. 
- [Fantom](https://www.fantom.foundation/)
- [Loopring](https://loopring.org/#/) 
- [StarkNet](https://starkware.co/starknet/)
- Possibly [avalanche](https://avax.network/) kind of depending on your strict definition
- Lots of others!

Unfortunately, I dont have enough hours in the day to deeply research every possible network. There are lots popping up to help Ethereum Scale. There are lots of ways to scale, and its happening now, with varying levels of openness. 

## Today
The many L2s, connected by mainnet and the overlap of the wonderful communities which use them. The moats for most of these chains is not very deep, and the preference for most people is based on transaction fees and pumping their own bags. Some of these chains have no native tokens (prime for airdrop rewards to early users perhaps!?). 

## Tomorrow
>Today's L2s, tomorrow's Shards. 
>-- Shegenerates

It's possible that some of the networks discussed here could eventually become Shards of mainnet. That would be exciting! Ethereum scales, and it will continue to scale.


