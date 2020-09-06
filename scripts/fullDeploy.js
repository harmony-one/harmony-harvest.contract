require("dotenv").config();
const {deployDemeterContract, initDemeterContract, addAsset, deployToken, setTokenGrantRole} = require("./deploy");
const {getTokens} = require("./mint");
const keccak256 = require('keccak256')

async function fullDeploy() {
    // const govContractAddr = await deployToken('1HRV', '1HRV');
    // const usdContractAddr = await deployToken('hUSD', 'hUSD');
    // const btcContractAddr = await deployToken('hBTC', 'hBTC');

    const govContractAddr="0x1a37c00371297d9507a5bcffe7f2e9c3155658ed"
    const usdContractAddr="0x00e0004d9b5dfb5acad0c2a3124ca3b7d2062c38"
    const btcContractAddr="0x57a7f30e9fc2f0152d06cc8e6c20db0f0cfe097d"

    console.log('-----')
    const contractAddr = await deployDemeterContract();
    console.log('-----')
    await setTokenGrantRole(govContractAddr, contractAddr, keccak256("MINTER"));
    await setTokenGrantRole(usdContractAddr, contractAddr, keccak256("MINTER"));
    await setTokenGrantRole(btcContractAddr, contractAddr, keccak256("MINTER"));
    console.log('-----')
    await initDemeterContract(contractAddr, govContractAddr);
    console.log('-----')
    await addAsset(contractAddr, usdContractAddr, 10, 1.1);
    await addAsset(contractAddr, btcContractAddr, 10, 10500);
    console.log('-----')
    console.log('--- DEPLOY FINISH ---')

    // GET 500 1HRV to user address
    await getTokens(govContractAddr, contractAddr, 1000);

    process.exit();
}

fullDeploy();
