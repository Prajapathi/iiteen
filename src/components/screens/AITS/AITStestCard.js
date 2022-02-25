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
import padlock from "../../../assets/images/padlock.png";

export function AITStestCard(props) {
  let history = useHistory();
  const [openReattempt, setOpenReattempt] = React.useState(false);
  const [openContinuePreviousAttempt, setOpenContinuePreviousAttempt] =
    React.useState(false);
  const [prevAttempt, setPrevAttempt] = React.useState(false);
  const [totalmarks, setTotalmarks] = React.useState(0);
  const markdistribution = [
    [3, 1, 0],
    [4, 2, 0],
    [3, 1, 0],
    [3, 1, 0],
  ];

  React.useEffect(() => {
    console.log(props.paper.sections);
    let tm = 0;
    let marksdistributiontype = 0;
    props.paper.sections &&
      props.paper.sections.map((item, i) => {
        // console.log("hello")
        marksdistributiontype =
          item.type == "singletype"
            ? 0
            : item.type == "multipletype"
            ? 1
            : item.type == "integertype"
            ? 2
            : 3;
        // console.log(marksdistributiontype)
        tm +=
          Number(item.noofques) * markdistribution[marksdistributiontype][0];
      });
    console.log(3 * tm);
    setTotalmarks(3 * tm);
  }, []);

  console.log(props);

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
    db.collection("AITS")
      .doc(`${props.papertype == "mains" ? "MAINS" : "ADVANCE"}`)
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

          const obj = {
            ...props.paper,
            questions: questions,
            noOfQuestions: props.paper.noofques,
          };

          //put into redux store
          props.fetchPaper(obj);

          console.log(`PAPER${props.papernumber}`);

          //to check if user is navigating through MockTestCard
          localStorage.setItem("PaperName", `PAPER${props.papernumber}`);

          //if unfinished previous attempt is not present call restore paper with false value
          props.restorePreviousAttempt({ answers: false, uid: props.user.uid });

          props.setLoading(false);
          history.push(
            `/Aitstest/${props.papertype == "mains" ? "MAINS" : "ADVANCE"}` +
              "/Papers/PAPER" +
              props.papernumber
          );
        }
      })
      .catch(function (error) {
        props.setLoading(false);
        history.push("/QuestionsError");
        console.log("Error getting documents: ", error);
      });
  };

  function getMonth(num) {
    switch (num) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default: return "Jan"
    }
  }

  function datecalculation(date1,date2,shift){
    console.log(date1.toISOString(),date1.getHours(),date2,shift,new Date(date2))
    if(shift=="shift1"){
      console.log(new Date(date2+"T09:00:00+05:30"))
      if(new Date(date2+"T09:00:00+05:30").getTime()-date1.getTime()<=8.64e+7){
        return true
      }
    }
    if(shift=="shift2"){
      console.log(new Date(date2+"T13:00:00+05:30"))
      if(new Date(date2+"T13:00:00+05:30").getTime()-date1.getTime()<=8.64e+7){
        return true
      }
    }
    return false;

  }

  return (
    <div className="flip-card-mock">
      <div className="flip-card-inner-mock">
        <div className="flip-card-front-mock">
          <div id="card-title-mock">
            <div style={{ fontSize: "26px" }}>
              {`PAPER ${props.paperindex}`}
              {props.papertype == "mains" ? "(M)" : "(A)"}
            </div>
          </div>
          <div id="card-content-mock">
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "14px", color: "#448698" }}>Date: </div>
              <div style={{ fontSize: "14px", color: "#448698" }}>
                {props.paper.date ? props.paper.date.substring(8, 10) : 0}{" "}
                {props.paper.date
                  ? getMonth(props.paper.date.substring(5, 7))
                  : 0}{" "}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "14px", color: "#448698" }}>Time: </div>
              <div style={{ fontSize: "14px", color: "#448698" }}>
                {props.paper.shift
                  ? props.paper.shift == "shift1"
                    ? "9:00 AM"
                    : "1:00 PM"
                  : 0}{" "}
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
              <div style={{ fontSize: "14px", color: "#448698" }}>3 hours</div>
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
            {props.heading == "Upcoming Test" ? (
              <div>
                {datecalculation(new Date(),props.paper.date,props.paper.shift) ? <button
                  onClick={
                    // props.isAttempted
                    //   ? () => setOpenReattempt(true)
                    //   : 
                      () => checkPreviousAttempt()
                  }
                >
                  {"Attempt"}
                </button>:<img src={padlock} style={{ height: "22px" }} alt="lock" />}
                
              </div>
            ) : (
              <div>
                <button
                  onClick={
                    // props.isAttempted
                    //   ?
                       () => setOpenReattempt(true)
                      // : () => checkPreviousAttempt()
                  }
                  style={{marginRight:"10px"}}
                >
                  {/* {props.isAttempted ? "Re-attempt" : "Attempt"} */}
                  Re-Attempt
                </button>
                {/* {props.isAttempted ? ( */}
                  <Link
                    to={
                      `/AitsTest/${
                        props.papertype == "mains" ? "MAINS" : "ADVANCE"
                      }/Papers/Analysis/` + `PAPER${props.papernumber}`
                    }
                  >
                    <button>Analysis</button>
                  </Link>
                {/* ) : null} */}
              </div>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(AITStestCard);
