import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";
import { Link, useParams } from "react-router-dom";

function savetodatabase(paperno,mainpaptyp) {
  const db = firebase.firestore();
  console.log(mainpaptyp)
  db.collection(mainpaptyp.toUpperCase())
    .doc("ADVANCE")
    .collection("PAPER")
    .doc(`PAPER${paperno}`)
    .update({ syllabusCreated: true })
    .then(() => {
      console.log("saved");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

const Syllabussummaryadvance = () => {
  const params = useParams();
  const [section, setSection] = useState([]);
  const [noofquesset, setNoofquesset] = useState([]);
  const [mainpapertype,setMainpapertype]=React.useState("");
  const {type}=useParams()

  useEffect(()=>{
    if(type=='mocktestadmin'){
      setMainpapertype("mock");
    }else setMainpapertype("aits")
  },[])

  useEffect(() => {
    const db = firebase.firestore();
    db.collection(`${type=='mocktest'?"MOCK":"AITS"}`)
      .doc("ADVANCE")
      .collection("PAPER")
      .doc(`PAPER${Number(params.number) + 1}`)
      .get()
      .then((snap) => {
        if (snap.exists) {
          console.log(snap.data());
          console.log(snap.data().sections);
          setSection(snap.data().sections);
        }
      });
  }, []);

  useEffect(() => {
    let arr=[];
    let aggregate=0;
    for(let i=0;i<section.length;i++){
      arr.push(aggregate);
      aggregate+=Number(section[i].noofques);
    }
    setNoofquesset(arr);
  }, [section]);

  function totalquestions(array) {
    let total = 0;
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      total += Number(array[i].noofques);
      console.log(Number(array[i].noofques));
    }
    return total;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "200px",
          paddingBottom: "70px",
          textTransform: "uppercase",
        }}
        className={styl.muitable}
      >
        <TableContainer component={Paper} style={{ width: "800px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  <b>{mainpapertype.toUpperCase()} PAPER PATTERN</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key="physics"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <b>Subjects</b>
                </TableCell>
                <TableCell
                  align="right"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                >
                  <b>Question No.</b>
                </TableCell>
                <TableCell
                  align="right"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                ></TableCell>
              </TableRow>
              <TableRow
                key="physics"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Physics
                </TableCell>
                <TableCell
                  align="right"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                >
                  {section && console.log(totalquestions(section))}
                  1-{totalquestions(section)}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                >
                  {console.log(noofquesset)}
                  {section.map((item, index) => {
                    return (
                      <div>
                        {Number(noofquesset[index]) + 1}
                        -
                        {Number(noofquesset[index]) +
                            Number(item.noofques)}{" "}
                        :{" "}
                        {item.type == "singletype"
                          ? "single correct type"
                          : item.type == "multipletype"
                          ? "multiple correct type"
                          : item.type == "integertype"
                          ? "integer type"
                          : "numerical type"}
                      </div>
                    );
                  })}
                </TableCell>
              </TableRow>
              <TableRow
                key="physics"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  chemistry
                </TableCell>
                <TableCell
                  align="right"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                >
                  {totalquestions(section) + 1}-{totalquestions(section) * 2}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                >
                  {/* 31-50: single correct type <br /> 51-60: numerical type */}
                  
                  {section.map((item, index) => {
                    return (
                      <div>
                        {totalquestions(section)+Number(noofquesset[index]) + 1}
                        -
                        {totalquestions(section)+Number(noofquesset[index]) +
                            Number(item.noofques)}{" "}
                        :{" "}
                        {item.type == "singletype"
                          ? "single correct type"
                          : item.type == "multipletype"
                          ? "multiple correct type"
                          : item.type == "integertype"
                          ? "integer type"
                          : "numerical type"}
                      </div>
                    );
                  })}
                </TableCell>
              </TableRow>
              <TableRow
                key="physics"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Maths
                </TableCell>
                <TableCell
                  align="right"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                >
                  {totalquestions(section) * 2 + 1}-
                  {totalquestions(section) * 3}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                >
                  {/* 61-80: single correct type <br /> 81-90: numerical type */}
                  {section.map((item, index) => {
                    return (
                      <div>
                        {totalquestions(section)*2+Number(noofquesset[index]) + 1}
                        -
                        {totalquestions(section)*2+Number(noofquesset[index]) +
                            Number(item.noofques)}{" "}
                        :{" "}
                        {item.type == "singletype"
                          ? "single correct type"
                          : item.type == "multipletype"
                          ? "multiple correct type"
                          : item.type == "integertype"
                          ? "integer type"
                          : "numerical type"}
                      </div>
                    );
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <h6 style={{ color: "blue", fontSize: "14px", paddingTop: "20px" }}>
          Note: Once Clicked on Create {mainpapertype.toUpperCase()} Test you will not be able to change
          the syllabus again
        </h6>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <Button
          style={{
            boxShadow: "0 7px 18px rgba(0, 0, 0, 0.192)",
            backgroundColor: "#5c5c5c",
            color: "white",
          }}
          component={Link}
          to={{
            pathname: "/PreviousYearSubjectwise/4",
            state: {
              papernumber: Number(params.number) + 1,mainpapertype:mainpapertype
            },
          }}
          onClick={() => {
            savetodatabase(Number(params.number) + 1,mainpapertype);
          }}
        >
          Create {mainpapertype.toUpperCase()} TEST
        </Button>
      </div>
    </div>
  );
};

export default Syllabussummaryadvance;
