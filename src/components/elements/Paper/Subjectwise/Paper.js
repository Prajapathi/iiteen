import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";
import "../../../../styles/choiceSection.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Question from "../../QuestionAnswer/Question";
import { Box, MenuItem, TextField } from "@material-ui/core";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import '../../../../styles/paper-subjectwise-rating-box.css'

const labels = {
  1: "Very Easy",
  2: "Easy",
  3: "Medium",
  4: "Hard",
  5: "Very Hard",
};

export function Paper(props) {
  const history = useHistory();
  const [palleteArray, setPalleteArray] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [filter, setFilter] = React.useState("");
  const selfref = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [open, setOpen] = React.useState(false);

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
      localStorage.setItem(
        "reloaded",
        Number(localStorage.getItem("reloaded")) + 1
      );
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

  React.useEffect(() => {
    if (filter == "asc") {
      setLoading(true);
      let arr = props.paper.questions;
      arr.sort(function (a, b) {
        return a.rating - b.rating;
      });
      console.log(arr);
      if (palleteArray.length != 25) {
        let arr3 = [];
        for (let i = 0; i < 25; i++) {
          arr3.push(0);
        }
        setPalleteArray(arr3);
      }
      setQuestions(arr);
      let count = 0;
      setInterval(() => {
        count++;
        if (count == 2) {
          setLoading(false);
          return;
        }
      }, 100);
    } else if (filter == "dsc") {
      setLoading(true);
      let arr = props.paper.questions;
      arr.sort(function (a, b) {
        return b.rating - a.rating;
      });
      console.log(arr);
      if (palleteArray.length != 25) {
        let arr3 = [];
        for (let i = 0; i < 25; i++) {
          arr3.push(0);
        }
        setPalleteArray(arr3);
      }
      setQuestions(arr);
      let count = 0;
      setInterval(() => {
        count++;
        if (count == 2) {
          setLoading(false);
          return;
        }
      }, 100);
    } else if (filter == "star") {
      setLoading(true);
      let arr = props.paper.questions;
      let arr2 = arr.filter(function (a) {
        return a.rating == value;
      });
      console.log(value, arr2);
      let arr3 = [];
      for (let i = 0; i < arr2.length; i++) {
        arr3.push(0);
      }
      setPalleteArray(arr3);
      setQuestions(arr2);
      let count = 0;
      setInterval(() => {
        count++;
        if (count == 2) {
          setLoading(false);
          return;
        }
      }, 100);
    }
    console.log(selfref.current)
  }, [filter, value]);

  const navigateQuestion = (ind) => {
    //new code
    localStorage.setItem("palleteindex", ind);
    //
    setIndex(ind);
  };

  React.useEffect(() => {
    console.log(questions);
    // ref.render(
    // selfref.current.render()
    // if(!loading)setLoading(false)
  }, [questions]);

  return (
    <>
      <div
        className="timer-bar subjectwise-title-bar"
        onload={checkFirstVisit()}
      >
        <div>{props.paper.name} </div>
        <div>
          Filter&nbsp;&nbsp;
          <TextField
            id="standard-number"
            select
            ref={selfref}
            InputProps={{ disableUnderline: true,
            //   onClick:(e)=>{
            //     e.stopPropagation()
                
            //   // e.preventDefault()
            // } 
            }}
            // label="Select filter"
            // InputLabelProps={{
            //   style: { fontSize: 12 },
            //   onClick: (e) => {
            //     e.stopPropagation();
            //     e.preventDefault();
            //   },
            // }}
            value={filter}
            style={{ width: "150px", marginRight: "20px" }}
            onChange={(event) => {
              setFilter(event.target.value);
              if (event.target.value != "star") {
                setValue(0);
              }
            }}
          >
            
            <MenuItem value={"asc"} key={"0"}>
              Hardness(ASC)
            </MenuItem>
            <MenuItem value={"dsc"} key={"1"}>
              Hardness(DSC)
            </MenuItem>
            <MenuItem value={"star"} key={"2"}>
              <Box
                sx={{
                  width: 220,
                  display: "flex",
                  alignItems: "center",
                }}
                className="rating-box"
              >
                <Rating
                  name="hover-feedback"
                  value={value}
                  // style={{pointerEvents:`${filter=="star"?"none":"auto"}`}}
                  
                  precision={1}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(-1);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" 
                    // sx={{
                    //   color:"grey !important"
                    // }}
                    
                    />
                  }
                />
              </Box>
            </MenuItem>
          </TextField>
          <div>Level {props.paper.level} </div>
        </div>
      </div>
      {!loading ? (
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
              {/* {console.log(
              "props",
              props
              // ,questions[index].number,questions[index].Questionnumber
            )} */}
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
                  answers &&
                  answers[index]
                    ? answers[index].number + 1
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
                      background: props.answers.filter((a)=>(a.qid==(questions[ind]?questions[ind].qid:0)))[0].isBookmarked
                        ? // background: props.answers.filter((a)=>(a.qid==questions[answers[ind].number].qid))[0].isBookmarked

                          "#ff9700"
                        : props.answers.filter((a)=>(a.qid==(questions[ind]?questions[ind].qid:0)))[0].isAnswered
                        ? "#3B95C2"
                        : "white",
                      color:
                      props.answers.filter((a)=>(a.qid==(questions[ind]?questions[ind].qid:0)))[0].isBookmarked ||
                      props.answers.filter((a)=>(a.qid==(questions[ind]?questions[ind].qid:0)))[0].isAnswered
                          ? "white"
                          : "black",
                      border: index == ind ? "1px solid black" : null,
                    }}
                    onClick={() => navigateQuestion(ind)}
                  >
                    {/* props.answers[ind] */}
                    {/* {console.log(props.answers.filter((a)=>(a.qid==(questions[ind]?questions[ind].qid:0)))[0])} */}
                    {ind + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <div style={{ height: "100vh" }}></div>
      )}
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
