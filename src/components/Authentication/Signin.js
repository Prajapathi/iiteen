import React from 'react'
import '../../styles/signin.css'
import firebase from 'firebase/app'
import {setAuthentication} from '../../store/action/Authentication'
import {connect} from 'react-redux'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';


export function Signin(props) {
    const [showLoading,setShowLoading]=React.useState(false)
    const [recaptchaSetOnce,setRecaptchaSetOnce]=React.useState(false)
    const [showOTPInput,setShowOTPInput]=React.useState(false);
    const [phoneNo,setPhoneNo]=React.useState('');
    const [otp,setOTP]=React.useState('')
    const [showIncorrectOTPError,setShowIncorrectOTPError]=React.useState(false)
    const [showInvalidNumber,setShowInvalidNumber]=React.useState(false)
    const [showError,setShowError]=React.useState(false)
    const [disableExit,setDisableExit]=React.useState(false)

    const onSignInSubmit = (e) => {
        e.preventDefault();

        //if previously the Phone was invalid then this new attempt will hide the error
        setShowInvalidNumber(false)

        setShowLoading(true)
        setDisableExit(true)

        //set recaptcha only the first time
        if(recaptchaSetOnce==false){
            setUpRecaptcha();
            setRecaptchaSetOnce(true)
        }

        let phoneNumber = "+91" + phoneNo;
        console.log(phoneNumber);
        let appVerifier = window.recaptchaVerifier;
        firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // console.log(confirmationResult);
            setShowLoading(false)
            console.log("OTP is sent");
            setShowOTPInput(true)
        })
        .catch(function (error) {
            setShowLoading(false)
            if(error.code="auth/invalid-phone-number"){
                setShowInvalidNumber(true)
            }
            else setShowError(true)
            console.log("Signin Error:",error);
        });
    };

    const onSubmitOtp = (e) => {
        e.preventDefault();
        setShowLoading(true)

        //if previously the OTP was incorrect then this attempt will hide the error
        setShowIncorrectOTPError(false)
        let otpInput = otp;
        let optConfirm = window.confirmationResult;
        optConfirm
        .confirm(otpInput)
        .then(function (result) {
            // User signed in successfully.
            // console.log("Result" + result.verificationID);
            setShowLoading(false)
            console.log("Sign in successful!")
            let user = result.user;
            props.setAuthentication(user)
        })
        .catch(function (error) {
            setShowLoading(false)
            if(error.code=="auth/invalid-verification-code"){
                //alert("Incorrect OTP");
                setShowIncorrectOTPError(true)
            }
            else
                setShowError(true)
            console.log(error);
        });
    };

    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
            size: "invisible",
            callback: function (response) {
            console.log("Captcha Resolved");
            onSignInSubmit();
            },
            defaultCountry: "IN",
        }
        );
    };
    return (
        <div>
                <Dialog
                    id="signin-dialog"
                    open={props.openLogin}
                    onClose={props.closeLogin}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    style= {{
                        backgroundColor: 'transparent',}}
                    disableBackdropClick={showOTPInput || disableExit?true:false}
                    disableEscapeKeyDown={showOTPInput|| disableExit?true:false}
                >
                    <DialogTitle id="alert-dialog-title" className="dialog-content-signin">
                        {"Please enter your mobile number"}
                    </DialogTitle>
                    <DialogContent className="dialog-content-signin">
                        <DialogContentText id="alert-dialog-description">
                             <Form className="form" onSubmit={onSignInSubmit}>
                                <div id="recaptcha-container"></div>
                                {   !showOTPInput?
                                    <TextField
                                        label="Phone Number"
                                        id="outlined-start-adornment"
                                        value={phoneNo}
                                        onChange={(e)=>setPhoneNo(e.target.value)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                        }}
                                        variant="outlined"
                                    />
                                    :
                                    <TextField
                                        label="Enter OTP"
                                        placeholder="_ _ _ _ _ _"
                                        id="outlined-start-adornment"
                                        value={otp}
                                        onChange={(e)=>setOTP(e.target.value)}
                                        variant="outlined"
                                    />
                                }
                                <br/>
                                 {
                                        showIncorrectOTPError?
                                            <div id="incorrect-error">Incorrect OTP. Please Try Again.</div>
                                            :null
                                }
                                 {
                                        showInvalidNumber?
                                            <div id="incorrect-error">Please enter a valid Phone Number.</div>
                                            :null
                                }
                                <div id="signin-button-section">
                                    {
                                        showLoading?<CircularProgress/>:null
                                    }
                                    {
                                        showError?
                                            <>Something went Wrong. Please Try Again.<br/></>
                                        :
                                    
                                        <Button 
                                            id="signin-button" 
                                            disabled={showLoading} 
                                            onClick={showOTPInput? onSubmitOtp: onSignInSubmit}
                                            style={{backgroundColor:showLoading?'grey':null}}
                                        >
                                            Enter
                                        </Button>
                                    }
                                </div>
                            </Form>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
        </div>
    )
}

const mapDispatchToProps=dispatch=>{
    return{
        setAuthentication:(user)=>dispatch(setAuthentication(user))
    }
}

export default connect(null,mapDispatchToProps)(Signin)
