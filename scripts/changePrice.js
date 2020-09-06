require("dotenv").config();
const {setExchangePrice, getExchangePrice} = require("./mint");

async function fullDeploy() {
    const govContractAddr="0x1a37c00371297d9507a5bcffe7f2e9c3155658ed"
    const usdContractAddr="0x00e0004d9b5dfb5acad0c2a3124ca3b7d2062c38"
    const btcContractAddr="0x57a7f30e9fc2f0152d06cc8e6c20db0f0cfe097d"

    const contractAddress="0xa880bd722e22d8901f6d62722edfb5d0633f0eb0"

    console.log('-----')
    let res = await getExchangePrice(contractAddress, usdContractAddr);
    console.log('hUSD exchange price: ' + Number(res));
    console.log('-----')

    await setExchangePrice(contractAddress, usdContractAddr, 1)

    console.log('-----')
    res = await getExchangePrice(contractAddress, usdContractAddr);
    console.log('hUSD exchange price: ' + Number(res));
    console.log('-----')

    process.exit();
}

fullDeploy();
