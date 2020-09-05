require("dotenv").config();
const {deployDemeterContract, initDemeterContract, addAsset, deployToken, setTokenGrantRole} = require("./deploy");
const {getTokens} = require("./mint");
const keccak256 = require('keccak256')

async function fullDeploy() {
    const govContractAddr = await deployToken('1HRV', '1HRV');
    const usdContractAddr = await deployToken('hUSD', 'hUSD');
    // const btcContractAddr = await deployToken('hBTC', 'hBTC');
    console.log('-----')
    const contractAddr = await deployDemeterContract();
    console.log('-----')
    await setTokenGrantRole(govContractAddr, contractAddr, keccak256("MINTER"));
    await setTokenGrantRole(usdContractAddr, contractAddr, keccak256("MINTER"));
    // await setTokenGrantRole(btcContractAddr, contractAddr, keccak256("MINTER"));
    console.log('-----')
    await initDemeterContract(contractAddr, govContractAddr);
    console.log('-----')
    await addAsset(contractAddr, usdContractAddr, 10, 100);
    // await addAsset(contractAddr, btcContractAddr, 10, 200);
    console.log('-----')
    console.log('--- DEPLOY FINISH ---')

    // GET 200 1HRV to user address
    await getTokens(govContractAddr, process.env.USER_ADDRESS, 2000);

    process.exit();
}

fullDeploy();
