require("dotenv").config();
const { hmy } = require('./hmy');

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

async function initDemeterContract(contractAddr, govToken, usdToken) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.MASTER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    console.log("Demeter initialize GOV_ADDR: " + govToken);
    console.log("Demeter initialize sUSD_ADDR: " + usdToken);

    let response = await demetraContract.methods
        .initialize(govToken, usdToken)
        .send(options);

    console.log("Demeter initialize status: " + response.status);

    return contractAddr;
}

module.exports = {
    deployDemeterContract,
    initDemeterContract
}
