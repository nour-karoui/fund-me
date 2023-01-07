HELLO <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px"> This is RVL Faucet & RVL Crowdfunding
---
## 💰 What is RVL?

It is an **ERC20 Token** hosted on **Goerli Testnet**.  
IRVL address is: **0x858bdC45260c796C22f6E43765e79B6DDbfF5a2D**

## ✂️ How is this project divided?
The project is divided into 3 main sections:
1. ***Truffle-Crowdfunding:*** The truffle project, containing all the smart contracts used for this project and their deployments configurations.
[Truffle-Crowdfunding](http://rvl-crowdfund-me.s3-website-us-east-1.amazonaws.com/)
2. ***Crowdfund:*** The Dapp that allows users to interact with our smart contracts, create and fund projects.
3. ***RVL-Faucet:*** The faucet that allows users to receive some RVL.
[RVL-Faucet](http://rvl-faucet.s3-website-us-east-1.amazonaws.com/)

## 🙌 What is RVL Crowdfunding?
It is a **decentralized crowdfunding app** hosted on **Goerli Testnet** built with ***Truffle Framework***, ***ReactJs*** and ***ethers.js*** library.
1. Any user can create a funding project and specify a budget.
2. Any user can fund the project with **RVL Token** as long as the budget is not reached yet.
3. Any user can request refunds as long as the budget is not reached.
4. A project admin (creator) can update the project budget.
5. An event listener is listening to when the project budget is reached.

## 🎰 What is RVL Faucet?
In order to be able to fund projects, a user needs to **pocess some RVL**, that's why we created a ***faucet*** with ***ReactJs*** and ***ethers.js*** library, deployed on **Goerli Testnet** to fund any user with some RVL.

## 🎯 Running and Testing the project
> **In order to just run the DApp, you can skip this section since the smart contracts are already deployed. This section is for those who want to run, modify and test the smart contracts whether locally or in a testnet**  

After cloning this repo, we will start with running and testing the blockchain part.
### 📒 The blockchain part

---  	

#### In order to test the app locally, you need ***Ganache-cli***.  
> To deploy and test smart contracts locally, open a terminal and run this command.  
```shell
    ganache-cli
```

> Deploying the contract on a Testnet takes more time than deploying it locally so be patient.  

Make sure to create .env file following the **.env.example** file

Run this command to install dependencies:
```shell
    cd truffle-crowdfunding
    npm install truffle
```

**These are the main commands that would help you interact with our smart contracts:**  
1. Compiling the contracts (this will generate a JSON file for each contract found in build/contracts)
```shell
    truffle compile
```
2. Deploying the contracts
```shell
    truffle migrate --network <NETWORK_NAME>
    truffle run verify <CONTRACT_NAME>
```
3. Interacting with the contracts
```shell
    truffle console --network <network-name>
```
4. Running unit tests
```shell
    truffle test --network <network-name>
```

### 🚀 Running The Crowdfunding & Faucet DApp

---  	

> **The run the Faucet and Crowdfund you need both a Metamask wallet attached to your Browser, also you need some Goerli Ether**  

> You can get some Goerli ETH on [This Faucet](https://goerlifaucet.com/).

<img width="358" alt="image" src="https://user-images.githubusercontent.com/47257753/211004734-9d0b3b93-606f-4270-9791-22ec10397e1b.png">

#### Running the DApps
To get some RVL Tokens.
```shell
    cd rvl-faucet
    PORT=3001 npm start
```
To interact with the crowdfunding app
```shell
    cd crowdfund
    npm start
```
## 🔨 Areas of Improvements
* Frontend improvements: automatic updates of UI Components whithout the need to refresh the page.
* Make the smart contracts upgradable.
* Implement the possibility to add and update project settings (description, ...).
* Automate smart contract deployment and integration with the front (ABI, address).
* Create unit the RVL Faucet.
* Provide multiple ERC20 token options to fund projects.
* Add more events to be emitted from solidity (CreateNewProject Event, FundProject Event, UpdateProjectBudget Event, ...).

