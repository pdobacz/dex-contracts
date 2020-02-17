const BatchExchange = artifacts.require("BatchExchange")
const BatchExchangeViewer = artifacts.require("BatchExchangeViewer")
const { decodeOrdersBN } = require("../../src/encoding.js")

module.exports = async callback => {
  try {
    const instance = await BatchExchange.deployed()
    const instanceViewer = await BatchExchangeViewer.deployed()

    const owlTokenAddress = await instance.tokenIdToAddressMap.call(0)
    const numberOfToken = await instance.numTokens.call()

    for (let tokenId = 1; tokenId < numberOfToken; tokenId++) {
      const tokenAddress = await instance.tokenIdToAddressMap.call(tokenId)
      console.log("Checking liquidty for token: ", tokenAddress)
      const ordersDataFiltered = await instanceViewer.getOpenOrderBook.call([tokenAddress, owlTokenAddress], { gas: 8e9 })
      const orders = decodeOrdersBN(ordersDataFiltered)
      console.log("orders", orders)
    }
    callback()
  } catch (error) {
    callback(error)
  }
}
