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

function calculatetotalmarks(section) {
  let tm = 0;
  let marksdistributiontype = 0;
  const markdistribution = [
    [3, 1, 0],
    [4, 2, 0],
    [4, 0, 0],
    [2, 0, 0],
  ];
  section &&
    section.map((item, i) => {
      // console.log("hello")
      marksdistributiontype =
        item.type == "singletype"
          ? 0
          : item.type == "multipletype"
          ? 1
          : item.type == "integertype"
          ? 2
          : 3;
      // console.log(marksdistributiontype)
      tm += Number(item.noofques) * markdistribution[marksdistributiontype][0];
    });
  console.log(3 * tm);
  return 3 * tm;
}

function savetodatabase(
  paperno,
  mainpaptyp,
  section,
  totalquestions,
  noofquesset
) {
  const db = firebase.firestore();
  console.log(mainpaptyp);
  const paperref = db
    .collection(mainpaptyp.toUpperCase())
    .doc("ADVANCE")
    .collection("PAPER")
    .doc(`PAPER${paperno}`);
  const instructionInfo = [
    {
      data: `${
        totalquestions / 3
      } questions each for Physics, Chemistry and Maths`,
      section: 0,
      isLine: false,
    },
    {
      data: `Each Subject contains ${section.length} Parts: ${section.map(
        (item, index) => `Part ${String.fromCharCode(65 + index)}, `
      )}`,
      section: 0,
      isLine: false,
    },
    ...section.map((item, index) => ({
      data: `Part-${String.fromCharCode(65 + index)} contains ${
        item.noofques
      } ${
        item.type == "singletype"
          ? "multiple choice questions. Each Question have 4 choices (A),(B),(C),(D) out of which only ONE is correct"
          : item.type == "multipletype"
          ? "multiple choice questions. Each Question have 4 choices (A),(B),(C),(D) out of which ONE or more is/are correct"
          : item.type == "integertype"
          ? "integer type questions. The answer to each questions is a non-negative integer"
          : "numerical type questions. The answer to each questions is a numerical"
      }`,
      points:
        item.type == "singletype"
          ? [
              {
                data: "3 Marks for correct answer",
                color: 2,
              },
              {
                data: "1 negative mark for incorrect Answer",
                color: 1,
              },
              {
                data: "No Negative mark for Skipped Questions",
                color: 3,
              },
            ]
          : item.type == "multipletype"
          ? [
              {
                data: "4 Marks if all correct options are marked correct",
                color: 2,
              },
              {
                data: "3 mark ,if all 4 correct but only 3 are selected",
                color: 2,
              },
              {
                data: "2 mark ,if 3 or more are correct but only 2 are selected",
                color: 2,
              },
              {
                data: "1 mark ,if 2 or more are correct but only 1 is selected",
                color: 2,
              },
              {
                data: "2 Negative mark for incorrect combination of Answer marked",
                color: 1,
              },
              {
                data: "No Negative mark for Skipped Questions",
                color: 3,
              },
            ]
          : item.type == "integertype"
          ? [
              {
                data: "4 Marks for correct answer",
                color: 2,
              },
              {
                data: "No negative mark for incorrect Answer",
                color: 3,
              },
              {
                data: "No Negative mark for Skipped Questions",
                color: 3,
              },
            ]
          : [
              {
                data: "2 Marks for correct answer",
                color: 2,
              },
              {
                data: "No negative mark for incorrect Answer",
                color: 3,
              },
              {
                data: "No Negative mark for Skipped Questions",
                color: 3,
              },
            ],
      section:
        item.type == "singletype"
          ? 3
          : item.type == "multipletype"
          ? 4
          : item.type == "integertype"
          ? 1
          : 2,
      isLine: false,
    })),
  ];
  console.log(instructionInfo)
  paperref
    .update({
      syllabusCreated: true,
      noofques: totalquestions,
      noOfQuestions: totalquestions,
      instructionInfo:instructionInfo,
      totalMarks: calculatetotalmarks(section),
    })
    .then(() => {
      console.log("saved");
    })
    .catch((error) => {
      console.log(error.message);
    });
  for (let i = 1; i <= totalquestions; i++) {
    const p = totalquestions / 3;
    console.log(
      i,
      getanstypefromquestionno(i, section, totalquestions, noofquesset)
    );
    paperref.collection("question").add({
      question: "",
      answerType: getanstypefromquestionno(
        i,
        section,
        totalquestions,
        noofquesset
      ),
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
      subject: `${i >= 1 && i <= p ? 1 : i >= 1 + p && i <= 2 * p ? 2 : 3}`,
    });
  }
}

function getanstypefromquestionno(index, section, totalquestions, noofquesset) {
  console.log("h");
  let t = index % (totalquestions / 3);
  console.log(t, totalquestions);
  if (t == 0) {
    t = totalquestions / 3;
  }
  let arr = [...noofquesset];
  arr.push(totalquestions / 3);
  for (let i = 0; i < arr.length - 1; i++) {
    if (t >= 1 + arr[i] && t <= arr[i + 1]) {
      if (section[i].type == "singletype") {
        return "4";
      } else if (section[i].type == "multipletype") {
        return "5";
      } else if (section[i].type == "integertype") {
        return "1";
      } else return "2";
    }
  }
}

const Syllabussummaryadvance = (props) => {
  const params = useParams();
  const [section, setSection] = useState([]);
  const [noofquesset, setNoofquesset] = useState([]);
  const [mainpapertype, setMainpapertype] = React.useState("");
  const { type } = useParams();

  var paperindex = props.location
    ? props.location.state.paperindex
      ? props.location.state.paperindex
      : sessionStorage.getItem("paperindex")
    : null;

  useEffect(() => {
    if (type == "mocktest") {
      setMainpapertype("mock");
    } else setMainpapertype("aits");
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection(`${type == "mocktest" ? "MOCK" : "AITS"}`)
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
    let arr = [];
    let aggregate = 0;
    for (let i = 0; i < section.length; i++) {
      arr.push(aggregate);
      aggregate += Number(section[i].noofques);
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
                      <div key={index}>
                        {Number(noofquesset[index]) + 1}-
                        {Number(noofquesset[index]) + Number(item.noofques)} :{" "}
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
                      <div key={index}>
                        {totalquestions(section) +
                          Number(noofquesset[index]) +
                          1}
                        -
                        {totalquestions(section) +
                          Number(noofquesset[index]) +
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
                      <div key={index}>
                        {totalquestions(section) * 2 +
                          Number(noofquesset[index]) +
                          1}
                        -
                        {totalquestions(section) * 2 +
                          Number(noofquesset[index]) +
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
          Note: Once Clicked on Create {mainpapertype.toUpperCase()} Test you
          will not be able to change the syllabus again
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
              papernumber: Number(params.number) + 1,
              mainpapertype: mainpapertype,
              paperindex: paperindex,
            },
          }}
          onClick={() => {
            savetodatabase(
              Number(params.number) + 1,
              mainpapertype,
              section,
              totalquestions(section) * 3,
              noofquesset
            );
          }}
        >
          Create {mainpapertype.toUpperCase()} TEST
        </Button>
      </div>
    </div>
  );
};

export default Syllabussummaryadvance;
