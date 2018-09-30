import abi from "./abi.json";
import {GetWeb3Instance} from "../utils/web3"

var web3 = GetWeb3Instance()
web3.eth.defaultAccount = web3.eth.accounts[0];

var contractAddress = "0x0637dd56ed5ca28796d15a437fa3ffc6990b9246"

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