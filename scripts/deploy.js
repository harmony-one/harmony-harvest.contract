require("dotenv").config();

const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");

const hmy = new Harmony(process.env.HMY_NODE_URL, {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyTestnet,
});

hmy.wallet.addByPrivateKey(process.env.MASTER_PRIVATE_KEY);

async function deployDemetraContract() {
    const demetraJson = require("../out/Demetra.json");
    let demetraContract = hmy.contracts.createContract(demetraJson.abi);

    let deployOptions = { data: demetraJson.bytecode };
    let options = { gasPrice: 1000000000, gasLimit: 6721900 };

    let response = await demetraContract.methods
        .contractConstructor(deployOptions)
        .send(options);

    const contractAddr = response.transaction.receipt.contractAddress;
    console.log("Demetra contract deployed at " + contractAddr);
    return linkAddr;
}

deployDemetraContract();
