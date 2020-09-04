require("dotenv").config();
const { hmy } = require('./hmy');
const keccak256 = require('keccak256')

const ONE = '000000000000000000';

async function deployDemeterContract() {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi);

    demetraContract.wallet.addByPrivateKey(process.env.MASTER_PRIVATE_KEY);

    let deployOptions = { data: demetraJson.bytecode };
    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    let response = await demetraContract.methods
        .contractConstructor(deployOptions)
        .send(options);

    const contractAddr = response.transaction.receipt.contractAddress;
    console.log("Demeter contract deployed at " + contractAddr);

    return contractAddr;
}

async function initDemeterContract(contractAddr, govToken) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.MASTER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    console.log("Demeter initialize GOV_ADDR: " + govToken);

    let response = await demetraContract.methods
        .initialize(govToken)
        .send(options);

    console.log("Demeter initialize status: " + response.status);

    return contractAddr;
}

async function addAsset(contractAddr, assetToken, rate, price) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.MASTER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    console.log("Demeter add asset: " + assetToken);

    let response = await demetraContract.methods
        .addAsset(assetToken, rate, price, 0)
        .send(options);

    console.log("Demeter add asset status: " + response.status);

    return contractAddr;
}

async function deployToken(name, symbol) {
    const tokenJson = require("../build/contracts/BaseToken.json");
    let tokenContract = hmy.contracts.createContract(tokenJson.abi);

    tokenContract.wallet.addByPrivateKey(process.env.MASTER_PRIVATE_KEY);

    let deployOptions = {
        data: tokenJson.bytecode,
        arguments: [ name, symbol, 18, 10000000 + ONE, 10000 + ONE, true, false]
    };

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    let response = await tokenContract.methods
        .contractConstructor(deployOptions)
        .send(options);

    const contractAddr = response.transaction.receipt.contractAddress;
    console.log(`Token ${symbol} contract deployed at ` + contractAddr);

    return contractAddr;
}

async function setTokenGrantRole(tokenAddr, grantRoleAddr) {
    const tokenJson = require("../build/contracts/BaseToken.json");
    let tokenContract = hmy.contracts.createContract(tokenJson.abi, tokenAddr);

    tokenContract.wallet.addByPrivateKey(process.env.MASTER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    let response = await tokenContract.methods
        .grantRole(keccak256("MINTER"), grantRoleAddr) // keccak256("MINTER")
        .send(options);

    console.log(`Grant Role ${tokenAddr} status: ` + response.status);
}

module.exports = {
    deployDemeterContract,
    initDemeterContract,
    addAsset,
    deployToken,
    setTokenGrantRole
}
