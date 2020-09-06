require("dotenv").config();
const { hmy } = require('./hmy');

const ONE = '000000000000000000';

async function getExchangePrice(contractAddr, usdToken) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.MASTER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    return await demetraContract.methods
        .getExchangePrice(usdToken)
        .call(options);
}

async function setExchangePrice(contractAddr, usdToken, amount) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.MASTER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    let response = await demetraContract.methods
        .setExchangePrice(usdToken, amount)
        .send(options);

    console.log("sUSD set exchange price status: " + response.status);
}

async function lockTokenByOne(contractAddr, usdToken, amount) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.USER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900, value: amount + ONE };

    console.log(`Lock Token ${usdToken} by ONE: ` + ' ' + amount);

    let response = await demetraContract.methods
        .lockToken(usdToken, amount + ONE)
        .send(options);

    console.log(`Lock Token ${usdToken} by ONE: status ` + response.status);
}

async function lockTokenByGOV(contractAddr, usdToken, amount) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.USER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    console.log(`Lock Token ${usdToken} by GOV: ` + ' ' + amount);

    let response = await demetraContract.methods
        .lockToken(usdToken, amount + ONE)
        .send(options);

    console.log(`Lock Token ${usdToken} by GOV status: ` + ' ' + response.status);
}

async function unlockToken(contractAddr, usdToken, govToken, amount) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.USER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    console.log("unlockToken " + usdToken + ': ' + amount);

    let response = await demetraContract.methods
        .unlockToken(usdToken, govToken, amount + ONE)
        .send(options);

    console.log("unlockToken status: " + response.status);
}

async function getTokens(contractAddr, userAddress, amount) {
    const demetraJson = require("../build/contracts/BaseToken.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.MASTER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    console.log("Transfer Token to address: " + userAddress + ' ' + amount);

    let response = await demetraContract.methods
        .transfer(userAddress, amount + ONE)
        .send(options);

    console.log("Transfer Token status: " + response.status);
}

async function approveToken(tokenContractAddr, demeterAddr, amount) {
    const demetraJson = require("../build/contracts/BaseToken.json");
    let tokenContract = hmy.contracts.createContract(demetraJson.abi, tokenContractAddr);

    tokenContract.wallet.addByPrivateKey(process.env.USER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    console.log("Approve Token to address: " + demeterAddr + ' ' + amount);

    let response = await tokenContract.methods
        .approve(demeterAddr, amount + ONE)
        .send(options);

    console.log("Approve Token status: " + response.status);
}

async function getSynth(contractAddr, tokenAddress) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    return await demetraContract.methods
        .getSynth(tokenAddress)
        .call(options);
}

async function getGovernanceAddress(contractAddr) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    return await demetraContract.methods
        .getGovernanceAddress()
        .call(options);
}


module.exports = {
    setExchangePrice,
    getExchangePrice,
    lockTokenByGOV,
    lockTokenByOne,
    getTokens,
    getSynth,
    unlockToken,
    getGovernanceAddress,
    approveToken
}
