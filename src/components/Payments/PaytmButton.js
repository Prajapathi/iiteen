import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/Plans.css";
import firebase from "firebase";
// import https from 'https'
// const PaytmChecksum = require("./PaytmChecksum");
import PaytmChecksum from "./PaytmChecksum";
const https = require("https");

export function PaytmButton(props) {
  const [paymentData, setPaymentData] = useState({
    token: "",
    order: "",
    mid: "SiOybm64637144897301",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [ispaymentdone, setIspaymentdone] = useState(false);
  const [paymentstat, setPaymentstat] = useState();
  const purchasetype = sessionStorage.getItem("purchasetype");

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    let orderId = "Order_" + new Date().getTime();

    // Sandbox Credentials
    let mid = "SiOybm64637144897301"; // Merchant ID
    let mkey = "jSA29JZ8KhYVGzL4"; // Merhcant Key
    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: mid,
      websiteName: "WEBSTAGING",
      orderId: orderId,
      callbackUrl: "https://merchant.com/callback",
      txnAmount: {
        value: 349,
        currency: "INR",
      },
      userInfo: {
        custId: "1001",
      },
    };

    PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      mkey
    ).then(function (checksum) {
      console.log(checksum);
      paytmParams.head = {
        signature: checksum,
      };

      var post_data = JSON.stringify(paytmParams);

      var options = {
        /* for Staging */
        hostname: "securegw-stage.paytm.in" /* for Production */,

        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });
        post_res.on("end", function () {
          console.log("Response: ", response);
          // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
          setPaymentData({
            ...paymentData,
            token: JSON.parse(response).body.txnToken,
            order: orderId,
            mid: mid,
            amount: 100,
          });
        });
      });

      post_req.write(post_data);
      post_req.end();
    });
  };

  const makePayment = () => {
    setLoading(true);
    var config = {
      root: "",
      style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#0FB8C9",
        themeColor: "#ffffff",
        headerBackgroundColor: "#284055",
        headerColor: "#ffffff",
        errorColor: "",
        successColor: "",
        card: {
          padding: "",
          backgroundColor: "",
        },
      },
      data: {
        orderId: paymentData.order,
        token: paymentData.token,
        tokenType: "TXN_TOKEN",
        amount: paymentData.amount /* update amount */,
      },
      payMode: {
        labels: {},
        filter: {
          exclude: [],
        },
        order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
      },
      website: "WEBSTAGING",
      flow: "DEFAULT",
      merchant: {
        mid: paymentData.mid,
        redirect: false,
      },
      handler: {
        transactionStatus: function transactionStatus(paymentStatus) {
          console.log("paymentStatus => ", paymentStatus);
          paymentStatus.purchasetype = purchasetype;
          setPaymentstat(paymentStatus);
          const db = firebase.firestore();
          db.collection("User")
            .doc(firebase.auth().currentUser.uid)
            .collection("Purchase")
            .add(paymentStatus)
            .then(() => {
              console.log("payment saved to database");
            })
            .catch((err) => {
              console.log(err.message);
            });
          setLoading(false);
          setIspaymentdone(true);
        },
        notifyMerchant: function notifyMerchant(eventName, data) {
          console.log("Closed");
          setLoading(false);
        },
      },
    };

    console.log("hello");
    if (window.Paytm && window.Paytm.CheckoutJS) {
      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          console.log("Before JS Checkout invoke");
          // after successfully update configuration invoke checkoutjs
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("Error => ", error);
        });
    }
  };

  console.log(props);

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
      {loading ? (
        <img
          src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
          alt=""
        />
      ) : !ispaymentdone ? (
        <>
          <div style={{ fontSize: "40px", marginBottom: "60px" }}>
            You have selected JEE({sessionStorage.getItem("purchasetype")}) Test
            Series for Purchase
          </div>
          <Button onClick={makePayment} className="plans-individual-button">
            Pay Now
          </Button>
        </>
      ) : (
        <div>
          <div
            style={{
              marginBotton: "40px",
              color: `${paymentstat.STATUS == "TXN_SUCCESS" ? "green" : "red"}`,
              fontSize: "30px",
            }}
          >
            Your Payment{" "}
            {paymentstat.STATUS == "TXN_SUCCESS" ? "was Successful" : "Failed"}{" "}
          </div>
          {paymentstat.STATUS == "TXN_SUCCESS" && (
            <>
              <div>Bank name: {paymentstat.BANKNAME}</div>
              <div>Bank Transaction Id: {paymentstat.BANKTXNID}</div>
              <div>Payment Mode: {paymentstat.PAYMENTMODE}</div>
              <div>Transaction Amount: {paymentstat.TXNAMOUNT}</div>
              <div>Transaction Time: {paymentstat.TXNDATE}</div>
              <div>Transaction Id: {paymentstat.TXNID}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
