import {GetWeb3Instance} from "../utils/web3"
import config from "../config"
import { resolve } from "path";
import { rejects } from "assert";
import waitForMined from '../utils/waitForMined'

export function listCertificate(address){
    if(!address){
        address = config.web3.eth.defaultAccount
    }

    return new Promise((resolve, rejects)=>{
        try {
            config.contract.instance.userCerts(address, (error, result)=>{
                if(error){
                    throw error
                }
                
                if(result.length === 0){
                    return resolve([])
                }
                
                result = result.substring(0, result.length-1)
                let certIDs = result.split("|")
                let listP = []
                certIDs.forEach(cert => {
                    let p = new Promise((resolve, rejects)=>{
                        console.log(certIDs, cert, address);
                        config.contract.instance.getUserCertificate(cert, address, (error, c)=>{
                            if(error){
                                return rejects(error)
                            }

                            if (c.length < 5) {
                                return rejects("Fail to get certificates")
                            }
                            
                            resolve({
                                id: c[0],
                                owner: c[1],
                                name: c[2],
                                createBy: c[3],
                                certificateIPFS: c[4]
                            })
                        })
                    })

                    listP.push(p)
                });

                console.log("listP", listP);

                Promise.all(listP)
                .then(certs=>resolve(certs))
                .catch(error => {throw error})
            })
        } catch (error) {
            rejects(error)
        }
    })
}

export function addCertificate(address, name, linkIPFS){
    return new Promise((resolve, rejects)=>{
        try {
            config.contract.instance.uploadCertificate.sendTransaction(address, name, linkIPFS, {
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