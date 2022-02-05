import { MenuItem, TextField } from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";

const Advance = () => {
  const [paper, setPaper] = useState([]);
  const [mainpapertype, setMainpapertype] = useState("");
  const { type } = useParams();
  const [editable, setEditable] = useState(false);
  const [size, setSize] = useState(0);
  const [shift, setShift] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    if (type == "mocktest") {
      setMainpapertype("mock");
    } else setMainpapertype("aits");
  }, []);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(false);
    }
    setEditable(arr);
  }, [size]);

  useEffect(() => {
    localStorage.removeItem("syllabustype");
    const db = firebase.firestore();
    db.collection(`${type == "mocktest" ? "MOCK" : "AITS"}`)
      .doc("ADVANCE")
      .collection("PAPER")
      .orderBy("number")
      .onSnapshot(function (snap) {
        console.log(snap.docs);
        setPaper(
          snap.docs.map((doc) => ({
            number: doc.data().number,
            syllabusCreated: doc.data().syllabusCreated,
            noofques: doc.data().noofques,
            date: doc.data().date,
            shift: doc.data().shift,
          }))
        );
        console.log(snap.docs.length);
        setSize(snap.docs.length);
      });
  }, []);

  function CreateNewPaper() {
    console.log(paper);
    const db = firebase.firestore();
    db.collection(mainpapertype.toUpperCase())
      .doc("ADVANCE")
      .collection("PAPER")
      .doc(`PAPER${paper.length + 1}`)
      .set({
        exist: true,
        number: paper.length + 1,
        syllabusSelected: false,
        syllabusCreated: false,
      })
      .then(() => {
        console.log("saved");
      })
      .catch((error) => {
        console.log(error.message());
      });
  }
  function setEdit(index) {
    let temp = [...editable];
    temp[index] = !temp[index];
    setEditable(temp);
  }
  const savetodatabase = (index) => {
    const db = firebase.firestore();
    db.collection(mainpapertype.toUpperCase())
      .doc("ADVANCE")
      .collection("PAPER")
      .doc(`PAPER${index + 1}`)
      .update({
        date: date,
        shift: shift,
      });
  };
  return (
    <div>
      <div
        style={{
          marginTop: "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "rgb(88, 88, 88)",
        }}
      >
        <h1>Advance Paper Type</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "1100px",
            flexWrap: "wrap",
          }}
        >
          {paper.map((p, index) => (
            <div
              style={{
                width: "300px",
                margin: "30px",
              }}
            >
              <Link
                to={{
                  pathname: `${
                    p.syllabusCreated
                      ? "/PreviousYearSubjectwise/4"
                      : `/admin/${mainpapertype}testadmin/main/advance/selectsyllabus/${
                          p.number - 1
                        }`
                  }`,
                  state: {
                    papernumber: Number(p.number),
                    mainpapertype: mainpapertype,
                  },
                }}
              >
                <div
                  className={styl.subjects}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h4>Advance Paper {p.number}</h4>
                  <h6>No. of Questions :{p.noofques ? p.noofques : "0"}</h6>
                  {mainpapertype == "aits" ? (
                    <div style={{ display: "flex",alignItems:"baseline" }}>
                      {!editable[index] ? (
                        <div style={{ color: "blue", fontSize: "13px" }}>
                          Date: {p.date ? p.date : 0} | Time:
                          {p.shift ? p.shift : 0}
                          {/* <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setEdit(index);
                          }}
                        >
                          change
                        </button> */}
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "baseline",
                            fontSize: "14px",
                          }}
                        >
                          <TextField
                            id="datetime-local"
                            label="Date and time"
                            type="date"
                            sx={{
                              width: "50%",
                              height: "50%",
                              fontSize: "14px",
                            }}
                            // className={classes.textField}
                            // InputLabelProps={{
                            //   shrink: true,
                            // }}
                            InputProps={{ style: { fontSize: 12, height: 18 } }}
                            InputLabelProps={{ style: { fontSize: 12 } }}
                            style={{ width: "110px", marginRight: "10px" }}
                            value={!editable[index] ? p.date : date}
                            onChange={(e) => {
                              setDate(e.target.value);
                              console.log(e.target.value);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          />
                          <TextField
                            id="standard-number"
                            InputProps={{ style: { fontSize: 12, height: 18 } }}
                            InputLabelProps={{ style: { fontSize: 12 } }}
                            select
                            label="slot"
                            value={!editable[index] ? p.shift : shift}
                            style={{ width: "90px" }}
                            onChange={(event) => {
                              setShift(event.target.value);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <MenuItem value={"shift1"}>shift 1(9-12)</MenuItem>
                            <MenuItem value={"shift2"}>shift 2(1-4)</MenuItem>
                          </TextField>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          console.log("hello");
                          e.stopPropagation();
                          e.preventDefault();
                          if (editable[index]) savetodatabase(index);
                          else {
                            setDate(p.date);
                            setShift(p.shift);
                          }
                          setEdit(index);
                          console.log(editable);
                        }}
                        style={{
                          fontSize: "13px",
                          backgroundColor: "grey",
                          color: "white",
                          border: "1px solid grey",
                          borderRadius: "5px",
                          marginLeft: "5px",
                          height:"20px"
                        }}
                      >
                        {editable[index] ? "save" : "change"}
                      </button>
                    </div>
                  ) : null}
                </div>
              </Link>
            </div>
          ))}
          <div>
            <button className={styl.plusbutton} onClick={CreateNewPaper}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advance;
