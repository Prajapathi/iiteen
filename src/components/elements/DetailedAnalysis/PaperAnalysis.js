import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";
import "../../../styles/choiceSection.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "@material-ui/core/Badge";
import CloseIcon from "@material-ui/icons/Close";
import QuestionAnalysis from "./QuestionAnalysis";

export default function DetailedAnalysis(props) {
  const history = useHistory();
  const [palleteSub, setPalleteSub] = React.useState(1);
  const [palleteArray, setPalleteArray] = React.useState({
    phy: [],
    maths: [],
    chem: [],
  });
  const [questions, setQuestions] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    //document.title = "Amazing Page";
    //if user is not navigating through MockTestCard then redirect to home
    // let verifyPaper=localStorage.getItem("PaperName")
    // if(verifyPaper==null|| verifyPaper!=props.paper.name){
    //     history.push('/')
    // }
    // localStorage.removeItem("PaperName")
    console.log("porps", props);
    setQuestions(props.paper.questions);

    const a = [];
    for (let i = 0; i < props.paper.noofques / 3; i++) {
      a.push(0);
    }
    const t = {
      maths: a,
      chem: a,
      phy: a,
    };
    setPalleteArray(t);
  }, []);
  console.log("lunatic", props.answers);
  //function to change subject if the user enters next subject using "Submit and next" button
  React.useEffect(() => {
    if (index == 0 || index == props.paper.noofques / 3 - 1)
      setPalleteSub(1);
    else if (
      index == props.paper.noofques / 3 ||
      index == (2 * props.paper.noofques) / 3 - 1
    )
      setPalleteSub(2);
    else if (
      index == (2 * props.paper.noofques) / 3 ||
      index == props.paper.noofques - 1
    )
      setPalleteSub(3);
  }, [index]);

  const navigateQuestion = (ind) => {
    if (palleteSub == 1) {
      setIndex(ind);
    } else if (palleteSub == 2) {
      setIndex(props.paper.noofques / 3 + ind);
    } else setIndex((2 * props.paper.noofques) / 3 + ind);
  };

  return (
    <Container
      fluid
      style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0 }}
    >
      <div noGutters style={{ marginLeft: 0, marginRight: 0, display: "flex" }}>
        <div style={{ width: "80%" }}>
          <QuestionAnalysis
            key={index}
            question={questions[index]}
            noOfQuestions={props.paper.noofques}
            number={questions[index] ? questions[index].number : 1}
            answers={props.answers}
            goToPrevQuestion={() => setIndex(index - 1)}
            goToNextQuestion={() => setIndex(index + 1)}
          />
        </div>

        <div style={{ width: "20%" }}>
          <div className="ques-pallete">
            <div id="ques-pallete-sub">
              <div
                className="subject-select"
                style={{
                  background: palleteSub == 1 ? "#448698" : "white",
                  color: palleteSub == 1 ? "white" : "black",
                }}
                onClick={() => setPalleteSub(1)}
              >
                Physics
              </div>
              <div
                className="subject-select"
                style={{
                  background: palleteSub == 2 ? "#448698" : "white",
                  color: palleteSub == 2 ? "white" : "black",
                }}
                onClick={() => setPalleteSub(2)}
              >
                Chemistry
              </div>
              <div
                className="subject-select"
                style={{
                  background: palleteSub == 3 ? "#448698" : "white",
                  color: palleteSub == 3 ? "white" : "black",
                }}
                onClick={() => setPalleteSub(3)}
              >
                Maths
              </div>
            </div>
            {console.log("palleteSub", palleteSub, palleteArray)}
            {palleteSub == 1
              ? palleteArray.phy.map((text, ind) => (
                  <div
                    className="page-no"
                    style={{
                      background: props.answers[ind].isAnswered
                        ? props.answers[ind].isBookmarked
                          ? "#ff9700"
                          : "#2AD586"
                        : props.answers[ind].isBookmarked
                        ? "#3B95C2"
                        : props.answers[ind].isSeen
                        ? "#FF1E1E"
                        : "white",
                      border: index == ind ? "1px solid black" : null,
                    }}
                    onClick={() => navigateQuestion(ind)}
                  >
                    {ind + 1}
                  </div>
                ))
              : palleteSub == 2
              ? palleteArray.phy.map((text, ind) => (
                  <div
                    className="page-no"
                    style={{
                      background: props.answers[
                        props.paper.noofques / 3 + ind
                      ].isAnswered
                        ? props.answers[props.paper.noofques / 3 + ind]
                            .isBookmarked
                          ? "#ff9700"
                          : "#2AD586"
                        : props.answers[props.paper.noofques / 3 + ind]
                            .isBookmarked
                        ? "#3B95C2"
                        : props.answers[props.paper.noofques / 3 + ind]
                            .isSeen
                        ? "#FF1E1E"
                        : "white",
                      border:
                        index == props.paper.noofques / 3 + ind
                          ? "1px solid black"
                          : null,
                    }}
                    onClick={() => navigateQuestion(ind)}
                  >
                    {ind + 1}
                  </div>
                ))
              : palleteArray.phy.map((text, ind) => (
                  <div
                    className="page-no"
                    style={{
                      background: props.answers[
                        (2 * props.paper.noofques) / 3 + ind
                      ].isAnswered
                        ? props.answers[
                            (2 * props.paper.noofques) / 3 + ind
                          ].isBookmarked
                          ? "#ff9700"
                          : "#2AD586"
                        : props.answers[
                            (2 * props.paper.noofques) / 3 + ind
                          ].isBookmarked
                        ? "#3B95C2"
                        : props.answers[
                            (2 * props.paper.noofques) / 3 + ind
                          ].isSeen
                        ? "#FF1E1E"
                        : "white",
                      border:
                        index == (2 * props.paper.noofques) / 3 + ind
                          ? "1px solid black"
                          : null,
                    }}
                    onClick={() => navigateQuestion(ind)}
                  >
                    {ind + 1}
                  </div>
                ))}

            <div
              style={{
                margin: "5px 20px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#2B5594",
              }}
            >
              The Questions Palette displayed will show the status of each
              question using one of the following symbols :
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="color-code-box"
                  style={{ background: "white" }}
                ></div>
                <div className="color-code-text">: Not Visited Questions</div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="color-code-box"
                  style={{ background: "#FF1E1E" }}
                ></div>
                <div className="color-code-text">
                  : Visited Questions but not Answered
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="color-code-box"
                  style={{ background: "#2AD586" }}
                ></div>
                <div className="color-code-text">: Attempted Questions</div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="color-code-box"
                  style={{ background: "#3B95C2" }}
                ></div>
                <div className="color-code-text">: Marked for Review</div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="color-code-box"
                  style={{ background: "#ff9700" }}
                ></div>
                <div className="color-code-text">
                  : Attempted and Marked Questions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
