import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Plans.css";

const Plans = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "84.8vh",
      }}
    >
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
    </div>
  );
};

export default Plans;
