import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Certificate from '../components/Certificate';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import ShareIcon from '@material-ui/icons/Share';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Loading from '../components/Loading'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import browserHistory from "../utils/browserHistory";
import SearchIcon from '@material-ui/icons/Search';
import {listCertificate} from '../api/certificate'
import {share, unshare} from '../api/share'

const styles =({
  input: {
    position: 'absolute',
    right: 100,
    top: 18,
    color: 'inherit',
  },
  inputS: {
    top: 18,
    color: 'inherit',
    size: 30,
  },
  rightpage:{
    display:"inline-block",
    backgroundColor: "#FAFAFA",
    height: "calc(100vh - 64px)",
    width: "calc(80vw - 25px)",
    verticalAlign: "top",
  },
  page:{
    paddingTop: 64,
  },
  leftpage:{
    position: 'relative',
    display:"inline-block",
    backgroundColor: "grey",
    height: "calc(100vh - 64px)",
    width: "20vw",
    verticalAlign: "top",
    padding: 5,
  },
  labels:{
    display:"inline-block",
    //color: "black",
  },

  button: {
    position: 'absolute',
    top : 13,
    right: 10,
    width: 40
  },
  componentss: {
    //position: 'relative',
    display:"inline-block",
    margin: "10px",
  },
});



export default class UserNormal extends Component {

  state = {
    isLoading: false,
    certificates: [],
    addressToShare: "",
    errorMessage: ""
  }

  constructor(props){
    super(props)

    this.loadCerts = this.loadCerts.bind(this)
    this.share = this.share.bind(this)
  }

  componentDidMount(){
    this.loadCerts()
  }

  loadCerts(){
      this.setState({isLoading: true})
      listCertificate()
      .then(listCerts=>{
          console.log(listCerts);

          this.setState({
              isLoading: false,
              certificates: listCerts
          })
      })
      .catch(error=>this.setState({isLoading: false, errorMessage: error.message || error.toString()}))
  }

  share(cert){
    if(this.state.addressToShare === ""){
      return this.setState({errorMessage: "Please fill the address to share"})
    }

    this.setState({isLoading: true})

    share(this.state.addressToShare, cert.id)
    .then(()=>{
      this.setState({isLoading: false})
    })
    .catch(error=>this.setState({isLoading: false, errorMessage: error.message || error.toString()}))
  }

  onClickDetail() {
    browserHistory.push("/certificate/detail")
  }
  
  render() {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <div style={styles.labels} > Address Owner </div> 
            <Input
              placeholder="Enter address to share"
              // disableUnderline
              style={styles.input}
              value={this.state.addressToShare}
              onChange={e=>this.setState({addressToShare: e.target.value})}
            />
          </Toolbar>
        </AppBar>  
        <div style={styles.page}>
          <div style={styles.leftpage} >
            <Input
              placeholder="Search....."
              //disableUnderline
              style={styles.inputS}
              inputProps={{
                'aria-label': 'Description',
              }}
            />
              <Button color="inherit" variant="contained" style={styles.button} >
                <SearchIcon/>
              </Button>
            </div>
 
 
 
            <div style={styles.rightpage} >
            {
                this.state.certificates.map((cer, index)=>(
                    cer.name && <Certificate
                      onClick={this.onClickDetail}
                      onClickShare={()=>this.share(cer)}
                      style={styles.componentss}
                      key={index}
                      image={cer.image}
                      text={cer.name}
                    />
                ))
            }         
            </div>
        </div>
        <Loading show={this.state.isLoading} />

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.state.errorMessage !== ""}
          onClose={()=>this.setState({errorMessage: ""})}
          message={this.state.errorMessage}
        />
      </div>
    )
  }
}
