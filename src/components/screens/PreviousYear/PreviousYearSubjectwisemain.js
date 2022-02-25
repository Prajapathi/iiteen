import "../../../styles/MockTestMain.css";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const PreviousYearSubjectwisemain = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}
      className="screen"
      id="mocktest"
    >
      <h1 id="mocktestmainbuttonh1">Select Class</h1>
      <Button
        className="mocktestmainbutton"
        component={Link}
        to={{ pathname: "/previousyear",state:{class:"11"} }}
        onClick={()=>{
            sessionStorage.setItem("class","11")
        }}
      >
        Class 11
      </Button>
      <Button
        className="mocktestmainbutton"
        component={Link}
        to={{ pathname: "/previousyear",state:{class:"12"} }}
        onClick={()=>{
            sessionStorage.setItem("class","12")
        }}
      >
        Class 12
      </Button>
    </div>
  );
};

export default PreviousYearSubjectwisemain;
