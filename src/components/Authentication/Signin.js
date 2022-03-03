import React from "react";
import "../../styles/signin.css";
import firebase from "firebase/app";
import { setAuthentication } from "../../store/action/Authentication";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getAuth } from "firebase/auth";
import app from "firebase/app";

export function Signin(props) {
  const [showLoading, setShowLoading] = React.useState(false);
  const [recaptchaSetOnce, setRecaptchaSetOnce] = React.useState(false);
  const [showOTPInput, setShowOTPInput] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("+91");
  const [phoneNo, setPhoneNo] = React.useState("");
  const [otp, setOTP] = React.useState("");
  const [showIncorrectOTPError, setShowIncorrectOTPError] =
    React.useState(false);
  const [showInvalidNumber, setShowInvalidNumber] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [disableExit, setDisableExit] = React.useState(false);
  const [phoneNum, setPhoneNum] = React.useState();
  const [alreadyUser, setAlreadyUser] = React.useState(false);
  const [notalreadyuser,setNotalreadyuser]=React.useState(false);

  const enterPhoneNo = (inp) => {
    if (isNaN(inp)) {
      return;
    } else {
      setPhoneNo(inp);
    }
  };

  // React.useEffect(()=>{
  //   if(props.openLogin){
  //     setAlreadyUser(false)
  //   }
  // },[props.openLogin])

  const onSignInSubmit = async (e) => {
    // if (alreadyUser) {
    //   return;
    // }
    // e.preventDefault();

    //if previously the Phone was invalid then this new attempt will hide the error
    setShowInvalidNumber(false);

    setShowLoading(true);
    setDisableExit(true);

    // //set recaptcha only the first time
    // if (recaptchaSetOnce == false) {
    //   setUpRecaptcha();
    //   setRecaptchaSetOnce(true);
    // }

    let phoneNumber = countryCode + phoneNo;
    // new code
    // app.auth()
    //   .getUserByPhoneNumber(phoneNumber)
    //   .then(() => {
    //     console.log("phone number already exist");
    //     return;
    //   })
    //   .catch((e) => {});
    const db = firebase.firestore();
    console.log(phoneNumber);
    console.log(props.openLogin, props.login, alreadyUser);
    if (!props.login) {
      const snapshot = await db
        .collection("User")
        .where("phoneNumber", "==", phoneNumber)
        .get();

      if (snapshot.empty) {
        console.log("No matching documents.");
      } else {
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          setAlreadyUser(true);
          setShowLoading(false);
        });
        return;
      }
    }

    if (props.login) {
      console.log("gone")
      const snapshot = await db
        .collection("User")
        .where("phoneNumber", "==", phoneNumber)
        .get();

      if (snapshot.empty) {
        console.log("No matching documents.");
        setNotalreadyuser(true)
        setShowLoading(false);
        return;
      } else {
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
      }
    }
    //set recaptcha only the first time
    if (recaptchaSetOnce == false) {
      setUpRecaptcha();
      setRecaptchaSetOnce(true);
    }

    //
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        setPhoneNum(phoneNumber);
        setShowLoading(false);
        console.log("OTP is sent");
        setShowOTPInput(true);
      })
      .catch(function (error) {
        setShowLoading(false);
        if ((error.code = "auth/invalid-phone-number")) {
          // setShowInvalidNumber(true);
        } else setShowError(true);
        console.log("Signin Error:", error);
      });
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    setShowLoading(true);

    //if previously the OTP was incorrect then this attempt will hide the error
    setShowIncorrectOTPError(false);
    let otpInput = otp;
    let optConfirm = window.confirmationResult;
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        setShowLoading(false);
        console.log("Sign in successful!");
        let user = result.user;
        console.log(result.user.uid);
        const db = firebase.firestore();
        db.collection("User")
          .doc(result.user.uid)
          .set({ phoneNumber: phoneNum }, { merge: true })
          .then(() => {
            console.log("saved phone number");
          })
          .catch((error) => {
            console.log(error.message);
          });
        props.setAuthentication(user);
      })
      .catch(function (error) {
        setShowLoading(false);
        if (error.code == "auth/invalid-verification-code") {
          //alert("Incorrect OTP");
          setShowIncorrectOTPError(true);
        } else setShowError(true);
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
          //new code
          // props.setOpenLogin(true)
          //
          onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  const useStyles = makeStyles((theme) => ({
    paper: { minWidth: "500px" },
  }));
  return (
    <div>
      <Dialog
        // classes={{ paper: classes.paper}}
        id="signin-dialog"
        open={props.openLogin}
        onClose={props.closeLogin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-desc ription"
        fullWidth
        style={{
          backgroundColor: "transparent",
          width: "700px",
          margin: "0px !important",
          background:"rgba( 234, 234, 234) !important"
        }}
        disableBackdropClick={showOTPInput || disableExit ? true : false}
        disableEscapeKeyDown={showOTPInput || disableExit ? true : false}
      >
        <DialogTitle
          id="alert-dialog-title"
          disableTypography
          className="dialog-content-signin signin-title"
          style={{width:"100%"}}
        >
          {
            // (showOTPInput || disableExit)?null
            //    :
            <IconButton
              onClick={props.closeLogin}
              className="dialog-close-icon"
            >
              <CloseIcon />
            </IconButton>
          }
          {props.login ? (
            "Please enter your mobile number"
          ) : (
            <div>
              Free Trial for 10 Days!
              <ul id="signup-feature-list">
                <li>Upto 48+ Previous Year Papers</li>
                <li>6800+ Subjectwise Questions for Practice</li>
                <li>15 Mock Test Papers according to latest JEE Pattern</li>
              </ul>
              <div className="signup-offer">
                Inaugral Price Offer Re. 1/- per day only{" "}
              </div>
            </div>
          )}
        </DialogTitle>
        <DialogContent className="dialog-content-signin" style={{width:"100%"}}>
          <DialogContentText id="alert-dialog-description">
            {props.login ? null : (
              <>
                <div>Please enter your mobile number</div>
                <br />
              </>
            )}
            <Form className="form" onSubmit={onSignInSubmit}>
              <div id="recaptcha-container"></div>
              {!showOTPInput ? (
                <TextField
                  label="Phone Number"
                  id="outlined-start-adornment"
                  value={phoneNo}
                  onChange={(e) => enterPhoneNo(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Select
                          select
                          value={countryCode}
                          onChange={(event) =>
                            setCountryCode(event.target.value)
                          }
                        >
                          <MenuItem value="+91">+91</MenuItem>
                          <MenuItem value="+1">+1</MenuItem>
                        </Select>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  maxLength="10"
                  inputProps={{ maxLength: 10 }}
                />
              ) : !(alreadyUser||notalreadyuser) ? (
                <TextField
                  label="Enter OTP"
                  placeholder="_ _ _ _ _ _"
                  id="outlined-start-adornment"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  variant="outlined"
                />
              ) : null}
              <br />
              {showIncorrectOTPError ? (
                <div id="incorrect-error">Incorrect OTP. Please Try Again.</div>
              ) : null}
              {showInvalidNumber ? (
                <div id="incorrect-error">
                  Please enter a valid Phone Number.
                </div>
              ) : null}
              {alreadyUser && (
                <div>
                  <div id="incorrect-error">
                    You are already a User. Please Log in
                  </div>
                  <Button
                    onClick={() => {
                      setAlreadyUser(false);
                      props.setOpenSignup(false);
                      props.setOpenLogin(true);
                    }}
                  >
                    Login
                  </Button>
                </div>
              )}
              {notalreadyuser && (
                <div>
                  <div id="incorrect-error">
                    You are not a registered User. Please Sign in
                  </div>
                  {/* <Button
                    onClick={() => {
                      setAlreadyUser(false);
                      props.setOpenSignup(false);
                      props.setOpenLogin(true);
                    }}
                  >
                    Login
                  </Button> */}
                </div>
              )}
              <div id="signin-button-section">
                {showLoading ? <CircularProgress /> : null}
                {showError ? (
                  <>
                    Something went Wrong. Please Try Again.
                    <br />
                  </>
                ) : !(alreadyUser||notalreadyuser) ? (
                  <Button
                    id="signin-button"
                    disabled={
                      showLoading || (!showOTPInput && phoneNo.length < 10)
                    }
                    onClick={showOTPInput ? onSubmitOtp : onSignInSubmit}
                    style={{ backgroundColor: showLoading ? "grey" : null }}
                  >
                    Enter
                  </Button>
                ) : null}
              </div>
            </Form>
            {!showOTPInput ? (
              <div id="signin-data-rate-warning">
                By continuing you may receive a SMS for verification. Message
                and data rates may apply.
              </div>
            ) : null}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthentication: (user) => dispatch(setAuthentication(user)),
  };
};

export default connect(null, mapDispatchToProps)(Signin);
