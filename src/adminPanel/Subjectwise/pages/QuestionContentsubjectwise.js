import { MenuItem, TextField, Button, Switch, IconButton } from "@material-ui/core";
import React, { useEffect, useState, useRef, useParams } from "react";
import Syllabus from "../components/data/syllabus";
// import { db } from "../components/firebase";
import firebase from "firebase";
import PaperContent from "../components/PaperContent";
import SetQuestion from "../components/SetQuestionsubjectwise";
import Latex from "react-latex-next";
import { Container, Row, Col } from "react-bootstrap";
import "../components/css/myCss.css";
import { Route, Router } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import { borderRadius } from "@mui/system";
import Divider from '@mui/material/Divider';

const QuestionContentsubjectwise = (props) => {
  const [chapter, setChapter] = useState("");
  const [Class, setClass] = useState("");
  const [allQuestions, setAllQuestions] = useState("");
  const [editBtn, setEditBtn] = useState(false);
  const [questionNo, setQuestionNo] = useState("1");
  const [Id, setId] = useState("0");
  const [sub, setSub] = useState(null);
  const history = useHistory();
  const [level,setLevel]=useState("")

  function SetQuestionBtn(no, id) {
    setQuestionNo(no);
    setId(id);
    setEditBtn(true);
    console.log(Id, questionNo, editBtn);
  }
  var index = props.match.params.subject;
  var mockpaperno = props.location.state
    ? props.location.state.papernumber
    : null;
  var mainpapertype = props.location.state
    ? props.location.state.mainpapertype
    : null;
    var paperindex = props.location.state
    ? props.location.state.paperindex?props.location.state.paperindex
    : sessionStorage.getItem("paperindex"):null;

    console.log(props.location)

  window.onpopstate = function (e) {
    // console.log("yes i got called",window.location.pathname.charAt(1),localStorage.getItem("count"),index)
    //new code
    if (
      index == 3 &&
      localStorage.getItem("count") === "1" &&
      window.location.pathname.charAt(1) == "m"
    ) {
      // console.log("inside count 1 index 3")
      history.push(`/admin/${mainpapertype}test/main`);
    } else if (
      index == 4 &&
      localStorage.getItem("count") === "1" &&
      window.location.pathname.charAt(1) == "m"
    ) {
      // console.log("inside count 1 index 4")
      history.push(`/admin/${mainpapertype}test/main`);
    }
    //
    else if (
      index == 3 &&
      localStorage.getItem("count") == null &&
      window.location.pathname.charAt(1) != "P"
    ) {
      // console.log("inside count null index 3")
      localStorage.setItem("count", 1);
      history.push(`/admin/${mainpapertype}test/main/mains`);
    } else if (
      index == 4 &&
      localStorage.getItem("count") == null &&
      window.location.pathname.charAt(1) != "P"
    ) {
      // console.log("inside count null index 4")
      localStorage.setItem("count", 1);
      history.push(`/admin/${mainpapertype}test/main/advance`);
    }
  };
  const subj = ["Physics", "Chemistry", "Maths"];

  useEffect(() => {
    if (index == 0) {
      // console.log("yes");
      // console.log(sub);
      setSub("Physics");
      // console.log(sub);
    } else if (index == 1) {
      console.log("chemistry");
      setSub("Chemistry");
    } else if (index == 2) {
      setSub("Maths");
    } else if (index == 3) {
      setSub("mocktest");
      fetchPaper("", "MAINS");
    } else {
      setSub("mocktestadvance");
      fetchPaper("", "ADVANCE");
    }
  }, [index]);

  useEffect(() => {
    localStorage.removeItem("count");
    if (
      localStorage.getItem("Class") !== null &&
      index !== "3" &&
      index !== "4"
    ) {
      setClass(localStorage.getItem("Class"));
      setChapter(localStorage.getItem("chapter"));
      setLevel(localStorage.getItem("Level"))
      console.log(
        "class",
        localStorage.getItem("Class"),
        localStorage.getItem("chapter"),
        localStorage.getItem("Level"),
        toString(localStorage.getItem("Level"))
      );
      fetchPaper(
        localStorage.getItem("Class"),
        localStorage.getItem("chapter"),
        localStorage.getItem("Level")
      );
    }
  }, []);

  useEffect(()=>{
    console.log(level)
  },[level])

  // useEffect(() => {
  //   if (index == 3 || index == 4) {
  //     const db = firebase.firestore();
  //     db.collection(mainpapertype.toUpperCase())
  //       .doc("ADVANCE")
  //       .collection("PAPER")
  //       .doc(`PAPER${Number(mockpaperno)}`)
  //       .get()
  //       .then((snap) => {
  //         if (snap.exists) {
  //           console.log(snap.data());
  //           console.log(snap.data().sections);
  //           setSection(snap.data().sections);
  //         }
  //       });
  //   }
  // }, []);

  // console.log(section);

  // useEffect(() => {
  //   console.log(section)
  //   let arr = [];
  //   let aggregate = 0;
  //   section && section.map((item,index)=>{
  //     arr.push(aggregate)
  //     aggregate+=Number(section[index].noofques)
  //   })
  //   setTotalquestionpersub(aggregate)
  //   setNoofquesset(arr);
  //   console.log(aggregate,arr)
  // }, [section]);


  function fetchPaper(selClass, selChapter,selLevel) {
    const db = firebase.firestore();
    console.log(sub, selClass, selChapter,selLevel);
    db.collection("SUBJECTWISE")
        .doc(selClass)
        .collection(subj[index])
        .doc(selChapter)
        .collection(`Level 0${selLevel}`).orderBy("number").onSnapshot(function (querySnapshot) {
      var array = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        year: doc.data().year,
        questions: doc.data().question,
        quesno: doc.data().number,
      }));
      array.sort((a, b) => {
        return a.quesno - b.quesno;
      });
      setAllQuestions(array);
    });

  }

  function deleteQuestion(id, questno) {
    //sure want to delete yes or no
    //if yes then delete
    //if no then do nothing
    if (window.confirm("Are you sure want to delete this question?")) {
      const db = firebase.firestore();
        var q = db
          .collection("SUBJECTWISE")
          .doc(Class)
          .collection(subj[index])
          .doc(chapter);
      q.set(
        { noofques: firebase.firestore.FieldValue.increment(-1) },
        { merge: true }
      );
      q.collection(`Level 0${level}`)
        .doc(id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    } else {
      console.log("not deleted");
    }
  }
  console.log("all question",allQuestions)

  return (
    <div>
      <Container
        className="shadow-card"
        style={{ marginTop: "50px", textAlign: "center" }}
      >
        {sub !== "mocktest" && sub !== "mocktestadvance" && (
          <>
            <h4>Select Portions</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              <TextField
                id="standard-number"
                select
                label="Select Class"
                value={Class}
                style={{ width: "140px", marginRight: "20px" }}
                onChange={(event) => {
                  setClass(event.target.value);
                  localStorage.setItem("Class", event.target.value);
                }}
              >
                <MenuItem value="Class 11">Class 11</MenuItem>
                <MenuItem value="Class 12">Class 12</MenuItem>
              </TextField>

              <TextField
                id="standard-number"
                select
                label="Chapter Name"
                value={chapter}
                style={{ width: "250px", marginRight: "20px" }}
                onChange={(event) => {
                  setChapter(event.target.value);
                  localStorage.setItem("chapter", event.target.value);
                }}
              >
                {Class === "Class 11" ? (
                  Syllabus[index].class11 &&
                  Syllabus[index].class11.map((e, index) => {
                    var { value, chapter } = e;
                    return (
                      <MenuItem value={value} key={index}>
                        {chapter}
                      </MenuItem>
                    );
                  })
                ) : Class === "Class 12" ? (
                  Syllabus[index].class12 &&
                  Syllabus[index].class12.map((e, index) => {
                    var { value, chapter } = e;
                    return (
                      <MenuItem value={value} key={index}>
                        {chapter}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value={""}>Select Class</MenuItem>
                )}
              </TextField>
              {console.log(level)}
              <TextField
                id="standard-number"
                select
                label="Select Level"
                value={level}
                style={{ width: "140px", marginRight: "20px" }}
                onChange={(event) => {
                  setLevel(event.target.value);
                  localStorage.setItem("Level", event.target.value);
                }}
              >
                <MenuItem value="1">Level 01</MenuItem>
                <MenuItem value="2">Level 02</MenuItem>
                <MenuItem value="3">Level 03</MenuItem>
              </TextField>
              <Button
                id="getquestions"
                className="shadow-btn"
                style={{ marginTop: "5px" }}
                onClick={() => {
                  fetchPaper(Class, chapter,level);
                }}

                // ref={selfRef}
              >
                next
              </Button>
              {/* )} */}
            </div>
          </>
        )}
      </Container>

      {!(sub === "mocktest" || sub === "mocktestadvance") && (
      <Container style={{ marginTop: "35px" }}>
        {allQuestions !== "" && (
          <div>
            <Row>
              <Col>
                {" "}
                <h4>Total Questions: {allQuestions.length}</h4>
              </Col>

              <Col>
                {" "}
                <Button
                  className="shadow-btn"
                  onClick={() => {
                    setQuestionNo(allQuestions.length + 1);
                    // alert(questionNo);
                  }}
                  style={{ marginLeft: "300px", textDecoration: "none" }}
                  component={Link}
                  to={{
                    pathname: "/Subjectwise/setQuestionsubjectwise",
                    state: {
                      Class: Class,
                      Subject: sub,
                      Chapter: chapter,
                      Level:level,
                      QuestionNo: allQuestions.length + 1,
                      mockpaperno: mockpaperno,
                      mainpapertype: mainpapertype,
                      // allQuestions: allQuestions,
                      // setQuestionNo:setQuestionNo,
                    },
                  }}
                >
                 
                  Add New Question
                  {/* </Link> */}
                </Button>{" "}
              </Col>
            </Row>
            {console.log("allquestions", allQuestions)}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {allQuestions.map((e, index) => {
                var { id, yr, questions } = e;
                // console.log("year", allQuestions[index].year);
                console.log(id)
                return (
                  <div
                    className="shadow-card"
                    style={{
                      margin: "15px",
                      position: "relative",
                      width: "340px",
                      // minHeight:"260px"
                      height: "300px",
                    }}
                    key={index}
                  >
                    <h4>Question No: {index + 1} </h4>
                    <span />
                    <div
                      style={{
                        // wordWrap: "break-word",
                        height: "180px",
                        overflow: "hidden",
                      }}
                    >
                      {/* {console.log(questions)} */}
                      {questions !== "" ? (
                        questions.map((e, index) => {
                          var { data, type } = e;
                          const LaTeX = "$" + data + "$ ";
                          return (
                            <div style={{ display: "inline" }} key={index}>
                              {/* {console.log(data)} */}
                              {type == "1" ? (
                                <text style={{ textOverflow: "ellipsis" }}>
                                  {data}{" "}
                                </text>
                              ) : type == "2" ? (
                                <Latex>{LaTeX}</Latex>
                              ) : type == "3" ? (
                                <div>
                                  <img
                                    src={data}
                                    alt="img"
                                    style={{
                                      display: "block",
                                      marginLeft: "auto",
                                      marginRight: "auto",
                                      height: "100px",
                                      marginTop: "10px",
                                    }}
                                  />
                                </div>
                              ) : (
                                <div>
                                  <br />
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                    <div
                      style={{
                        position: "relative",
                        height: "30px",
                        position: "absolute",
                        bottom: "14px",
                      }}
                    >
                      <Button
                        className="shadow-btn"
                        component={Link}
                        to={{
                          pathname: "/Subjectwise/setQuestionsubjectwise",
                          state: {
                            id: id,
                            Class: Class,
                            Subject: sub,
                            Chapter: chapter,
                            Level:level,
                            QuestionNo: index + 1,
                            mockpaperno: mockpaperno,
                            mainpapertype: mainpapertype,
                            
                          },
                        }}
                        style={{
                          marginTop: "19px",
                          position: "absolute",
                          backgroundColor: "white",
                          bottom: "0px",
                          left: "0px",
                          color: "blue",
                        }}
                        onClick={() => {
                          return SetQuestionBtn(index + 1, id);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        className="shadow-btn"
                        style={{
                          marginTop: "19px",
                          backgroundColor: "white",
                          color: "red",
                          position: "absolute",
                          bottom: "0px",
                          left: "80px",
                        }}
                        onClick={async () => {
                          await deleteQuestion(id, index + 1);
                          // console.log("idarray", idarr);
                          // setIdarray(idarr)
                          // const db = firebase.firestore();
                          // for(let i=0;i<idarr.length;i++){
                          //   console.log(idarr[i]);
                          //   db.collection("PYSV")
                          //     .doc(Class)
                          //     .collection(subj[index])
                          //     .doc(chapter)
                          //     .collection("question")
                          //     .doc(idarray[i])
                          //     .update({ number: "1" });
                          // }
                          // updateDB(idarr);
                          console.log("it is getting clicked");
                        }}
                      >
                        Delete
                      </Button>
                      {/* </Col> */}

                      <div
                        style={{
                          textAlign: "right",
                          position: "absolute",
                          bottom: "0px",
                          left: "270px",
                        }}
                      >
                        {allQuestions[index].year}
                      </div>
                      {/* </Row> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Container>
       )}
    </div>
  );
};

export default QuestionContentsubjectwise;
