import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import {
  clearAnswer,
  setAnswer,
  bookmarkQuestion,
} from "../../../store/action/Paper";
import "../../../styles/choiceSection.css";
import "../../../styles/detailedAnalysis.css";
import Container from "react-bootstrap/Container";
import { InlineMath, BlockMath } from "react-katex";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";

export function SubjectwiseChoiceSection(props) {
  const [palleteSub, setPalleteSub] = React.useState(1);
  const [answer, setAnswer] = React.useState("");
  const [correctAnswer, setCorrectAnswer] = React.useState("");
  const [selectOpt, setSelectOpt] = React.useState([
    false,
    false,
    false,
    false,
  ]);
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);
  const [data,setData]=React.useState("");
  const [errorType, setErrorType] = useState();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  // console.log("props", props, props.user.uid);

  // console.log("filtered",props.stateAnswer.filter((qid)=>qid==props.data.qid))
  // console.log("filtered",data.qid);

  // console.log(
  //   "kkk",
  //   props.stateAnswer[props.number - 1],
  //   props.number,
  //   props.data && localStorage.getItem("PaperName"),
  //   localStorage.getItem("PaperName") == "previousyearSubjectwise",
  //   props.data,
  //   props.qid,
  //   props.stateAnswer.filter((a)=>(a.qid==props.qid))
  // );

  useEffect(() => {
    //if answer given was wrong initially and solution was not shown, don't display previously given answer
    // if(localStorage.getItem("props")===undefined){
    //   localStorage.setItem("props",JSON.stringify(props));
    // }
    // if(props==null || props==undefined || props==""){
    //   props=JSON.parse(localStorage.getItem("props"));
    // }
    setData(props.stateAnswer.filter((a)=>(a.qid==props.qid))[0]);
    // console.log(props.stateAnswer.filter((a)=>(a.qid==props.qid))[0]);
    // console.log(data);
    if (
      props.stateAnswer.filter((a)=>(a.qid==props.qid))[0] &&
      props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].isAnsweredWrong &&
      props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].isAnswered
    )
      return;
    //if answer was already submitted then load this into local state for display
    if (
      props.stateAnswer.filter((a)=>(a.qid==props.qid))[0] &&
      props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answerGiven != null
    ) {
      let opt = [false, false, false, false];
      //for multi-correct questions
      if (props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answerType == 5)
        for (
          let i = 0;
          i < props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answerGiven.length;
          i++
        ) {
          opt[props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answerGiven[i]] = true;
        }
      //for single-correct questions
      else if (props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answerType == 4)
        opt[props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answerGiven] = true;

      setSelectOpt(opt);
      setAnswer(props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answerGiven);
    }
    if (
      props.stateAnswer.filter((a)=>(a.qid==props.qid))[0] &&
      !props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].isAnsweredWrong &&
      props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].isAnswered
    )
      setShowSolution(true);
  }, [props.stateAnswer[props.number-1]]);

  const changeOptSingle = (ind) => {
    const opts = [false, false, false, false];
    opts[ind] = !selectOpt[ind];
    let ans = -1;
    for (let i = 0; i < 4; i++) {
      if (opts[i] == true) ans = i;
    }
    setAnswer(ans);
    setSelectOpt(opts);
  };

  const changeOptMultiple = (ind) => {
    const opts = [false, false, false, false];
    for (let i = 0; i < 4; i++) {
      if (ind == i) opts[i] = !selectOpt[i];
      else opts[i] = selectOpt[i];
    }
    let ans = [];
    for (let i = 0; i < 4; i++) {
      if (opts[i] == true) ans.push(i);
    }
    setAnswer(ans);
    setSelectOpt(opts);
  };

  const saveAttemptDatabase = () => {
    //when user clicks on show Solution or gives correct answer, update it in DB
    let lev = "Level 0" + props.paper.level;
    const db = firebase.firestore();
    console.log("it is saving");
    console.log("filtered",props.stateAnswer.filter((a)=>a.qid==props.data.qid))
    if(localStorage.getItem("PaperName") == "Subjectwise"){
      console.log("inside ",localStorage.getItem("PaperName"));
      console.log(props.user.uid,props.paper.classNumber,props.paper.subject,props.paper.chapter,lev,props.stateAnswer);
      db.collection("User")
      .doc(props.user.uid)
      .collection(
        "SUBJECTWISEPapers"
      )
      .doc("Class " + props.paper.classNumber)
      .collection(props.paper.subject)
      .doc("Chapter " + props.paper.chapter)
      .set(
        {
          [lev]: [...props.stateAnswer],
        },
        { merge: true }
      )
      .then((res) => {
        console.log("Saved");
      })
      .catch((err) => {
        console.log("Error saving option", err);
      });
    }else{
      console.log("inside ",localStorage.getItem("PaperName"));
      console.log(props.user.uid,props.paper.classNumber,props.paper.subject,props.paper.chapter,lev,props.stateAnswer);
      db.collection("User")
      .doc(props.user.uid)
      .collection(
        "previousyearSUBJECTWISEPapers"
      )
      .doc("Class " + props.paper.classNumber)
      .collection(props.paper.subject)
      .doc("Chapter " + props.paper.chapter)
      .set(
        {
          [lev]: [...props.stateAnswer],
        },
        { merge: true }
      )
      .then((res) => {
        console.log("Saved");
      })
      .catch((err) => {
        console.log("Error saving option", err);
      });
    }
  };
  const bookMark = () => {
    props.bookmarkQuestion(props.number - 1);
    saveAttemptDatabase();
  };
  const submitQuestionPre = () => {
    setAnimate(false);
  };
  const submitQuestion = () => {
    //before submitting check the input answer. Set the value of flag to 1 if answer is not acceptable
    let flag = 0;
    if (props.data.answerType == 1) {
      flag = Number.isInteger(answer) ? 0 : 1;
    } else if (props.data.answerType == 2) {
      flag = answer === "" ? 1 : 0;
    } else if (props.data.answerType == 4) {
      if (answer === "" || answer == -1) {
        flag = 1;
      }
    } else if (props.data.answerType == 5) {
      if (answer === "" || answer.length == 0) flag = 1;
    }
    //if the answer given was in acceptable format
    if (flag == 0) {
      console.log("got inside submit question");
      let previouslyAnswered = props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].isAnswered;
      props.setAnswer(props.qid, answer);
      //if it was not answered before, save the new first attempt in database

      console.log(answer);
      console.log(props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].isAnsweredWrong);
      //if the answer was wrong
      if (props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].isAnsweredWrong) {
        setWrongAttempt(true);
        setShowHint(true);
        submitQuestionPre();
        setTimeout(() => {
          setAnimate(true);
        }, 100);
      }
      //if the answer was correct
      else {
        setWrongAttempt(false);
        setShowSolution(true);
        saveAttemptDatabase();
      }
      if (!previouslyAnswered) {
        saveAttemptDatabase();
      }
    }
    //if the answer given was not in acceptable format
    else {
      setShow(true);
      setErrorType(1);
    }
  };

  const giveUp = () => {
    setShowSolution(true);
    setShowHint(false);
    setAnswer(props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answer);
    props.setAnswer(
      props.qid,
      props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answer
    );

    let opt = [false, false, false, false];

    //for multi-correct questions
    if (props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answerType == 5)
      for (
        let i = 0;
        i < props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answer.length;
        i++
      ) {
        opt[props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answer[i]] = true;
      }
    //for single-correct questions
    else if (props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answerType == 4)
      opt[props.stateAnswer.filter((a)=>(a.qid==props.qid))[0].answer] = true;

    setSelectOpt(opt);

    saveAttemptDatabase();
  };
  // console.log(
  //   props.stateAnswer,
  //   props.stateAnswer.filter((a)=>(a.qid==props.qid))[0],
  //   props.data
  // );

  useEffect(() => {
    let id;
    if (errorType != undefined) {
      let count = 0;
      id = setInterval(() => {
        console.log("calle", count);
        count++;
        if (count == 2) {
          setErrorType();
          return;
        }
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [errorType]);

  return (
    <>
      <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row noGutters>
          <Col id="choice-sec">
            <div className="heading">
              {/* {console.log(data && data.answerType)} */}
              {data
                ? data.answerType == 1
                  ? "Integer Type"
                  : data.answerType == 2
                  ? "Numerical Type"
                  : data.answerType == 4
                  ? "Single Correct Option"
                  : "Multiple Correct Options"
                : ""}
              <div>
                <ReportProblemOutlinedIcon
                  style={{ color: "#A6A5A5", cursor: "pointer" }}
                  onClick={() => setOpen(true)}
                />
                <BookmarkIcon
                  style={{
                    color: data
                      ? data.isBookmarked
                        ? "black"
                        : "#A6A5A5"
                      : "#A6A5A5",
                    marginLeft: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => bookMark()}
                />
              </div>
            </div>

            {/* Section displaying the correct answer */}
            {showSolution ? (
              <div className="answer-analysis" style={{ paddingTop: "5%" }}>
                <div>
                  {data ? (
                    data.answerType == 1 ? (
                      <>
                        {" "}
                        The correct answer is{" "}
                        {data.answer}{" "}
                      </>
                    ) : data.answerType == 2 ? (
                      <>
                        {" "}
                        The correct answer is between{" "}
                        {data.answer}-
                        {Math.round((Number(data.answer)+0.01)*100)/100}{" "}
                      </>
                    ) : data.answerType == 4 ? (
                      <>
                        {" "}
                        The correct answer is option{" "}
                        {data.answer == 0
                          ? "A."
                          : data.answer == 1
                          ? "B."
                          : data.answer == 2
                          ? "C."
                          : "D."}
                      </>
                    ) : (
                      <>
                        The correct answer is option
                        {data.answer.length == 1
                          ? " "
                          : "s "}
                        {data.answer.map(
                          (opt, i) => (
                            <span key={i}>
                              {opt == 0
                                ? "A"
                                : opt == 1
                                ? "B"
                                : opt == 2
                                ? "C"
                                : "D"}
                              {i ==
                              data.answer
                                .length -
                                1
                                ? "."
                                : ", "}
                            </span>
                          )
                        )}
                      </>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : wrongAttempt && !showSolution ? (
              <Grow
                in={animate}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 1000 } : {})}
              >
                <div className="answer-analysis" style={{ paddingTop: "5%" }}>
                  <div style={{ color: "red" }}>
                    Wrong Answer. Please try again.
                  </div>
                </div>
              </Grow>
            ) : null}
            {props.data ? (
              props.data.answerType == 1 ? (
                <div className="num-input">
                  <TextField
                    id="standard-number"
                    type="number"
                    step={1}
                    label="Enter Answer"
                    value={answer}
                    onChange={
                      showSolution
                        ? null
                        : (event) => setAnswer(Number(event.target.value))
                    }
                  />
                </div>
              ) : props.data.answerType == 2 ? (
                <div className="num-input">
                  <TextField
                    id="standard-number"
                    type="number"
                    label="Enter Answer"
                    value={answer}
                    onChange={
                      showSolution
                        ? null
                        : (event) => setAnswer(Number(event.target.value))
                    }
                  />
                </div>
              ) : props.data.answerType == 5 || props.data.answerType == 4 ? (
                <div
                  className="options"
                  style={{
                    paddingTop:
                      showSolution || (wrongAttempt && !showSolution)
                        ? "0px"
                        : "8%",
                  }}
                >
                  {props.data ? (
                    // localStorage.getItem("PaperName") == "Subjectwise"
                    props.data.option1==undefined
                     ? (
                      props.data.option && props.data.option.map((text, index) => (
                        <div
                          className="option"
                          onClick={
                            showSolution
                              ? null
                              : props.data.answerType == 5
                              ? () => changeOptMultiple(index)
                              : () => changeOptSingle(index)
                          }
                          style={{
                            border:
                              selectOpt[index] == true
                                ? "2px solid rgb(59, 149, 194)"
                                : "1px solid white",
                          }}
                          key={index}
                        >
                          {console.log("i got inside")}
                          {index === 0
                            ? "A.  "
                            : index === 1
                            ? "B.  "
                            : index === 2
                            ? "C. "
                            : "D. "}

                          {text.type == 0 ? (
                            <br />
                          ) : text.type == 1 ? (
                            text.data
                          ) : text.type == 2 ? (
                            <InlineMath>{text.data}</InlineMath>
                          ) : text.type == 3 ? (
                            <img
                              alt="img"
                              src={text.data}
                              style={{ width: "50%" }}
                            />
                          ) : null}
                        </div>
                      ))
                    ) :  (
                      <div>
                        <div
                          className="option"
                          onClick={
                            showSolution
                              ? null
                              : props.data.answerType == 5
                              ? () => changeOptMultiple(0)
                              : () => changeOptSingle(0)
                          }
                          style={{
                            border:
                              selectOpt[0] == true
                                ? "2px solid rgb(59, 149, 194)"
                                : "1px solid white",
                          }}
                        >
                          {"A.  "}
                          {props.data.option1 && props.data.option1.map((item,index) => (
                            <div key={index}>
                              {item.type == 0 ? (
                                <br />
                              ) : item.type == 1 ? (
                                item.data
                              ) : item.type == 2 ? (
                                <InlineMath>{item.data}</InlineMath>
                              ) : item.type == 3 ? (
                                <img
                                  alt="img"
                                  src={item.data}
                                  style={{ width: "50%" }}
                                />
                              ) : null}
                            </div>
                          ))}
                          {/* {props.data.option1[0].type == 0 ? (
                            <br />
                          ) : props.data.option1[0].type == 1 ? (
                            props.data.option1[0].data
                          ) : props.data.option1[0].type == 2 ? (
                            <InlineMath>
                              {props.data.option1[0].data}
                            </InlineMath>
                          ) : props.data.option1[0].type == 3 ? (
                            <img
                              alt="img"
                              src={props.data.option1[0].data}
                              style={{ width: "50%" }}
                            />
                          ) : null} */}
                        </div>
                        <div
                          className="option"
                          onClick={
                            showSolution
                              ? null
                              : props.data.answerType == 5
                              ? () => changeOptMultiple(1)
                              : () => changeOptSingle(1)
                          }
                          style={{
                            border:
                              selectOpt[1] == true
                                ? "2px solid rgb(59, 149, 194)"
                                : "1px solid white",
                          }}
                        >
                          {"B.  "}
                          {props.data.option2 && props.data.option2.map((item,index) => (
                            <div key={index}>
                              {item.type == 0 ? (
                                <br />
                              ) : item.type == 1 ? (
                                item.data
                              ) : item.type == 2 ? (
                                <InlineMath>{item.data}</InlineMath>
                              ) : item.type == 3 ? (
                                <img
                                  alt="img"
                                  src={item.data}
                                  style={{ width: "50%" }}
                                />
                              ) : null}
                            </div>
                          ))}
                        </div>
                        <div
                          className="option"
                          onClick={
                            showSolution
                              ? null
                              : props.data.answerType == 5
                              ? () => changeOptMultiple(2)
                              : () => changeOptSingle(2)
                          }
                          style={{
                            border:
                              selectOpt[2] == true
                                ? "2px solid rgb(59, 149, 194)"
                                : "1px solid white",
                          }}
                        >
                          {"C. "}

                          {props.data.option3 && props.data.option3.map((item,index) => (
                            <div key={index}>
                              {item.type == 0 ? (
                                <br />
                              ) : item.type == 1 ? (
                                item.data
                              ) : item.type == 2 ? (
                                <InlineMath>{item.data}</InlineMath>
                              ) : item.type == 3 ? (
                                <img
                                  alt="img"
                                  src={item.data}
                                  style={{ width: "50%" }}
                                />
                              ) : null}
                            </div>
                          ))}
                        </div>
                        <div
                          className="option"
                          onClick={
                            showSolution
                              ? null
                              : props.data.answerType == 5
                              ? () => changeOptMultiple(3)
                              : () => changeOptSingle(3)
                          }
                          style={{
                            border:
                              selectOpt[3] == true
                                ? "2px solid rgb(59, 149, 194)"
                                : "1px solid white",
                          }}
                        >
                          {"D. "}

                          {props.data.option4 && props.data.option4.map((item,index) => (
                            <div key={index}>
                              {item.type == 0 ? (
                                <br />
                              ) : item.type == 1 ? (
                                item.data
                              ) : item.type == 2 ? (
                                <InlineMath>{item.data}</InlineMath>
                              ) : item.type == 3 ? (
                                <img
                                  alt="img"
                                  src={item.data}
                                  style={{ width: "50%" }}
                                />
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) 
                  ) : null}
                </div>
              ) : null
            ) : null}
            <div
              style={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "grey",
              }}
            >
              {errorType == 1 ? (
                "Please enter a proper response before submitting."
              ) : errorType == 0 ? (
                <>
                  {" "}
                  Maximum number of questions already attempted in this section.
                  <br /> Please clear response before attempting more.
                </>
              ) : errorType == 2 ? (
                "Please Clear the response first to change answer"
              ) : null}
            </div>

            <div className="solution-hint-sec">
              {showHint && !showSolution ? (
                <div className="solution-subjectwise">
                  <h5 style={{ textAlign: "center" }}>Hint</h5>
                  {props.hint
                    ? props.hint.map((item, index) => (
                        <div key={index}>
                          {item.type == 0 ? (
                            <br />
                          ) : item.type == 1 ? (
                            item.data
                          ) : item.type == 2 ? (
                            <InlineMath>{item.data}</InlineMath>
                          ) : item.type == 3 ? (
                            <div id="ques-img-sec">
                              <img src={item.data} style={{ width: "100%" }} />
                            </div>
                          ) : null}
                        </div>
                      ))
                    : null}
                </div>
              ) : null}
              {showHint && !showSolution ? (
                <button onClick={() => giveUp()}>Show solution</button>
              ) : null}
              {showSolution === true ? (
                <div className="solution-subjectwise">
                  <h5 style={{ textAlign: "center", color: "green" }}>
                    Solution
                  </h5>
                  {props.solution
                    ? props.solution.map((item, index) => (
                        <div key={index}>
                          {item.type == 0 ? (
                            <br />
                          ) : item.type == 1 ? (
                            item.data
                          ) : item.type == 2 ? (
                            <InlineMath>{item.data}</InlineMath>
                          ) : item.type == 3 ? (
                            <div id="ques-img-sec">
                              <img src={item.data} style={{ width: "100%" }} />
                            </div>
                          ) : null}
                        </div>
                      ))
                    : null}
                </div>
              ) : null}
            </div>

            <div
              className="submit"
              style={{ marginTop: "2%", marginBottom: "2%" }}
            >
              <div className="back-button">
                <ArrowBackIosIcon
                  style={{
                    fontSize: "38px",
                    color: props.number == 1 ? "rgba(0,0,0,0.1)" : null,
                    cursor: props.number == 1 ? "not-allowed" : "pointer",
                  }}
                  onClick={
                    props.number == 1 ? null : () => props.goToPrevQuestion()
                  }
                ></ArrowBackIosIcon>
              </div>

              {data &&
              data.isAnswered ? (
                wrongAttempt && !showSolution ? (
                  <button
                    style={{ background: "red" }}
                    onClick={() => submitQuestion()}
                  >
                    Retry
                  </button>
                ) : data &&
                  props.number != props.noOfQuestions &&
                  !data.isAnsweredWrong &&
                  data.isAnswered &&
                  props.number != props.noOfQuestions ? (
                  <button
                    style={{ background: "#3B95C2" }}
                    onClick={() => props.goToNextQuestion()}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    style={{ background: "#18d618" }}
                    onClick={() => submitQuestion()}
                  >
                    Submit
                  </button>
                )
              ) : (
                <button
                  style={{ background: "#18d618" }}
                  onClick={() => submitQuestion()}
                >
                  Submit
                </button>
              )}
              {props.number == props.noOfQuestions ? null : (
                <div className="forward-button">
                  <ArrowForwardIosIcon
                    style={{ fontSize: "38px" }}
                    onClick={() => props.goToNextQuestion()}
                  ></ArrowForwardIosIcon>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Snackbar
        open={show}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{
          background: "#3B95C2",
          color: "white",
          padding: "15px",
          fontSize: "18px",
        }}
        onClose={() => setShow(false)}
      >
        <div>Please enter a proper response before submitting.</div>
      </Snackbar>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="report-box"
      >
        <DialogTitle id="alert-dialog-title">{"Report"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <textarea style={{ resize: "none" }} rows="4" />
            <button id="report-button" onClick={() => setOpen(false)}>
              Report
            </button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    paper: state.MockTestReducer.paper,
    stateAnswer: state.MockTestReducer.answers,
    user: state.AuthReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAnswer: (ind, ans) => dispatch(setAnswer(ind, ans)),
    clearAnswer: (ind) => dispatch(clearAnswer(ind)),
    bookmarkQuestion: (ind) => dispatch(bookmarkQuestion(ind)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectwiseChoiceSection);
