import firebase from "firebase";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Razorpay from "razorpay";
import logo from '../../assets/images/iiteenslogosquare.png'

const RazorpayButton2 = () => {
  const [firstname, setFirstname] = useState("");
  const [mobileno, setMobileno] = useState();
  const [Email, setEmail] = useState("");
  const purchasetype = sessionStorage.getItem("purchasetype");
  const [ispaymentdone, setIspaymentdone] = useState(false);
  const [paymentid, setPaymentid] = useState("");
  const [time, setTime] = useState();

  useEffect(() => {
    //new code
    // const username = "rzp_test_aYcsvr0L9Xha5Z";
    // const password = "5H0j9VKzcderM2Q9wpZKSJYP";

    // this one

            // fetch("https://api.razorpay.com/v1/orders", {
            //   method: "POST",
            //   // mode: "no-cors",
            //   credentials: 'omit',
            //   headers: {
            //     "Content-Type": "application/json",
            //     Authorization: "Basic "+window.btoa(`${username}:${password}`),
            //     // "Access-Control-Allow-Origin":"http://localhost:3000"
            //     // Accept: "application/json",
            //     // credentials: 'same-origin',
            //     // "Cache-Control": "no-cache",
            //     // Host: "api.razorpay.com"
            //   },
            //   body: {
            //     "amount": 50000,
            //     "currency": "INR",
            //     "receipt": "rcptid_11",
            //     "partial_payment": true
            // }
            // })
            //   .then(response => {
            //     console.log(response)
            //     response.json()
            //   })

    //

    // var instance = new Razorpay({
    //   key_id: "rzp_test_aYcsvr0L9Xha5Z",
    //   key_secret: "5H0j9VKzcderM2Q9wpZKSJYP",
    // });

    // instance.orders.create({
    //   amount: 50000,
    //   currency: "INR",
    //   receipt: "receipt#1",
    //   notes: {
    //     key1: "value3",
    //     key2: "value2",
    //   },
    // },(res)=>{
    //   console.log(res)
    // });
    // console.log(instance)
    //

    const db = firebase.firestore();
    db.collection("User")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snap) => {
        // console.log("getting user data", snap.data());
        setFirstname(snap.data().name);
        setEmail(snap.data().email);
        setMobileno(snap.data().phoneNumber);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // real key: rzp_live_IEsWDdFa3JsOCz
  // test key: rzp_test_aYcsvr0L9Xha5Z
  function openCheckout() {
    let options = {
      // real key: rzp_live_IEsWDdFa3JsOCz
      // test key: rzp_test_aYcsvr0L9Xha5Z  
      key: "rzp_live_IEsWDdFa3JsOCz",
      amount: "100", // 2000 paise = INR 20, amount in paisa
      name: "IITEENS",
      description: `This Purchase is for ${purchasetype} course`,
      image: logo,
      handler: function (response) {
        console.log(response);
        const db = firebase.firestore();
        db.collection("User")
          .doc(firebase.auth().currentUser.uid)
          .collection("Purchase")
          .add({
            razorpay_payment_id: response.razorpay_payment_id,
            name: firstname,
            email: Email,
            mobileno: mobileno,
            purchasetype: purchasetype,
            Time: new Date(),
          })
          .then(() => {
            console.log("payment saved to database");
          })
          .catch((err) => {
            console.log(err.message);
          });
        setTime(new Date().toString());
        setIspaymentdone(true);
        setPaymentid(response.razorpay_payment_id);
        // alert(response.razorpay_payment_id);
      },
      prefill: {
        name: firstname,
        email: Email,
        contact: mobileno,
      },
      notes: {
        address: "Hello World",
      },
      theme: {
        color: "#498E9C",
      },
    };

    let rzp = new window.Razorpay(options);
    rzp.open();
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "84.8vh",
        flexDirection: "column",
      }}
    >
      {!ispaymentdone ? (
        <>
          <div style={{ fontSize: "40px", marginBottom: "60px" }}>
            You have selected JEE({sessionStorage.getItem("purchasetype")}) Test
            Series for Purchase
          </div>
          <Button onClick={openCheckout}>Pay Now</Button>
        </>
      ) : (
        <div>
          <div
            style={{
              marginBotton: "40px",
              color: `${paymentid != undefined ? "green" : "red"}`,
              fontSize: "30px",
            }}
          >
            Your Payment {paymentid != undefined ? "was Successful" : "Failed"}{" "}
          </div>
          {paymentid != undefined && (
            <>
              <div>Razorpay Transaction Id: {paymentid}</div>
              <div>Transaction Amount: {"349"}</div>
              <div>Transaction Time: {time}</div>
              <div>Course purchased: {purchasetype}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RazorpayButton2;
