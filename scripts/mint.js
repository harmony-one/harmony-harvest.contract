require("dotenv").config();
const { hmy } = require('./hmy');

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

module.exports = {
    setExchangePrice,
}
