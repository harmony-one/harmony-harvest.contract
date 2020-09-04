require("dotenv").config();
const { hmy } = require('./hmy');

const ONE = '000000000000000000';

async function setExchangePrice(contractAddr, usdToken, amount) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.USER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    let response = await demetraContract.methods
        .setExchangePrice(usdToken, amount)
        .send(options);

    console.log("sUSD set exchange price status: " + response.status);

    response = await demetraContract.methods
        .getExchangePrice(usdToken)
        .call(options);

    console.log("sUSD exchange price: " + Number(response));
}

async function lockToken(contractAddr, usdToken, amount) {
    const demetraJson = require("../build/contracts/Demeter.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi, contractAddr);

    demetraContract.wallet.addByPrivateKey(process.env.USER_PRIVATE_KEY);

    let options = { gasPrice: 1000000000, gasLimit: 6721900, value: amount + ONE };

    console.log("Lock Token address: " + usdToken + ' ' + amount);

    let response = await demetraContract.methods
        .lockToken(usdToken, amount + ONE)
        .send(options);

    console.log("Lock Token status: " + response.status);
}

module.exports = {
    setExchangePrice,
    lockToken
}
