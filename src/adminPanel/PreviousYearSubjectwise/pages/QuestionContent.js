import { MenuItem, TextField, Button, Switch } from "@material-ui/core";
import React, { useEffect, useState, useRef, useParams } from "react";
import Syllabus from "../components/data/syllabus";
// import { db } from "../components/firebase";
import firebase from "firebase";
import PaperContent from "../components/PaperContent";
import SetQuestion from "../components/SetQuestion";
import Latex from "react-latex-next";
import { Container, Row, Col } from "react-bootstrap";
import "../components/css/myCss.css";
import { Route, Router } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const QuestionContent = (props) => {
  const [chapter, setChapter] = useState("");
  const [Class, setClass] = useState("");
  const [allQuestions, setAllQuestions] = useState("");
  const [editBtn, setEditBtn] = useState(false);
  const [questionNo, setQuestionNo] = useState("1");
  const [Id, setId] = useState("0");
  const [sub, setSub] = useState(null);
  const history = useHistory();
  // const [idarray,setIdarray]=useState([]);
  // const selfRef = useRef();

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
  const subj = ["physics", "chemistry", "maths"];

  useEffect(() => {
    if (index == 0) {
      // console.log("yes");
      // console.log(sub);
      setSub("physics");
      // console.log(sub);
    } else if (index == 1) {
      console.log("chemistry");
      setSub("chemistry");
    } else if (index == 2) {
      setSub("maths");
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
      // let button = document.getElementById("getquestions");
      // if (button) {
      //   button.click();
      // }
      console.log(
        "class",
        localStorage.getItem("Class"),
        localStorage.getItem("chapter")
      );
      fetchPaper(
        localStorage.getItem("Class"),
        localStorage.getItem("chapter")
      );
      // selfRef.current.click();
    }
  }, []);

  function fetchPaper(selClass, selChapter) {
    const db = firebase.firestore();
    console.log(sub, selClass, selChapter);
    if (selClass === "") {
      var q = db
        .collection(mainpapertype.toUpperCase())
        .doc(selChapter)
        .collection("PAPER")
        .doc(`PAPER${Number(mockpaperno)}`)
        .collection("question");
    } else {
      var q = db
        .collection("PYSV")
        .doc(selClass)
        .collection(subj[index])
        .doc(selChapter)
        .collection("question");
    }
    q.orderBy("number").onSnapshot(function (querySnapshot) {
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

    console.log(allQuestions);
  }

  function deleteQuestion(id, questno) {
    //sure want to delete yes or no
    //if yes then delete
    //if no then do nothing
    if (window.confirm("Are you sure want to delete this question?")) {
      const db = firebase.firestore();
      if (sub == "mocktest" || sub == "mocktestadvance") {
        var q = db
          .collection(mainpapertype.toUpperCase())
          .doc(`${sub == "mocktest" ? "MAINS" : "ADVANCE"}`)
          .collection("PAPER")
          .doc(`PAPER${Number(mockpaperno)}`);
      } else {
        var q = db
          .collection("PYSV")
          .doc(Class)
          .collection(subj[index])
          .doc(chapter);
      }
      q.set(
        { noofques: firebase.firestore.FieldValue.increment(-1) },
        { merge: true }
      );
      q.collection("question")
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
                <MenuItem value="class11">Class 11</MenuItem>
                <MenuItem value="class12">Class 12</MenuItem>
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
                {Class === "class11" ? (
                  Syllabus[index].class11 &&
                  Syllabus[index].class11.map((e, index) => {
                    var { value, chapter } = e;
                    return (
                      <MenuItem value={value} key={index}>
                        {chapter}
                      </MenuItem>
                    );
                  })
                ) : Class === "class12" ? (
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
              {/* {Class !== "" && chapter !== "" && ( */}
              <Button
                id="getquestions"
                className="shadow-btn"
                style={{ marginTop: "5px" }}
                onClick={() => {
                  fetchPaper(Class, chapter);
                }}

                // ref={selfRef}
              >
                next
              </Button>
              {/* )} */}
            </div>
          </>
        )}
        {(sub === "mocktest" || sub === "mocktestadvance") && (
          <h1>{`${mainpapertype.toUpperCase()} TEST PAPER ${Number(mockpaperno)}`}</h1>
        )}
      </Container>

      {/* <PaperContent/> */}
      {/* {
          Class !== "" && chapter !== "" &&
          <SetQuestion Class= {Class} Chapter = {chapter} QuestionNumber={allQuestions.length + 1}/>
      } */}

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
                  style={{ marginLeft: "300px",textDecoration: "none" }}
                  component={Link}
                  to={{
                    pathname: "/PreviousYearSubjectwise/setQuestion",
                    state: {
                      Class: Class,
                      Subject: sub,
                      Chapter: chapter,
                      QuestionNo: allQuestions.length + 1,
                      mockpaperno: mockpaperno,
                      mainpapertype:mainpapertype
                      // allQuestions: allQuestions,
                      // setQuestionNo:setQuestionNo,
                    },
                  }}
                >
                  {/* <Link
                    to={{
                      pathname: "/PreviousYearSubjectwise/setQuestion",
                      state: {
                        Class: Class,
                        Subject: sub,
                        Chapter: chapter,
                        QuestionNo: allQuestions.length + 1,
                        mockpaperno: mockpaperno,
                        mainpapertype:mainpapertype
                        // allQuestions: allQuestions,
                        // setQuestionNo:setQuestionNo,
                      },
                    }}
                    style={{ textDecoration: "none" }}
                  > */}
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
                      {questions !== "" ? (
                        questions.map((e, index) => {
                          var { data, type } = e;
                          const LaTeX = "$" + data + "$ ";
                          return (
                            <div style={{ display: "inline" }} key={index}>
                              {type === "1" ? (
                                <text style={{ textOverflow: "ellipsis" }}>
                                  {data}{" "}
                                </text>
                              ) : type === "2" ? (
                                <Latex>{LaTeX}</Latex>
                              ) : type === "3" ? (
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
                          pathname: "/PreviousYearSubjectwise/setQuestion",
                          state: {
                            id: id,
                            Class: Class,
                            Subject: sub,
                            Chapter: chapter,
                            QuestionNo: index + 1,
                            mockpaperno: mockpaperno,
                            mainpapertype:mainpapertype
                            // allQuestions: allQuestions,
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
                        {/* <Link
                          to={{
                            pathname: "/PreviousYearSubjectwise/setQuestion",
                            state: {
                              id: id,
                              Class: Class,
                              Subject: sub,
                              Chapter: chapter,
                              QuestionNo: index + 1,
                              // allQuestions: allQuestions,
                            },
                          }}
                          style={{ textDecoration: "none" }}
                        > */}
                        Edit
                        {/* </Link> */}
                        {/* <a href={`/edit/${Class}/${chapter}/${subject}/${questionNo}/${Id}`}>Edit</a> */}
                      </Button>

                      {/* <Row>
                      <Col> */}
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

    </div>
  );
};

export default QuestionContent;
