import React from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import {
  fetchPaper,
  restorePreviousAttempt,
} from "../../../store/action/Paper";
import { Link, useLocation, useHistory } from "react-router-dom";
import "../../../styles/MockTestCard.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function MockTestCard(props) {
  let history = useHistory();
  const [openReattempt, setOpenReattempt] = React.useState(false);
  const [openContinuePreviousAttempt, setOpenContinuePreviousAttempt] =
    React.useState(false);
  const [prevAttempt, setPrevAttempt] = React.useState(false);
  const [totalmarks,setTotalmarks]=React.useState(0);
  const markdistribution=[[3,1,0],[4,2,0],[3,1,0],[3,1,0]]

React.useEffect(()=>{
  console.log(props.paper.sections)
        let tm=0;
        let marksdistributiontype=0;
  props.paper.sections && props.paper.sections.map((item,i)=>{
    // console.log("hello")
    marksdistributiontype=item.type=="singletype"?0:item.type=='multipletype'?1:item.type=='integertype'?2:3;
    // console.log(marksdistributiontype)
    tm+=Number(item.noofques)*markdistribution[marksdistributiontype][0];
})
console.log(3*tm)
setTotalmarks(3*tm);
},[])

  //for checking if user has any previous attempt which wasn't submitted
  const checkPreviousAttempt = () => {
    //retrieve previous attempt from local storage for this particular user using uid
    let previousAttempt = localStorage.getItem(props.user.uid);
    // console.log("hm?", props.user.uid, previousAttempt, previousAttempt[0]);
    // //if any previous attempt for this paper exists, then ask user if they want to continue
    if (
      previousAttempt != null &&
      previousAttempt[0] == "{" &&
      JSON.parse(previousAttempt)[`PAPER${props.papernumber}`] != null
    ) {
      setOpenContinuePreviousAttempt(true);
      console.log("ok?", JSON.parse(previousAttempt));
    }
    //if no previous attempt for this paper exists, then call the function to get paper
    else {
      console.log("local does not exist");
      getPaper();
    }
  };

  //if the user has unfinished previous attempt and wants to continue with it, then store this previous attempt from loaclStorage to
  //redux storage and then call the getPaper() function
  const sendAttemptToStore = () => {
    //store the previous attempt to redux store and set previousAttemptExists:true
    let previousAttempt = localStorage.getItem("uid");
    props.restorePreviousAttempt({
      answers: JSON.parse(previousAttempt)[`PAPER${props.papernumber}`],
      uid: props.user.uid,
    });
    setPrevAttempt(true);
    //now forward the user to the paper via getPaper()
    getPaper();
  };

  //fetch paper and put it into redux store
  const getPaper = () => {
    const db = firebase.firestore();
    props.setLoading(true);
    db.collection("MOCK")
    .doc(`${props.papertype=='mains'?"MAINS":"ADVANCE"}`)
      .collection("PAPER")
      .doc(`PAPER${props.papernumber}`)
      .collection("question")
      .get()
      .then(function (querySnapshot) {
        let questions = [];
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          questions.push({ ...doc.data(), qid: doc.id });
        });

        console.log("Here are the questions", questions);
        if (questions.length == 0) {
          history.push("/QuestionsError");
        } else {
          //sort questions based on number
          questions.sort(function (a, b) {
            return a.number - b.number;
          });

          const obj = { ...props.paper, questions: questions,noOfQuestions: props.paper.noofques };

          //put into redux store
          props.fetchPaper(obj);

          console.log(`PAPER${props.papernumber}`)

          //to check if user is navigating through MockTestCard
          localStorage.setItem("PaperName", `PAPER${props.papernumber}`);

          //if unfinished previous attempt is not present call restore paper with false value
          props.restorePreviousAttempt({ answers: false, uid: props.user.uid });

          props.setLoading(false);
          history.push(`${props.papertype=='mains'?"MAINS":"ADVANCE"}`+"/Papers/PAPER" + props.papernumber);
        }
      })
      .catch(function (error) {
        props.setLoading(false);
        history.push("/QuestionsError");
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <div className="flip-card-mock">
      <div className="flip-card-inner-mock">
        <div className="flip-card-front-mock">
          <div id="card-title-mock">
            <div style={{ fontSize: "26px" }}>{`PAPER${props.papernumber}`}</div>
          </div>
          <div id="card-content-mock">
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "14px", color: "#448698" }}>
                No of Question:{" "}
              </div>
              <div style={{ fontSize: "14px", color: "#448698" }}>
                {props.paper.noofques?props.paper.noofques:0}{" "}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "14px", color: "#448698" }}>
                Duration:{" "}
              </div>
              <div style={{ fontSize: "14px", color: "#448698" }}>
                {props.paper.totalDuration?props.paper.totalDuration:"180"} minutes
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "14px", color: "#448698" }}>
                Max Marks{" "}
              </div>
              <div style={{ fontSize: "14px", color: "#448698" }}>
                {totalmarks}
              </div>
            </div>
          </div>

          {/* if this paper is selected, fetch the questions it consists */}
          <div className="card-button-mock">
            <button
              onClick={
                props.isAttempted
                  ? () => setOpenReattempt(true)
                  : () => checkPreviousAttempt()
              }
            >
              {props.isAttempted ? "Re-attempt" : "Attempt"}
            </button>
            {props.isAttempted ? (
              <Link to={`/MockTest/${props.papertype=='mains'?"MAINS":"ADVANCE"}/Papers/Analysis/` + `PAPER${props.papernumber}`}>
                <button>Analysis</button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {/* dialog box to ask if user wants to reattempt a paper */}
      <Dialog
        open={openReattempt}
        onClose={() => setOpenReattempt(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"Re-attempt Paper?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will lose your data on re-attempting.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => checkPreviousAttempt()}
            style={{ color: "#3B95C2" }}
          >
            Continue
          </Button>
          <Button
            onClick={() => setOpenReattempt(false)}
            style={{ color: "#3B95C2" }}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog box to ask if user wants to continue with their previous unfinished attempt of the paper */}
      <Dialog
        open={openContinuePreviousAttempt}
        onClose={() => setOpenContinuePreviousAttempt(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">
          {"Continue Previous Attempt?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can continue your previous attempt from where you left.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => sendAttemptToStore()}
            style={{ color: "#3B95C2" }}
          >
            Continue From Where You Left
          </Button>
          <Button onClick={() => getPaper()} style={{ color: "#3B95C2" }}>
            Start Over
          </Button>
        </DialogActions>
      </Dialog>
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
    restorePreviousAttempt: (previousPaperDetails) =>
      dispatch(restorePreviousAttempt(previousPaperDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MockTestCard);
