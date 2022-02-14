import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";
import { Link, useParams } from "react-router-dom";
import firebase from "firebase";

function savetodatabase(paperno, mainpaptyp) {
  console.log(paperno, mainpaptyp);
  const db = firebase.firestore();
  const paperref = db
    .collection(mainpaptyp.toUpperCase())
    .doc("MAINS")
    .collection("PAPER")
    .doc(`PAPER${paperno}`);

  paperref
    .update({ syllabusCreated: true,noofques:90 })
    .then(() => {
      console.log("saved");
    })
    .catch((error) => {
      console.log(error.message);
    });
  for (let i = 1; i <= 90; i++) {
    paperref.collection("question").add({
      question: "",
      answerType: `${i % 30 >= 1 && i % 30 <= 20 ? "4" : "2"}`,
      option2: "",
      option1: "",
      option3: "",
      option4: "",
      answer: "",
      hint: "",
      solution: "",
      year: "",
      college: "",
      number: `${i}`,
      subject: `${i >= 1 && i <= 30 ? 1 : i >= 31 && i <= 60 ? 2 : 3}`,
    });
  }
}

const Syllabussummary = () => {
  const paperno = useParams();
  const [mainpapertype, setMainpapertype] = React.useState("");
  const { type } = useParams();

  useEffect(() => {
    if (type == "mocktest") {
      setMainpapertype("mock");
    } else setMainpapertype("aits");
  }, []);

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
                  1-30
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                >
                  1-20: single correct type <br /> 21-30: numerical type
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
                  31-60
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                >
                  31-50: single correct type <br /> 51-60: numerical type
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
                  61-90
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderLeft: "0.05rem solid #ebebeb" }}
                >
                  61-80: single correct type <br /> 81-90: numerical type
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <h6 style={{ color: "blue", fontSize: "14px", paddingTop: "20px" }}>
          Note: Once Clicked on Create {mainpapertype} Test you will not be able
          to change the syllabus again
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
            pathname: "/PreviousYearSubjectwise/3",
            state: {
              papernumber: Number(paperno.number) + 1,
              mainpapertype: mainpapertype,
            },
          }}
          onClick={() => {
            console.log(Number(paperno.number) + 1, mainpapertype);
            savetodatabase(Number(paperno.number) + 1, mainpapertype);
          }}
        >
          Create {mainpapertype.toUpperCase()} TEST
        </Button>
      </div>
    </div>
  );
};

export default Syllabussummary;
