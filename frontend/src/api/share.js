import {GetWeb3Instance} from "../utils/web3"
import config from "../config"
import { resolve } from "path";
import { rejects } from "assert";
import waitForMined from '../utils/waitForMined'

export function share(address, certID){
    return new Promise((resolve, rejects)=>{
        try {
            config.contract.instance.shareCert.sendTransaction(address, certID, {
                to: config.contract.address
            }, (error, hash)=>{
                if(error){
                    throw error
                }
                
                waitForMined(hash)
                .then(()=>{
                    resolve(hash)
                })
                .catch(err => {
                    throw err
                })
            })
        } catch (error) {
            rejects(error)
        }
    })
}

export function unshare(address, certID){
    return new Promise((resolve, rejects)=>{
        try {
            config.contract.instance.unSshareCert.sendTransaction(address, certID, {
                to: config.contract.address
            }, (error, hash)=>{
                if(error){
                    throw error
                }
                
                waitForMined(hash)
                .then(()=>{
                    resolve(hash)
                })
                .catch(err => {
                    throw err
                })
            })
        } catch (error) {
            rejects(error)
        }
    })
}