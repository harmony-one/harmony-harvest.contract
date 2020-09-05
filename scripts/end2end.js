require("dotenv").config();
const {deployDemeterContract, initDemeterContract, addAsset, deployToken, setTokenGrantRole} = require("./deploy");
const {lockTokenByGOV, lockTokenByOne, getTokens} = require("./mint");
const {getTokenBalance} = require("./balances");
const {hmy} = require("./hmy");

const sleep = (ms) => new Promise(res => setTimeout(res, ms))

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
    await addAsset(contractAddr, usdContractAddr, 10, 10);
    console.log('-----')
    console.log('--- DEPLOY FINISH ---')

    console.log('sleep 15s');
    await sleep(15000);

    let res = await hmy.blockchain.getBalance({ address: process.env.USER_ADDRESS });
    console.log('User balance before: ' + Number(res.result) / 1e18)

    res = await getTokenBalance(usdContractAddr, process.env.USER_ADDRESS);
    console.log('sUSD balance before: ' + Number(res));

    await getTokens(govContractAddr, process.env.USER_ADDRESS, 1000);

    res = await getTokenBalance(govContractAddr, process.env.USER_ADDRESS);
    console.log('1HRV balance before: ' + Number(res));

    await lockTokenByOne(contractAddr, usdContractAddr, 100);

    res = await hmy.blockchain.getBalance({ address: process.env.USER_ADDRESS });
    console.log('User balance after: ' + Number(res.result) / 1e18)

    res = await getTokenBalance(usdContractAddr, process.env.USER_ADDRESS);
    console.log('sUSD balance after: ' + Number(res));

    await lockTokenByGOV(contractAddr, usdContractAddr, 100);

    res = await hmy.blockchain.getBalance({ address: process.env.USER_ADDRESS });
    console.log('User balance after: ' + Number(res.result) / 1e18)

    res = await getTokenBalance(usdContractAddr, process.env.USER_ADDRESS);
    console.log('sUSD balance after: ' + Number(res));

    process.exit();
}

end2end();
