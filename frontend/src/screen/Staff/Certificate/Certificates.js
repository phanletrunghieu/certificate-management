import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../../../components/Loading'
import Certificate from "../../../components/Certificate"
import AddCertificateDialog from "./AddCertificateDialog"
import {listCertificate} from '../../../api/certificate'

export default class Certificates extends Component {
    address = this.props.match.params.address

    constructor(props){
        super(props)

        this.loadCerts = this.loadCerts.bind(this)
    }

    state = {
        isLoading: false,
        certificates: [],
    }

    componentWillMount(){
        this.loadCerts()
    }

    loadCerts(){
        this.setState({isLoading: true})
        
        listCertificate(this.address)
        .then(listCerts=>{
            console.log(listCerts);

            this.setState({
                isLoading: false,
                certificates: listCerts
            })
        })
        .catch(error=>this.setState({isLoading: false, errorMessage: error.message || error.toString()}))
    }

    render() {
        let styles = {
            container: {
                width: 1029,
                margin: "auto"
            },
            fab: {
                position: "absolute",
                bottom: 20,
                right: 20
            },
            certificate: {
                display: "inline-block",
                margin: 5,
            }
        }
        
        return (
            <div style={styles.container}>
                {
                    this.state.certificates.map((cer, index)=>(
                        cer.name && <Certificate key={index} style={styles.certificate} image={cer.image} text={cer.name}/>
                    ))
                }
                <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    style={styles.fab}
                    onClick={()=>this._dialogAdd.open()}
                >
                    <AddIcon />
                </Button>

                <Loading show={this.state.isLoading} />

                <AddCertificateDialog ref={r=>this._dialogAdd=r} address={this.address} />
            </div>
        )
    }
}
