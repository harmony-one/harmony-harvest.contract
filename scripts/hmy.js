const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");

const hmy = new Harmony(process.env.HMY_NODE_URL, {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyTestnet,
});

const options = { gasPrice: 1000000000, gasLimit: 6721900 };

module.exports = {
    hmy,
    options
}
