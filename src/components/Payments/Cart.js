import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import cart from "../../assets/images/carts.png";
import { Link } from "react-router-dom";
import "../../styles/Plans.css";
import firebase from "firebase";

const Cart = () => {
  const [paymentstat, setPaymentstat] = useState([]);
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("User")
      .doc(firebase.auth().currentUser.uid)
      .collection("Purchase")
      .get()
      .then((snap) => {
        console.log(snap.docs);
        setPaymentstat(
          snap.docs.map((doc) => (doc.data().purchasetype))
        )
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(paymentstat);
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
      {paymentstat.length == 0 ? (
        <>
        <img
        src={cart}
        alt=""
        style={{ height: "150px", marginBottom: "45px", marginRight: "28px" }}
      />

      <div style={{ fontSize: "28px" }}>Nothing to show</div>
      <div style={{ fontSize: "16px", marginTop: "10px" }}>
        Your Cart Is Empty
      </div>
        </>

        
      ) : (
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          {paymentstat.includes("Mains") && (
            <>
              <div
                style={{
                  margin: "22px 40px",
                }}
                className="plans-card"
              >
                <div className="plans-heading">JEE(Mains) Test Series</div>
                <div className="plans-subheading">
                  <div>
                    All India Test Series:
                    <br />
                    Subjectwise Tests:
                    <br />
                    Previous Year Tests:
                  </div>
                  <div>
                    Total 25+ AITS
                    <br />
                    Total 4000+ Questions
                    <br />
                    15 Years+ Previous papers
                  </div>
                </div>
                <div style={{color:"green"}}>You have purchased this course</div>
                <div className="plans-button">
                  <Button className="plans-individual-button">
                    Check Schedule and Syllabus
                  </Button>
                </div>
              </div>
            </>
          )}
          {paymentstat.includes("Mains+Advance") && (
            <>
              <div style={{}} className="plans-card">
                <div className="plans-heading">
                  JEE(Mains+Advance) Test Series
                </div>
                <div className="plans-subheading">
                  <div>
                    All India Test Series:
                    <br />
                    Subjectwise Tests:
                    <br />
                    Previous Year Tests:
                  </div>
                  <div>
                    Total 25+ AITS
                    <br />
                    Total 4000+ Questions
                    <br />
                    15 Years+ Previous papers
                  </div>
                </div>
                <div style={{color:"green"}}>You have purchased this course</div>
                <div className="plans-button">
                  <Button className="plans-individual-button">
                    Check Schedule and Syllabus
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {/* <img
        src={cart}
        alt=""
        style={{ height: "150px", marginBottom: "45px", marginRight: "28px" }}
      />

      <div style={{ fontSize: "28px" }}>Nothing to show</div>
      <div style={{ fontSize: "16px", marginTop: "10px" }}>
        Your Cart Is Empty
      </div> */}
      <Button
        component={Link}
        to={{
          pathname: "/plans",
          state:{
            paymentstat:paymentstat
          }
        }}
        className="plans-individual-button"
        style={{ marginTop: "45px" }}
      >
        {paymentstat.length == 0 ? "Purchase Now" : "See other courses"}
      </Button>
    </div>
  );
};

export default Cart;
