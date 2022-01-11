import { MenuItem, TextField, Button, Switch } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Syllabus from "../components/data/syllabus";
// import { db } from "../components/firebase";
import firebase from "firebase";
import PaperContent from "../components/PaperContent";
import SetQuestion from "../components/SetQuestion";
import Latex from "react-latex-next";
import { Container, Row, Col } from "react-bootstrap";
import "../components/css/myCss.css";
import { Route, Router } from "react-router";
import { Link } from "react-router-dom";

const QuestionContent = (props) => {
  const [chapter, setChapter] = useState("");
  const [Class, setClass] = useState("");
  const [allQuestions, setAllQuestions] = useState("");
  const [editBtn, setEditBtn] = useState(false);
  const [questionNo, setQuestionNo] = useState("1");
  const [Id, setId] = useState("0");
  const [sub, setSub] = useState("11");

  function SetQuestionBtn(no, id) {
    setQuestionNo(no);
    setId(id);
    setEditBtn(true);
    console.log(Id, questionNo, editBtn);
  }
  var index = props.match.params.subject;
  useEffect(() => {
    if (index == 0) {
      setSub("physics");
    } else if (index == 1) {
      console.log("chemistry");
    } else if (index == 2) {
      setSub("maths");
    }
  }, [index]);

  function fetchPaper(selClass, selChapter) {
    const db = firebase.firestore();
    db.collection("PYSV")
      .doc(selClass)
      .collection(sub)
      .doc(selChapter)
      .collection("question")
      .orderBy("questionNumber")
      .onSnapshot(function (querySnapshot) {
        setAllQuestions(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            questions: doc.data().question,
          }))
        );
      });
    console.log(allQuestions);
  }

  function deleteQuestion(id) {
    //sure want to delete yes or no
    //if yes then delete
    //if no then do nothing
    if (window.confirm("Are you sure want to delete this question?")) {
      const db = firebase.firestore();
      db.collection("PYSV")
        .doc(Class)
        .collection(sub)
        .doc(chapter)
        .collection("question")
        .doc(id)
        .delete()
        .then(
          function () {
            console.log("Document successfully deleted!");
          }.catch(function (error) {
            console.error("Error removing document: ", error);
          })
        );
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
            style={{ width: "200px", marginRight: "20px" }}
            onChange={(event) => setClass(event.target.value)}
          >
            <MenuItem value="class11">Class 11</MenuItem>
            <MenuItem value="class12">Class 12</MenuItem>
          </TextField>

          <TextField
            id="standard-number"
            select
            label="Chapter Name"
            value={chapter}
            style={{ width: "200px", marginRight: "20px" }}
            onChange={(event) => setChapter(event.target.value)}
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
          {Class !== "" && chapter !== "" && (
            <Button
              className="shadow-btn"
              style={{ marginTop: "5px" }}
              onClick={() => {
                fetchPaper(Class, chapter);
              }}
            >
              next
            </Button>
          )}
        </div>
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
                <h4>Total Questions- {allQuestions.length}</h4>
              </Col>

              <Col>
                {" "}
                <Button
                  className="shadow-btn"
                  onClick={() => {
                    setQuestionNo(allQuestions.length + 1);
                    alert(questionNo);
                  }}
                >
                  <Link
                    to={{
                      pathname: "/PreviousYearSubjectwise/setQuestion",
                      state: {
                        Class: Class,
                        Subject: sub,
                        Chapter: chapter,
                        QuestionNo: allQuestions.length + 1,
                      },
                    }}
                  >
                    Add New Question {questionNo}
                  </Link>
                </Button>{" "}
              </Col>
            </Row>
                    {console.log("allquestions",allQuestions)};
            {allQuestions.map((e, index) => {
              var { id, questions } = e;
              return (
                <div className="shadow-card" style={{ marginTop: "40px" }}>
                  <h4>Question No: {index + 1} </h4>
                  <span />
                  <div style={{ wordWrap: "break-word" }}>
                    {questions !== "" ? (
                      questions.map((e, index) => {
                        var { data, type } = e;
                        const LaTeX = "$" + data + "$ ";
                        return (
                          <div style={{ display: "inline" }}>
                            {type === "1" ? (
                              <text>{data} </text>
                            ) : type === "2" ? (
                              <Latex>{LaTeX}</Latex>
                            ) : type === "3" ? (
                              <div>
                                <img src={data} alt="img" />
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

                  <Button
                    className="shadow-btn"
                    style={{ marginTop: "19px" }}
                    onClick={() => {
                      return SetQuestionBtn(index + 1, id);
                    }}
                  >
                    <Link
                      to={{
                        pathname: "/PreviousYearSubjectwise/setQuestion",
                        state: {
                          id: id,
                          Class: Class,
                          Subject: sub,
                          Chapter: chapter,
                          QuestionNo: index + 1,
                          allQuestions:allQuestions
                        },
                      }}
                    >
                      Edit Question
                    </Link>
                    {/* <a href={`/edit/${Class}/${chapter}/${subject}/${questionNo}/${Id}`}>Edit</a> */}
                  </Button>

                  <div>
                    <Button
                      className="shadow-btn"
                      style={{
                        marginTop: "19px",
                        backgroundColor: "white",
                        color: "red",
                      }}
                      onClick={() => {
                        deleteQuestion(id);
                      }}
                    >
                      Delete Question
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>

      {editBtn === true ? (
        //   <Router>
        //   <Switch>
        //     <Route path="/edit" exact component={()=>{
        //          <SetQuestion Class= {Class} Chapter = {chapter} QuestionNumber={questionNo} Id={Id}/>
        //     }} />
        //   </Switch>
        // </Router>
        <SetQuestion
          Class={Class}
          Chapter={chapter}
          QuestionNumber={questionNo}
          Id={Id}
          Subject={sub}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuestionContent;
