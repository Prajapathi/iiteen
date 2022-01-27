import React, { useCallback, useEffect, useState } from "react";
import { Button, MenuItem, TextField } from "@material-ui/core";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";
import firebase from "firebase";
import { useParams,Link } from "react-router-dom";


const AdvancePattern = () => {
  const [noofsec, setNoofsec] = useState(0);
  const [section, setSection] = useState([]);
  const params=useParams();
  const createsec = (value) => {
    console.log(section);
    let i = section.length;
    const arr = [...section];
    if (value > i) {
      for (; i < value; i++) {
        arr.push({ type: "singletype", noofques: 0 });
      }
    } else {
      for (; i > value; i--) {
        arr.pop();
      }
    }
    setSection(arr);
    console.log(arr);
  };

  useEffect(() => {
    setSection(JSON.parse(localStorage.getItem("section")));
  }, []);

  useEffect(() => {
    localStorage.setItem("section", JSON.stringify(section));
  }, [section]);

  const dotypechange = (value, ind) => {
    const arr = [...section];
    arr[ind].type = value;
    setSection(arr);
  };
  const doquesnochange = (value, ind) => {
    const arr = [...section];
    arr[ind].noofques = value;
    setSection(arr);
  };

  const savetodatabase=()=>{
    const db = firebase.firestore();
    db.collection("MOCK")
      .doc("ADVANCE")
      .collection("PAPER")
      .doc(`PAPER${Number(params.number) + 1}`)
      .update({
        sections:section
      })
      .then(() => {
        console.log("saved");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "100px",
        height: "650px",
      }}
    >
      <h3>Enter Details</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          width: "1000px",
          margin: "60px",
        }}
      >
        <h5 style={{ marginBottom: "0px" }}>Enter no. of Sections</h5>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          value={section?section.length:0}
          style={{ marginLeft: "50px" }}
          onChange={(e) => {
            createsec(e.target.value);
            // setNoofsec(e.target.value);
          }}
        />
      </div>
      <div>
        {console.log(section)}
        {section &&
          section.map((e, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
                width: "1000px",
              }}
              key={index}
            >
              <h5>Section {index + 1}:</h5>
              <div
                style={{
                  width: "700px",
                  border: "1px solid black",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <TextField
                  id="standard-number"
                  select
                  label="type:"
                  value={e.type}
                  style={{ width: "200px", marginRight: "20px" }}
                  onChange={(event) => {
                    dotypechange(event.target.value, index);
                  }}
                >
                  <MenuItem value="singletype">Single correct type</MenuItem>
                  <MenuItem value="multipletype">
                    Multiple correct type
                  </MenuItem>
                  <MenuItem value="integertype">Integer type</MenuItem>
                  <MenuItem value="numericaltype">Numerical type</MenuItem>
                </TextField>
                <TextField
                  id="outlined-number"
                  label="no of questions:"
                  type="number"
                  value={e.noofques}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    doquesnochange(e.target.value, index);
                  }}
                />
              </div>
            </div>
          ))}
      </div>
      <Button
        className={styl.syllabusbutton}
        style={{
          marginTop: "auto",
          backgroundColor: "#5c5c5c",
          color: "white",
        }}
        onClick={()=>{
          savetodatabase()
        }}
        component={Link}
        to={{
          pathname:`/mocktestadminmain/advance/syllabussummary/${params.number}`
        }}
      >
        Proceed
      </Button>
    </div>
  );
};

export default AdvancePattern;
