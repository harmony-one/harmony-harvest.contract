require("dotenv").config();
const {deployDemeterContract, initDemeterContract} = require("./deploy");

async function end2end() {
    const contractAddr = await deployDemeterContract();

    await initDemeterContract(contractAddr, process.env.GOV_TOKEN_ADDRESS, process.env.USD_TOKEN_ADDRESS);

    // const demeterJson = require("../build/contracts/Demeter.json");
    // let demeterUserContract = hmy.contracts.createContract(demeterJson.abi, contractAddr);
    //
    // demeterUserContract.wallet.addByPrivateKey(process.env.USER_PRIVATE_KEY);

    process.exit();
}

end2end();
