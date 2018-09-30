import {GetWeb3Instance} from "../utils/web3"
import config from "../config"
import { resolve } from "path";
import { rejects } from "assert";
import waitForMined from '../utils/waitForMined'

export function isSuperUser() {
    return new Promise((resolve, rejects)=>{
        config.contract.instance.superUserAuthorityFunc(GetWeb3Instance().eth.accounts[0], (err, result)=>{
            if (err) {
                return rejects(err)
            }
            resolve(result)
        })
    })
}

export function addUser(address, name, position, canCreateCert){
    return new Promise((resolve, rejects)=>{
        try {
            config.contract.instance.register.sendTransaction(address, name, position, canCreateCert, {
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

export function deleteUser(address){
    return new Promise((resolve, rejects)=>{
        try {
            config.contract.instance.deleteSuperUser.sendTransaction(address, {
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

export function getListSuperUserCreated(address) {
    return new Promise((resolve, rejects)=>{
        try {
            config.contract.instance.getSuperUserList((err, addrs)=>{
                if (err) {
                    return rejects(err)
                }
    
                let listP = []
    
                addrs.forEach(addr => {
                    let p = new Promise((resolve, rejects)=>{
                        config.contract.instance.getSuperUser(addr, (error, c)=>{
                            if(error){
                                return rejects(error)
                            }
    
                            if (c.length < 4) {
                                return rejects("Fail to get users")
                            }
                            
                            resolve({
                                createBy: c[0],
                                name: c[1],
                                position: c[2],
                                uploadPermission: c[3],
                                address: addr
                            })
                        })
                    })
    
                    listP.push(p)
                });
    
                Promise.all(listP)
                .then(certs=>resolve(certs))
                .catch(error => {throw error})
            })
        } catch (error) {
            rejects(error)
        }
    })
}