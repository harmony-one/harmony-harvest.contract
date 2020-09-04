require("dotenv").config();
const {deployDemeterContract, initDemeterContract, addAsset, deployToken, setTokenGrantRole} = require("./deploy");

async function fullDeploy() {
    const govContractAddr = await deployToken('1HRV', '1HRV');
    const usdContractAddr = await deployToken('hUSD', 'hUSD');
    const btcContractAddr = await deployToken('hBTC', 'hBTC');
    console.log('-----')
    const contractAddr = await deployDemeterContract();
    console.log('-----')
    await setTokenGrantRole(govContractAddr, contractAddr);
    await setTokenGrantRole(usdContractAddr, contractAddr);
    await setTokenGrantRole(btcContractAddr, contractAddr);
    console.log('-----')
    await initDemeterContract(contractAddr, govContractAddr);
    console.log('-----')
    await addAsset(contractAddr, usdContractAddr, 10, 100);
    await addAsset(contractAddr, btcContractAddr, 10, 200);
    console.log('-----')
    console.log('--- DEPLOY FINISH ---')

    process.exit();
}

fullDeploy();
