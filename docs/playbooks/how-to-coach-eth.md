---
title: 📚 How to Coach Eth
---

by @chair

<details>
<summary>🤔 Wait, WhoTF is @chair!?</summary>
<br />

Here to prop you up.

Intent on unlocking humanity's freedom, potential and love with Ethereum.

Former auto-body collision repair center assistant manager, currently RaidGuild Raider and Ethereum nomad.

POO = Proof of Onboarding
</details>
<p></p>


## Introduction

An important step in breaking the membrane of the ethereum knowledge barrier is navigating the process of transactions.

For a new user a slow or stuck transaction is scary and confusing. Navigating nonces and setting gas manually is not the most natural user experience for the uninitiated.

In this playbook we instruct the "Coach" or "Onboarder" to guide a new user through creating a slow transaction first in order to show a new user how to fix a scary situation FIRST.

### But, why?

A student usually retains what they learned FIRST about a subject, whether it is good or bad information.

This approach aims to show the user there is nothing to worry about during a slow/stuck transaction.

There's no bank to call you have to fix it yourself.

## Steps

### 1. Installing Metamask and Setup RPC's
I like doing this all in one step, the user is more likely to continue using the networks if they are configured first. Generally users are scared of configuration steps, easy as they might be.

#### Links
[Metamask](https://metamask.io/)

[Setup Xdai on Metamask](https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup)

[Setup Matic on Metamask](https://docs.matic.network/docs/develop/metamask/config-matic/)

### 2. Advanced gas controls

This steup is required to unlcok the abillity to manually set a gas fee during a transaction within metamask.

Instruct the user to:
1. Open the metamask extension
2. Click the profile circle in the top right corner
3. Click 'Settings'
4. Click 'Advanced'
5. Toggle 'Advanced gas controls' to ON

### 3. First Transaction: Simple, clean and successful

This step can take place on the network of your choosing, xdai is a good choice for speed and cheap gas.

Buy a cheap nft or transfer tokens from yourself to your student to demonstrate a smooth and successful transaction.

### 4. Second Transaction: Slow on purpose

On the Ethereum mainnet, first check etherscan for the average gas cost and purposely send a transaction with "low" gas in order to demonstrate how to efficently and effectively speed up a transaction.

Instruct the user to send 0 eth and very low gas, then have them navigate to the ethersacn transaction page.

### 5. Show the user the details on the etherscan page
Highlight the gas price used, the nonce and the estimated completion time.

### 6. Go to metamask and guide the user through speeding up the tx, advanced, setting gas manually

Now back within the metamask extension guide the user to click "Activity", select the most recent transaction.

Instruct them to click the 'Speed Up' button, and navigate to the 'Advanced' option at the top right corner.

Here the user will manually input the amount of gas they would like to use and click 'Save'.

### 7. Await Success of the transaction and review the steps with the user

This is a good point to answer lingering questions and review the entire process again.

### 8. Canceling a stuck transaction

Explain to the user why this might happen (low gas usually) and that its not uncommon.

Instruct the user to identify the nonce of the offending transaction by visiting the etherscan page.

The user should now send a transaction to their own address with a 0 amount of eth, at a higher gas price than the offending slow/stuck transaction.

As a result of the higher gas paid, the 0 value transaction will be picked up by a validator before the lower gas transaction, and thus will nullify the slower transaction.

### Conclusion

The aim of this guide is to ensure that a new user being coached through the seemingly murky process of ethereum transactions will be confident they will be able to navigate the process on their own. Or, at the least they will have a reliable guide to reference (in the corresponding playbook) to understand the process they are undertaking.
