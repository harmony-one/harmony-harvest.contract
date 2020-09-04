require("dotenv").config();
const {deployDemeterContract, initDemeterContract, addAsset, deployToken, setTokenGrantRole} = require("./deploy");
const {lockToken} = require("./mint");
const {getTokenBalance} = require("./balances");
const {hmy} = require("./hmy");

async function end2end() {
    const govContractAddr = await deployToken('1HRV', '1HRV');
    const usdContractAddr = await deployToken('hUSD', 'hUSD');
    console.log('-----')
    const contractAddr = await deployDemeterContract();
    console.log('-----')
    await setTokenGrantRole(govContractAddr, contractAddr);
    await setTokenGrantRole(usdContractAddr, contractAddr);
    console.log('-----')
    await initDemeterContract(contractAddr, govContractAddr);
    console.log('-----')
    await addAsset(contractAddr, usdContractAddr, 10, 100);
    console.log('-----')
    console.log('--- DEPLOY FINISH ---')

    let res = await hmy.blockchain.getBalance({ address: process.env.USER_ADDRESS });
    console.log('User balance before: ' + Number(res.result) / 1e18)

    res = await getTokenBalance(usdContractAddr, process.env.USER_ADDRESS);
    console.log('sUSD balance before: ' + Number(res));

    await lockToken(contractAddr, usdContractAddr, 1000);

    res = await hmy.blockchain.getBalance({ address: process.env.USER_ADDRESS });
    console.log('User balance after: ' + Number(res.result) / 1e18)

    res = await getTokenBalance(usdContractAddr, process.env.USER_ADDRESS);
    console.log('sUSD balance after: ' + Number(res));

    process.exit();
}

end2end();
