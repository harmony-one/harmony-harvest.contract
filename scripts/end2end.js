require("dotenv").config();
const {deployDemeterContract, initDemeterContract, addAsset, deployToken, setTokenGrantRole} = require("./deploy");
const {lockTokenByGOV, lockTokenByOne, unlockToken, getTokens, getSynth, getGovernanceAddress, approveToken} = require("./mint");
const {getTokenBalance} = require("./balances");
const {hmy} = require("./hmy");

const sleep = (ms) => new Promise(res => setTimeout(res, ms))

let govContractAddr = "";
const usdContractAddr = "0xc45055e3bde147155f783c83d38ef51b292cce4a";
const contractAddr = "0xb91db3d0b14f010dbe699fd510b625a18180bbbe"

async function getBalances() {
    console.log('---BALANCES---')
    let res = await hmy.blockchain.getBalance({ address: process.env.USER_ADDRESS });
    console.log('User balance before: ' + Number(res.result) / 1e18)

    res = await getTokenBalance(usdContractAddr, process.env.USER_ADDRESS);
    console.log('sUSD balance before: ' + Number(res) / 1e18);

    res = await getTokenBalance(govContractAddr, process.env.USER_ADDRESS);
    console.log('1HRV balance before: ' + Number(res) / 1e18);
    console.log('-------------')

    res = await getTokenBalance(govContractAddr, contractAddr);
    console.log('1HRV total Locked: ' + Number(res) / 1e18);
    console.log('-------------')

    // res = await getTokenBalance(contractAddr, process.env.USER_ADDRESS);
    // console.log('Demetra balance: ' + Number(res) / 1e18);
    // console.log('-------------')
}

async function end2end() {
    // const govContractAddr = await deployToken('1HRV', '1HRV');
    // const usdContractAddr = await deployToken('hUSD', 'hUSD');
    // console.log('-----')
    // const contractAddr = await deployDemeterContract();
    // console.log('-----')
    // await setTokenGrantRole(govContractAddr, contractAddr);
    // await setTokenGrantRole(usdContractAddr, contractAddr);
    // console.log('-----')
    // await initDemeterContract(contractAddr, govContractAddr);
    // console.log('-----')
    // await addAsset(contractAddr, usdContractAddr, 10, 100);
    // console.log('-----')
    // console.log('--- DEPLOY FINISH ---')
    //
    // console.log('sleep 15s');
    // await sleep(15000);

    // await lockTokenByOne(contractAddr, usdContractAddr, 100); // working ok

    govContractAddr = await getGovernanceAddress(contractAddr);
    console.log('getGovernanceAddress: ', govContractAddr);

    let res = await getSynth(contractAddr, govContractAddr);
    console.log('GOV_TOKEN :', Number(res.governanceToken), Number(res.collateralizationRate), Number(res.exchangePrice));

    res = await getSynth(contractAddr, usdContractAddr);
    console.log('USD_TOKEN :', Number(res.collateralizationRate), Number(res.exchangePrice));

    res = await getSynth(contractAddr, "0x0000000000000000000000000000000000000000");
    console.log('ONE_BASE :', Number(res.collateralizationRate), Number(res.exchangePrice));

    await getBalances();

    // Lock 500 1HRV and Mint 250 hUSD
    await approveToken(govContractAddr, contractAddr, 500);
    await lockTokenByGOV(contractAddr, usdContractAddr, 500);

    console.log('sleep 5s');
    await sleep(5000)

    await getBalances();

    // Burn 250 hUSD and unlock 500 1HRV
    await approveToken(usdContractAddr, contractAddr, 250);
    await unlockToken(contractAddr, usdContractAddr, govContractAddr, 250);

    console.log('sleep 5s');
    await sleep(5000)

    await getBalances();

    process.exit();
}

end2end();
