import React from 'react'
import '../../styles/signin.css'
import firebase from 'firebase/app'
import {updateUserProfile} from '../../store/action/Authentication'
import {connect} from 'react-redux'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

export function UserInfo(props) {

    const [email,setEmail]=React.useState()
    const [name,setName]=React.useState('')
    const [emailValid,setEmailValid]=React.useState(false)
    const [allowSubmit,setAllowSubmit]=React.useState(false)

    React.useEffect(() => {
        if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)==true){
            setEmailValid(true)
        }
        else setEmailValid(false)
    }, [email])

    React.useEffect(() => {
        if(name.length!=0 && emailValid)
            setAllowSubmit(true)
        else setAllowSubmit(false)
    }, [email,name])

    const setUserDetails=()=>{
        let user = firebase.auth().currentUser;
        user.updateEmail(email).then(function() {
            user.updateProfile({
                displayName: name
            })
            .then(function() {
                props.updateUserProfile(user)
                console.log("Updated")
                props.closeDialog()
            })
            .catch(function(error) {
                console.log("error",error)
            });
        }).catch(function(error) {
            console.log("error happened:",error)
        });
        
    }
    return (
        <div>
                <Dialog
                    id="signin-dialog"
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    // fullWidth={true}
                    style= {{
                        backgroundColor: 'transparent'}}
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="alert-dialog-title" disableTypography className="dialog-content-signin signin-title">
                        Please provide the following information
                    </DialogTitle>
                    <DialogContent className="dialog-content-signin">
                        <DialogContentText id="alert-dialog-description" >
                            <div className="user-info-input">
                                Name: 
                                <TextField 
                                    required
                                    multiline
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                                <div style={{color:"#FF1E1E"}}>*</div>
                            </div>
                            <div className="user-info-input">
                                Email:
                                <TextField 
                                    required
                                    multiline
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                                <div style={{color:"#FF1E1E"}}>*</div>
                            </div>

                            <Button 
                                id="signin-button" 
                                disabled={!allowSubmit} 
                                onClick={setUserDetails}
                            >
                                Submit
                            </Button>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
        </div>
    )
}

const mapDispatchToProps=dispatch=>{
    return{
        updateUserProfile:(user)=>dispatch(updateUserProfile(user))
    }
}

export default connect(null,mapDispatchToProps)(UserInfo)
