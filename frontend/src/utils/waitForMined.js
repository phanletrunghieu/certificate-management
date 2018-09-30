import config from '../config'

export default function waitForMined (txHash) {
    return new Promise((resolve, rejects)=>{
        config.web3.eth.getTransaction(txHash, (error, response) => {
            if (error) { return rejects(error) }
            if (response === null) {
                response = { blockNumber: null }
            }
            if (response.blockNumber) {
                resolve(response)
            } else {
                setTimeout(()=>{
                    waitForMined(txHash)
                    .then(resolve)
                    .catch(rejects)
                }, 1000)
            }
        })
    })
}