import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";
import "../../../../styles/choiceSection.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Question from "../../QuestionAnswer/Question";
import '../../../../styles/subjectwisepaperyearwiseselect.css'
import {
  Box,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "../../../../styles/paper-subjectwise-rating-box.css";

// const styles = theme => ({
//   ...
//   tr: {
//     background: "#f1f1f1",
//     '&:hover': {
//        background: "#f00",
//     },
//   },
//   ...
// });

export function Paper(props) {
  const history = useHistory();
  const [palleteArray, setPalleteArray] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [filter, setFilter] = React.useState("asc");
  const selfref = React.useRef();
  const selfref2 = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  // const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [year, setYear] = React.useState();

  const yeardata = [...Array(43).keys()].map((x) => x + 1980);

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
    console.log(yeardata);
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
    } else if (filter == "star" && value != 0) {
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
    } else if (filter == "year" && year != undefined) {
      setLoading(true);
      let arr = props.paper.questions;
      const year2 = year;
      console.log(year, year2);
      let arr2 = arr.filter(function (a) {
        console.log(a.date, year2, year);
        return a.date.substr(0, 4) == year2;
      });
      console.log(year, arr2);
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
    console.log(selfref.current);
  }, [filter, value, year]);

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

  const handleClick = (event) => {
    setAnchorEl(selfref.current);
  };

  const handleClick2 = (event) => {
    setAnchorEl(selfref2.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div
        className="timer-bar subjectwise-title-bar"
        onload={checkFirstVisit()}
        style={{ position: "relative" }}
      >
        <div>{props.paper.name} </div>
        {localStorage.getItem("PaperName") == "previousyearSubjectwise" && (
          <div style={{ position: "absolute", left: "41%" }}>
            Filter&nbsp;&nbsp;
            <TextField
              id="standard-number"
              select
              InputProps={{
                disableUnderline: true,
                //   onClick:(e)=>{
                //     e.stopPropagation()

                //   // e.preventDefault()
                // }
                color: "#006497",
              }}
              // label="Select filter"
              InputLabelProps={{
                style: { fontSize: 12, color: "#006497" },
              }}
              value={filter}
              style={{
                width: "180px",
                marginRight: "20px",
                color: "#006497 !important",
              }}
              onChange={(event) => {
                setFilter(event.target.value);
                if (
                  event.target.value != "star" &&
                  event.target.value != "year"
                ) {
                  setValue(0);
                }
              }}
            >
              <MenuItem
                value={"asc"}
                key={"0"}
                style={{ color: "#006497", fontSize: "14px" }}
              >
                Hardness: Low to High
              </MenuItem>
              <MenuItem
                value={"dsc"}
                key={"1"}
                style={{ color: "#006497", fontSize: "14px" }}
              >
                Hardness: High to Low
              </MenuItem>
              <MenuItem
                value={"star"}
                key={"2"}
                onClick={handleClick}
                style={{ color: "#006497", fontSize: "14px" }}
              >
                {/* <Box
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
            </Box> */}
                Select Hardness
              </MenuItem>
              <MenuItem
                value={"year"}
                key={"3"}
                onClick={handleClick2}
                style={{ color: "#006497", fontSize: "14px" }}
              >
                Select Yearwise
              </MenuItem>
            </TextField>
            {filter == "star" && (
              <>
                <Box
                  sx={{
                    width: 220,
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                  className="rating-box"
                >
                  <Rating
                    ref={selfref}
                    aria-describedby={id}
                    variant="contained"
                    name="hover-feedback"
                    value={value}
                    disableFocusRipple={true}
                    // style={{pointerEvents:`${filter=="star"?"none":"auto"}`}}

                    precision={1}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(-1);
                    }}
                    emptyIcon={
                      <StarIcon
                        style={{ opacity: 0.55 }}
                        fontSize="inherit"
                        // sx={{
                        //   color:"grey !important"
                        // }}
                      />
                    }
                  />
                  <div
                    style={{
                      position: "absolute",
                      fontSize: "10px",
                      bottom: "-4px",
                    }}
                  >
                    SELECT RATING
                  </div>
                </Box>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>Select rating</Typography>
                </Popover>
              </>
            )}
            {filter == "year" && (
              <TextField
              style={{ width: "100px", marginRight: "20px", height: "400px !important" }}
              className="Yearwise-list"
                size="small"
                ref={selfref2}
                select
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {yeardata.map((a, index) => {
                  return (
                    <MenuItem value={a} key={index}>
                      {a}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          </div>
        )}

        <div>Level {props.paper.level} </div>
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
                      background: props.answers.filter(
                        (a) =>
                          a.qid == (questions[ind] ? questions[ind].qid : 0)
                      )[0].isBookmarked
                        ? // background: props.answers.filter((a)=>(a.qid==questions[answers[ind].number].qid))[0].isBookmarked

                          "#ff9700"
                        : props.answers.filter(
                            (a) =>
                              a.qid == (questions[ind] ? questions[ind].qid : 0)
                          )[0].isAnswered
                        ? "#3B95C2"
                        : "white",
                      color:
                        props.answers.filter(
                          (a) =>
                            a.qid == (questions[ind] ? questions[ind].qid : 0)
                        )[0].isBookmarked ||
                        props.answers.filter(
                          (a) =>
                            a.qid == (questions[ind] ? questions[ind].qid : 0)
                        )[0].isAnswered
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
