import "../../../styles/MockTestMain.css";
import React from "react";
import {Link} from "react-router-dom";
import { Button } from "@material-ui/core";

const MockTestMain = () => {
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
      <h1 id="mocktestmainbuttonh1">Select Paper Type</h1>
      <Button className="mocktestmainbutton" component={Link} to={{pathname:"/MockTest/mains"}}>Mains</Button>
      <Button className="mocktestmainbutton" component={Link} to={{pathname:"/MockTest/advance"}}>Advance</Button>
    </div>
  );
};

export default MockTestMain;
