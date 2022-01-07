import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "../../../styles/PreviousYearSubjectCard.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  fetchPaper,
  fetchPreviousSubjectwiseAnswers,
} from "../../../store/action/Paper";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "white",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#448698",
  },
}))(LinearProgress);

export function PreviousYearSubjectCard(props) {
  let history = useHistory();
  const [paper, setPaper] = useState([]);
  const [classNumber, setClassNumber] = useState();
  const [level, setLevel] = useState();
  const [subject, setSubject] = useState();
  const [chapter, setChapter] = useState();
  const [answers, setAnswers] = useState(0);
  const [totalAttemped, setTotalAttempted] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lastIndex, setLastIndex] = useState([0]);

  useEffect(() => {
    setClassNumber(props.classNumber);

    let ch = props.number;
    if (props.number < 10) ch = "0" + props.number;
    setChapter(ch);

    let sub;
    if (props.subject == "physics") sub = "Physics";
    else if (props.subject == "chemistry") sub = "Chemistry";
    else sub = "Maths";
    setSubject(sub);

    //fetch attempted answers to show in progress bar
    const db = firebase.firestore();
    db.collection("User")
      .doc(props.user.uid)
      .collection("SUBJECTWISEPapers")
      .doc("Class " + props.classNumber)
      .collection(sub)
      .doc("Chapter " + ch)
      .get()
      .then((doc) => {
        if (doc.data() == null) {
          setLastIndex([0]);
          setTotalAttempted(0);
          setProgress(0);
          setAnswers({});
        } else {
          let totalQAttempted = 0,
            lastInd1 = 0,
            flag = 0;
          let lvl1 = doc.data()["Level 01"];
          console.log(lvl1);
          if (lvl1) {
            for (let i = 0; i < lvl1.length; i++) {
              if (lvl1[i].isAnswered === true) totalQAttempted++;
              else {
                if (flag == 0) {
                  lastInd1 = i;
                  flag = 1;
                }
              }
            }
          }
          setLastIndex([lastInd1]);
          setAnswers(doc.data());
          setTotalAttempted(totalQAttempted);
          setProgress((totalQAttempted / 25) * 100);
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        history.push("/QuestionsError");
      });
  }, [props.number]);

  const selectLevel = (lev) => {
    setLevel(lev);
    console.log("ohh", "Class " + classNumber, lev, subject, chapter);
    props.loadingStart(true);

    //Access question to pass as prop
    const db = firebase.firestore();
    db.collection("PREVIOUSYEARSUBJECTWISE")
      .doc("Class " + classNumber)
      .collection(subject)
      .doc("Chapter " + chapter)
      .collection("Level 0" + lev)
      .orderBy("number")
      .get()
      .then(function (querySnapshot) {
        let questions = [];
        querySnapshot.forEach(function (doc) {
          questions.push({ ...doc.data(), qid: doc.id });
        });
        console.log("k", questions);
        if (questions.length == 0) {
          history.push("/QuestionsError");
        } else {
          setPaper(questions);
          console.log("hmmm", questions);
          props.loadingStart(false);
          //put into redux store
          props.fetchPaper({
            questions,
            noOfQuestions: 25,
            name: props.name,
            subject,
            level: lev,
            classNumber,
            chapter,
            lastIndex: lastIndex[lev - 1],
          });

          //set Previously given answers for this level
          if (answers["Level 0" + lev]) {
            console.log("Yaha", chapter, answers["Level 0" + lev]);
            props.fetchPreviousSubjectwiseAnswers(answers["Level 0" + lev]);
          }

          //to check if user is navigating through SubjectCard
          localStorage.setItem("PaperName", "PreviousYear");
          history.push("Subjectwise/Papers/" + chapter);
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        history.push("/QuestionsError");
      });
  };

  return (
    <div className="prev-subj-card subject-card">
      <div className="prev-card-front">
        <div className="prev-card-title">
          <div style={{ fontSize: "26px" }}>Chapter {props.number}</div>
        </div>
        <div className="prev-card-content">
          <div style={{ fontSize: "24px", color: "#448698" }}>{props.name}</div>
          <div style={{ width: "80%" }}>
            <BorderLinearProgress
              variant="determinate"
              value={0}
              style={{ boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.3)" }}
            />
            <div style={{ color: "#448698", marginTop: "5px" }}> {0}/75</div>
            <button onClick={() => selectLevel(1)} className="prev-card-button">
              Attempt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPaper: (paper) => dispatch(fetchPaper(paper)),
    fetchPreviousSubjectwiseAnswers: (answers) =>
      dispatch(fetchPreviousSubjectwiseAnswers(answers)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviousYearSubjectCard);
