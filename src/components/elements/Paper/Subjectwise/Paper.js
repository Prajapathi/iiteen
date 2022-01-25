import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";
import "../../../../styles/choiceSection.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Question from "../../QuestionAnswer/Question";

export function Paper(props) {
  const history = useHistory();
  const [palleteArray, setPalleteArray] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  // window.onpopstate = function (e) {
  //   console.log("paper.js called");
  //   // localStorage.removeItem("dialog");
  //   // history.push("/PreviousYear");
  // };
  function checkFirstVisit() {
    if (localStorage.getItem("reloaded") === null) {
      // cookie doesn't exist, create it now
      localStorage.setItem("reloaded", 1);
    } else {
      // not first visit, so alert
      // alert('You refreshed!');
      localStorage.setItem("reloaded",Number(localStorage.getItem("reloaded"))+1);
    }
    // localStorage.removeItem("dialog");
  }

  console.log(props);
  React.useEffect(() => {
    //if user is not navigating through MockTestCard then redirect to home
    //new code
    // localStorage.setItem("fromPaper",true);
    // window.history.pushState({page: 3}, "title 3", "?page=3")
    //
    let verifyPaper = localStorage.getItem("PaperName");
    if (
      verifyPaper == null ||
      (verifyPaper != "Subjectwise" && verifyPaper != "previousyearSubjectwise")
    ) {
      history.push("/Subjectwise");
    }
    // localStorage.removeItem("PaperName")

    console.log("lll", props.paper);
    setQuestions(props.paper.questions);
    setAnswers(props.answers);
    const a = [];
    for (let i = 0; i < props.answers.length; i++) {
      a.push(0);
    }
    setPalleteArray(a);
    setIndex(props.paper.lastIndex ? props.paper.lastIndex : 0);

    //new code
    if (localStorage.getItem("palleteindex") !== null) {
      setIndex(localStorage.getItem("palleteindex"));
    }
    //
  }, []);

  const navigateQuestion = (ind) => {
    //new code
    localStorage.setItem("palleteindex", ind);
    //
    setIndex(ind);
  };

  return (
    <>
      <div
        className="timer-bar subjectwise-title-bar"
        onload={checkFirstVisit()}
      >
        <div>{props.paper.name} </div>
        <div>Level {props.paper.level} </div>
      </div>
      <Container
        fluid
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 0,
          marginRight: 0,
        }}
      >
        <div
          noGutters
          style={{ marginLeft: 0, marginRight: 0, display: "flex" }}
        >
          <div style={{ width: "80%" }}>
            {console.log(
              "props",
              props
              // ,questions[index].number,questions[index].Questionnumber
            )}
            <Question
              key={index}
              type={"subjectwise"}
              question={questions ? questions[index] : []}
              noOfQuestions={25}
              qid={
                answers && answers[index]
                  ? questions[answers[index].number]
                    ? questions[answers[index].number].qid
                    : 0
                  : 0
              }
              number={
                localStorage.getItem("PaperName") == "Subjectwise" &&
                questions &&
                questions[index]
                  ? questions[index].number
                  : localStorage.getItem("PaperName") ==
                      "previousyearSubjectwise" &&
                    answers &&
                    answers[index]
                  ? answers[index].number + 1
                  : 0
              }
              goToPrevQuestion={() => setIndex(index - 1)}
              goToNextQuestion={() => setIndex(index + 1)}
            />
          </div>

          <div style={{ width: "20%" }}>
            <div className="ques-pallete">
              {palleteArray.map((text, ind) => (
                <div
                  className="page-no"
                  style={{
                    background: props.answers[ind].isBookmarked
                      ? "#ff9700"
                      : props.answers[ind].isAnswered
                      ? "#3B95C2"
                      : "white",
                    color:
                      props.answers[ind].isBookmarked ||
                      props.answers[ind].isAnswered
                        ? "white"
                        : "black",
                    border: index == ind ? "1px solid black" : null,
                  }}
                  onClick={() => navigateQuestion(ind)}
                >
                  {ind + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    paper: state.MockTestReducer.paper,
    answers: state.MockTestReducer.answers,
  };
};

export default connect(mapStateToProps)(Paper);
