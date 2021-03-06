import React, { Component } from "react";
import {signOut} from '../store/action/Authentication'
import {connect} from 'react-redux'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import firebase from 'firebase'

export class PhoneLogin extends Component {
  constructor() {
    super();
    this.state = {
      form: true,
      alert: false,
    };
  }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("User is signed in",user.uid)
        } else {
            console.log("No user is signed in")
        }
        });
    }
    
    
  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.setUpRecaptcha();
    let phoneNumber = "+91" + this.state.mobile;
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
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log("Toh?",error);
      });
  };

  onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = this.state.otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
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

  showCurrentUser=()=>{
      var user = firebase.auth().currentUser;
        var name, phoneNumber, photoUrl, uid, phoneNumberVerified;

        if (user != null) {
        name = user.displayName;
        phoneNumber = user.phoneNumber;
        photoUrl = user.photoUrl;
        phoneNumberVerified = user.phoneNumberVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                        // this value to authenticate with your backend server, if
                        // you have one. Use User.getToken() instead.
        }
      console.log("USER: ",name,phoneNumber,photoUrl,uid,phoneNumberVerified)
  }

  signout=()=>{
      firebase.auth().signOut().then(() => {
        console.log("Sign-out successful")
        this.props.signOut()
    }).catch((error) => {
     console.log("An error happened.")
    });
  }

  render() {
    return (
      <div>
        <Container fluid="sm" className="mt-3">
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={5}>
              <h2 className="mb-3">Login</h2>
              <Form className="form" onSubmit={this.onSignInSubmit}>
                <div id="recaptcha-container"></div>
                <Form.Group>
                  <Form.Control
                    type="number"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={this.onChangeHandler}
                    required
                  />
                </Form.Group>
                <Button button="Submit" type="submit" >Generate OTP</Button>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={5}>
              <h2 className="mb-3">Enter OTP</h2>
              <Form className="form" onSubmit={this.onSubmitOtp}>
                <Form.Group>
                  <Form.Control
                    id="otp"
                    type="number"
                    name="otp"
                    placeholder="OTP"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
                <Button button="Submit" type="submit" >Sign In</Button>
                <Button onClick={this.showCurrentUser}>Show User</Button>
                <Button onClick={this.signout}>Sign Out</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps=dispatch=>{
    return{
        signOut:()=>dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(PhoneLogin)