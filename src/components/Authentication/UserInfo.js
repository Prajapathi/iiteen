import React from 'react'
import '../../styles/signin.css'
import firebase from 'firebase/app'
import { getAuth, updateEmail,  } from "firebase/auth";
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
    const [loading,setLoading]=React.useState(false)
    const [showError,setShowError]=React.useState(false)

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
        setLoading(true)
        let user = firebase.auth().currentUser;
        

        user.updateEmail(email).then(function() {
            user.updateProfile({
                displayName: name
            })
            .then(function() {
                props.updateUserProfile(user)
                console.log("Updated")
                setLoading(false)
                props.closeDialog()
            })
            .catch(function(error) {
                setShowError(true)
                setLoading(false)
                console.log("error",error)
            });
        }).catch(function(error) {
            setShowError(true)
            setLoading(false)
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
                            {loading?
                                <CircularProgress/>
                                :
                                showError?
                                <>
                                    <div className="edit-name-error">
                                        <div>An error occured. <br/>Please Try again later.</div>
                                        <button className="edit-button" onClick={props.closeDialog}>
                                            Cancel
                                        </button>
                                    </div>
                                </>
                                :
                               <div>
                                    <Button 
                                    id="signin-button" 
                                    disabled={!allowSubmit} 
                                    onClick={setUserDetails}
                                >
                                    Submit
                                </Button>
                                <Button 
                                    id="signin-button" 
                                    
                                    onClick={()=>{
                                        props.closeDialog();
                                    }}
                                >
                                    Cancel
                                </Button>
                               </div>
                                
                            }
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
