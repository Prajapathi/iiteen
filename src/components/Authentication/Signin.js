import React from 'react'
import '../../styles/signin.css'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase'


export default function Signin(props) {
    const [showOTPInput,setShowOTPInput]=React.useState(false);
    const [phoneNo,setPhoneNo]=React.useState('');
    const [otp,setOTP]=React.useState('')

    const onSignInSubmit = (e) => {
        e.preventDefault();
        setUpRecaptcha();
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
            console.log("OTP is sent");
            setShowOTPInput(true)
        })
        .catch(function (error) {
            console.log("Toh?",error);
        });
    };

    const onSubmitOtp = (e) => {
        e.preventDefault();
        let otpInput = otp;
        let optConfirm = window.confirmationResult;
        optConfirm
        .confirm(otpInput)
        .then(function (result) {
            // User signed in successfully.
            // console.log("Result" + result.verificationID);
            console.log("Sign in ho gaya!")
            let user = result.user;
        })
        .catch(function (error) {
            console.log(error);
            alert("Incorrect OTP");
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
                                        id="outlined-start-adornment"
                                        value={otp}
                                        onChange={(e)=>setOTP(e.target.value)}
                                        variant="outlined"
                                    />
                                }
                                <br/>
                                <Button id="signin-button" onClick={showOTPInput? onSubmitOtp: onSignInSubmit}>
                                    Enter
                                </Button>
                            </Form>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
        </div>
    )
}
