require("dotenv").config();
const {deployDemeterContract, initDemeterContract} = require("./deploy");
const {setExchangePrice} = require("./mint");
const {hmy, options} = require("./hmy");

const erc20Json = require("../build/contracts/ERC20.json");

const usdContract = hmy.contracts.createContract(erc20Json.abi, process.env.USD_TOKEN_ADDRESS);
usdContract.wallet.addByPrivateKey(process.env.USER_PRIVATE_KEY);
const govContract = hmy.contracts.createContract(erc20Json.abi, process.env.GOV_TOKEN_ADDRESS);
govContract.wallet.addByPrivateKey(process.env.USER_PRIVATE_KEY);

async function end2end() {
    console.log('---- before issueSynths ----')

    let res = await usdContract.methods.balanceOf(process.env.USER_ADDRESS).call(options);
    console.log('hUSD balance: ' + Number(res));

    res = await govContract.methods.balanceOf(process.env.USER_ADDRESS).call(options);
    console.log('1HRV balance: ' + Number(res));

    console.log('-----')

    const contractAddr = await deployDemeterContract();

    console.log('-----')

    await initDemeterContract(contractAddr, process.env.GOV_TOKEN_ADDRESS, process.env.USD_TOKEN_ADDRESS);

    console.log('-----')

    await setExchangePrice(contractAddr, process.env.USD_TOKEN_ADDRESS, '0x22');

    console.log('-----')

    process.exit();
}

end2end();
