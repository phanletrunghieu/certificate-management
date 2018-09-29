import Web3 from 'web3';

var web3;

export function IsMetaMaskEnabled(){
    return !!window.web3
}

export function GetWeb3Instance(){
    if(!web3){
        web3 = new Web3()
        web3.setProvider(window.web3.currentProvider)
    }
    
    return web3
}