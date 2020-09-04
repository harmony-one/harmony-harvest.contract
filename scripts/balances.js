require("dotenv").config();
const { hmy } = require('./hmy');

async function getTokenBalance(tokenAddr, userAddr) {
    const tokenJson = require("../build/contracts/BaseToken.json");
    let tokenContract = hmy.contracts.createContract(tokenJson.abi, tokenAddr);

    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    let response = await tokenContract.methods
        .balanceOf(userAddr)
        .call(options);

    return response;
}

module.exports = {
    getTokenBalance
}
