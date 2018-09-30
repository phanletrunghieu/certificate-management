import abi from "./abi.json";
import {GetWeb3Instance} from "../utils/web3"

var web3 = GetWeb3Instance()
web3.eth.defaultAccount = web3.eth.accounts[0];

var contractAddress = "0x4ccd50b5b29e418df4e5e23d0df0193b8de9f017"

var MyContract = web3.eth.contract(abi);
var contractInstance = MyContract.at(contractAddress);

const config = {
    web3: web3,
    contract: {
        abi: abi,
        address: contractAddress,
        instance: contractInstance
    }
}

export default config