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
        snap.docs.map((doc)=>{
          if(doc.data().purchasetype=="Mains"){
            let arr=[...paymentstat]
            arr.push(1)
            setPaymentstat(arr)
          }
          if(doc.data().purchasetype=="Mains+Advance"){
            let arr=[...paymentstat]
            arr.push(2)
            setPaymentstat(arr)
          }
        })
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(paymentstat)
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
      {/* {paymentstat.length==0?<img
        src={cart}
        alt=""
        style={{ height: "250px", marginBottom: "25px" }}
      />:
      <>
      {paymentstat.includes(1) &&
      <>
      <div
        style={{
          marginRight: "45px",
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
        <div className="plans-button">
          <Button className="plans-individual-button">
            Check Schedule and Syllabus
          </Button>
          <Link className="plans-individual-button"
          // component={Link}
          to={{
           pathname: "/payment",
           state:{
            type:"Mains"
          }
         }}
         onClick={()=>{
          sessionStorage.setItem("purchasetype","Mains")
        }}
          >
            <span style={{ textDecoration: "line-through" }}>3499</span> 349/-
            Rs Year
          </Link>
        </div>
      </div>
      </>
      }
      {paymentstat.includes(2) && 
      <>
      <div style={{}} className="plans-card">
        <div className="plans-heading">JEE(Mains+Advance) Test Series</div>
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
        <div className="plans-button">
          <Button className="plans-individual-button" >
            Check Schedule and Syllabus
          </Button>
          <Link className="plans-individual-button"
          // component={Link}
          to={{
           pathname: "/payment",
           state:{
             type:"Mains+Advance"
           }
           
         }}
         onClick={()=>{
          sessionStorage.setItem("purchasetype","Mains+Advance")
        }}
          >
            <span style={{ textDecoration: "line-through" }}>3499</span> 349/-
            Rs Year
          </Link>
        </div>
      </div>
      </>
      }
      </>
      } */}
      <img
        src={cart}
        alt=""
        style={{ height: "150px", marginBottom: "45px" }}
      />
      
      <div style={{ fontSize: "28px" }}>Nothing to show</div>
      <div style={{ fontSize: "16px", marginTop: "10px" }}>
        Your Cart Is Empty
      </div>
      <Button
        component={Link}
        to={{
          pathname: "/plans",
        }}
        className="plans-individual-button"
        style={{ marginTop: "45px" }}
      >
        Purchase Now
      </Button>
    </div>
  );
};

export default Cart;
