const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");

const hmy = new Harmony(process.env.HMY_NODE_URL, {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyTestnet,
});

module.exports = {
    hmy,
}
