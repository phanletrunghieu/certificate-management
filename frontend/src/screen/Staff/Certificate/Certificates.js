import React, { Component } from 'react'
import Certificate from "../../../components/Certificate"

export default class Certificates extends Component {
    state = {
        certificates: [
            {
                name: "Bang cap 1",
                image: "https://material-ui.com/static/images/grid-list/breakfast.jpg",
            },
            {
                name: "Bang cap 2",
                image: "https://material-ui.com/static/images/grid-list/breakfast.jpg",
            },
            {
                name: "Bang cap 3",
                image: "https://material-ui.com/static/images/grid-list/breakfast.jpg",
            },
            {
                name: "Bang Dai Hoc UIT",
                image: "https://material-ui.com/static/images/grid-list/breakfast.jpg",
            },
            {
                name: "Bang Dai Hoc UIT 1",
                image: "https://material-ui.com/static/images/grid-list/breakfast.jpg",
            },
        ],
    }

    render() {
        console.log("address", this.props.match.params.address);

        let styles = {
            container: {
                width: 1029,
                margin: "auto"
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
                        <Certificate key={index} style={styles.certificate} image={cer.image} text={cer.name}/>
                    ))
                }
            </div>
        )
    }
}
