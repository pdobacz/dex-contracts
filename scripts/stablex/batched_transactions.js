const CPK = require("contract-proxy-kit")
const ERC20 = artifacts.require("ERC20")

module.exports = async function(callback) {
  try {
    // TODO - fetch from argv
    const gusd = await ERC20.at("0x784b46a4331f5c7c495f296ae700652265ab2fc6")
    const tusd = await ERC20.at("0x0000000000085d4780b73119b644ae5ecd22b376")
    console.log("Aquired ERC20 tokens:", gusd.address, tusd.address)

    // const fundAccount = "0xe6858FF4C3Dbecb91E7A91aEC9913DDbB9b30344"
    // const traderAddresses = [
    //   "0x3273449DB03e0e1bc80586b6093911b3624556EA",
    //   "0xe8D79Aedf3e18131367C7a7c75Ce45522EeEeef7"
    // ]

    const accounts = await web3.eth.getAccounts()

    // TODO - read this from args argv.amount
    // const amount = `${10e18}`

    console.log("Initializing Contract Proxy Kit")
    const cpk = await CPK.create({ web3, ownerAccount: accounts[0] })

    console.log("Using Owner Account:", await cpk.getOwnerAccount())

    console.log("Attempting to execute batched transaction with cpk at address", cpk.address)

    const txObject = await cpk.execTransactions([
      {
        operation: CPK.CALL,
        to: "0x22d491bde2303f2f43325b2108d26f1eaba1e32b",
        value: `${1e16}`,
        data: "0x",
      },
      {
        operation: CPK.CALL,
        to: "0xffcf8fdee72ac11b5c542428b35eef5769c409f0",
        value: `${1e16}`,
        data: "0x",
      },
    ])

    // const txObject = await cpk.execTransactions([
    //   {
    //     operation: CPK.DELEGATECALL,
    //     to: gusd.address,
    //     value: 0,
    //     data: gusd.contract.methods.transferFrom(fundAccount, traderAddresses[0], amount).encodeABI(),
    //   },
    //   {
    //     operation: CPK.DELEGATECALL,
    //     to: gusd.address,
    //     value: 0,
    //     data: gusd.contract.methods.transferFrom(fundAccount, traderAddresses[1], amount).encodeABI(),
    //   },
    //   {
    //     operation: CPK.DELEGATECALL,
    //     to: tusd.address,
    //     value: 0,
    //     data: tusd.contract.methods.transferFrom(fundAccount, traderAddresses[0], amount).encodeABI(),
    //   },
    //   {
    //     operation: CPK.DELEGATECALL,
    //     to: tusd.address,
    //     value: 0,
    //     data: tusd.contract.methods.transferFrom(fundAccount, traderAddresses[1], amount).encodeABI(),
    //   },
    // ])

    console.log(txObject.hash)

    callback()
  } catch (error) {
    callback(error)
  }
}
