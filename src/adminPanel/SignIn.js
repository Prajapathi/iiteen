/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
// import firebase from 'firebase/app';
import {
  Container,
  Grid,
  Panel,
  Row,
  Col,
  Button,
  Icon,
  Alert,
} from "react-bootstrap";
// import { auth, database } from '../misc/firebase';
import firebase from "firebase";
import { TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

// eslint-disable-next-line arrow-body-style
const SignIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [go, setGo] = useState(false);
  const [error,setError]=useState(false)

  const history = useHistory();

  // const signInProvider = async provider => {
  //   try {
  //     // this additionaluserinfo ans user objects comes from the json object we get
  //     const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

  //     if (additionalUserInfo.isNewUser) {
  //       database.ref(`profiles/${user.uid}`).set({
  //         name:user.displayName,
  //         createdAt:firebase.database.ServerValue.TIMESTAMP         // provides sanatized timestamp
  //       });
  //     }

  //     Alert.success('Signed In', 4000);
  //   } catch (err) {
  //     Alert.error(err.message, 4000);
  //   }
  // };
  // const onFacebookSignIn = () => {
  //   signInProvider(new firebase.auth.FacebookAuthProvider());
  // };
  // const onGoogleSignIn = () => {
  //   signInProvider(new firebase.auth.GoogleAuthProvider());
  // };

  const signin = () => {
    const db = firebase.firestore();
    db.collection("admin credentials")
      .doc("credentials")
      .onSnapshot((snap)=>{
        // console.log(snap.data());
        if (
          username == snap.data().username &&
          password == snap.data().password
        ) {
          db.collection("User")
            .doc(firebase.auth().currentUser.uid)
            .set({ admin: new Date().getTime() }, { merge: true })
            .then(() => {
              console.log("made admin");
              setGo(true);
              // history.push('/previousyearsubjectwise')
            })
            .catch((error) => {
              console.log(error.message);
              
            });
        } else {
          setError(true)
          console.log("username or password is incorrect");
        }
      });
  };

  useEffect(() => {
    if (go) {
      console.log("here inside go");
      history.push("/previousyearsubjectwise");
    }
  }, [go]);

  return (
    <Container>
      {/* mt-page from utility scss file it puts top margin as to make the component a little center */}
      {/* <Grid className="mt-page"> */}
      <Row>
        <Col xs={24} md={12} mdOffset={6}>
          {/* <Panel> */}
          {/* //this classname is from utility scss file */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              height: "100vh",
              alignItems: "center",
              marginTop: "240px",
            }}
          >
            <div className="text-center">
              <h2>IITEENS ADMIN LOGIN</h2>
              <div
                className="mt-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "50px",
                }}
              >
                {/* <Button block color="blue" onClick={onFacebookSignIn}>
                  <Icon icon="facebook" />
                   {' '}Continue with Facebook
                </Button>
                <Button block color="green" onClick={onGoogleSignIn}>
                  <Icon icon="google" />
                  {' '}Continue with Google
                </Button> */}
                <TextField
                  label="username"
                  style={{ width: "300px" }}
                  value={username}
                  onChangeCapture={(e) => setUsername(e.target.value)}
                >
                  {username}
                </TextField>
                <TextField
                  label="password"
                  style={{ width: "300px" }}
                  value={password}
                  onChangeCapture={(e) => setPassword(e.target.value)}
                >
                  {password}
                </TextField>
                <div style={{color:"red", paddingTop:"20px",display:`${!error?"none":""}`}}>Username or Password is incorrect</div>
                <Button onClick={signin} style={{ marginTop: "20px" }}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>

          {/* </Panel> */}
        </Col>
      </Row>
      {/* </Grid> */}
    </Container>
  );
};

export default SignIn;
