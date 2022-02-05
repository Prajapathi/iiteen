import React from "react";
import firebase from "firebase";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Prompt } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import PaperInfo from "./elements/PaperInfo";
import Questions from "./Questions";
import InstructionInfo from "./elements/InstructionInfo";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: "50px auto",
    justifyContent: "flex-start",
    border: "2px solid black",
    width: "80%",
  },
  textField: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2),
    maxWidth: 150,
    minWidth: 150,
  },
}));

export default function Paper(props) {
  const classes = useStyles();
  const location = useLocation();
  let history = useHistory();

  const [numberQ, setNumberQ] = React.useState(0);
  const [paperInfo, setPaperInfo] = React.useState([]);
  const [instructionInfo, setInstructionInfo] = React.useState([]);
  const [subjectwiseClass, setSubjectwiseClass] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [showQuestion, setShowQuestion] = React.useState(false);
  const [refid, setRefid] = React.useState();
  const [paperRoute, setpaperRoute] = React.useState();
  const [pSaveName, setpSaveName] = React.useState();
  const [sectionNo, setSectionNo] = React.useState(
    location.state ? (location.state.subjectwise == true ? 1 : 0) : 0
  );
  const [secQNo, setSecQNo] = React.useState(0);
  const [allowSec, setAllowSec] = React.useState(false);
  const [sections, setSections] = React.useState(["", "", ""]);
  const [subjectwiseSub, setSubjectwiseSub] = React.useState(0);

  React.useEffect(() => {
    localStorage.setItem("savingPaper", false);
    let paperType = localStorage.getItem("paperType");
    if (
      paperType != "1" &&
      paperType != "2" &&
      paperType != "3" &&
      paperType != "subjectwise"
    ) {
      history.push("/AddPaper");
    } else {
      localStorage.removeItem("paperType");
      setpaperRoute(
        location.state.subjectwise == true
          ? "SUBJECTWISE"
          : location.state.paperType == "1"
          ? "AITS"
          : location.state.paperType == "2"
          ? "PREVIOUS"
          : "MOCK"
      );
    }
    // history.listen((loc, action) =>
    //     (action === 'POP')?
    //         window.confirm("ok?")
    //      :null
    //     // do stuff
    //     )
    // window.onpopstate  = (e) => {
    //     const rs=window.confirm("ok?");
    //     if(rs==false){
    //         console.log("chan")
    //         window.history.pushState(null, null, "/Paper");
    //     }
    // }
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  React.useEffect(() => {
    let arr = [];
    for (let i = 0; i < Number(sectionNo); i++) {
      arr.push({ section: "", numberOfQuestions: 0, marks: 0, negative: 0 });
    }
    if (location.state.subjectwise == true) {
      arr = [
        {
          section: 0,
          numberOfQuestions: paperInfo.noOfQuestions,
          marks: 2,
          negative: 0,
        },
      ];
    }
    setSections(arr);
  }, [sectionNo]);

  React.useEffect(() => {
    let num = 0;
    let allow = true;
    for (let i = 0; i < Number(sectionNo); i++) {
      num += Number(sections[i].numberOfQuestions);
      if (
        sections[i].numberOfQuestions == 0 ||
        sections[i].section == "" ||
        sections[i].marks == 0
      ) {
        allow = false;
      }
    }
    setAllowSec(allow);
    setSecQNo(num);
  }, [sections]);

  React.useEffect(() => {
    if (location.state.subjectwise != true) {
      return;
    }
    setSections([
      {
        section: 0,
        numberOfQuestions: paperInfo.noOfQuestions,
        marks: 2,
        negative: 0,
      },
    ]);
  }, [paperInfo.noOfQuestions]);

  const setSectionInfo = (index, data, type) => {
    let secTemp = [...sections];
    secTemp[index][type] = data;
    setSections(secTemp);
  };

  const addPaper = () => {
    if (
      location.state.subjectwise == false &&
      3 * secQNo != paperInfo.noOfQuestions
    ) {
      window.alert(
        "Please enter number of questions in respective sections correctly."
      );
      return;
    }
    if (location.state.subjectwise == false && allowSec == false) {
      window.alert("Please fill all details about sections correctly.");
      return;
    }
    const pname = paperInfo.name;
    setpSaveName(paperInfo.name);
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    setLoading(true);
    paperInfo.date = new Date(paperInfo.date);

    if (location.state.subjectwise == true) {
      // let paperSub=subjectwiseSub==1?"Physics":subjectwiseSub==2?"Chemistry":"Maths"
      // const paperRef = db.collection(paperRoute).doc("Class 11").collection(paperSub).doc("chapter").collection("Level 0").doc(pname).set({
      // ...paperInfo,instructionInfo
      // }).then((res)=>{
      //     setLoading(false);
      //     setShowQuestion(true);
      //     setRefid(res.id)//history.push('/Questions', { number:numberQ,subjective:location.state.subjective,paperType:location.state.paperType,paperRoute:paperRoute,paperRef:res.id})
      // }).catch((error)=>{
      //     setLoading(false);
      //     console.log("Error saving the document: ",error)
      // })
      setLoading(false);
      localStorage.setItem("subject", subjectwiseSub);
      localStorage.setItem("noOfQuestions", paperInfo.noOfQuestions);
      setShowQuestion(true);
      console.log("Subjectwise Paper Submitted");
    } else {
      const paperRef = db
        .collection(paperRoute)
        .doc(pname)
        .set({
          ...paperInfo,
          instructionInfo,
        })
        .then((res) => {
          setLoading(false);
          localStorage.setItem("noOfQuestions", numberQ);
          setShowQuestion(true);
          setRefid(res.id);
          //history.push('/Questions', { number:numberQ,subjective:location.state.subjective,paperType:location.state.paperType,paperRoute:paperRoute,paperRef:res.id})
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error saving the document: ", error);
        });
    }
  };
  return (
    <div>
      {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
      {loading == true ? (
        <CircularProgress style={{ margin: "25% 50%" }} />
      ) : showQuestion == false ? (
        <>
          <PaperInfo
            sendNumberQ={setNumberQ}
            sendInfo={setPaperInfo}
            subjectwise={location.state ? location.state.subjectwise : null}
            sendSubjectwiseClass={setSubjectwiseClass}
            sendSubjectwiseSub={setSubjectwiseSub}
          />

          {location.state.subjectwise == false ? (
            <div
              style={{
                width: "80%",
                margin: "100px 10%",
                padding: "20px",
                border: "2px dashed black",
                background: "#EEEFED",
              }}
            >
              <TextField
                id="standard-select-currency"
                type="number"
                label="Select"
                value={sectionNo}
                onChange={(event) =>
                  event.target.value >= 0
                    ? setSectionNo(event.target.value)
                    : null
                }
                helperText="Number of Sections"
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                }}
              />

              {
                //sectionNo==1?
                sections.map((item, index) => (
                  <div
                    style={{
                      width: "80%",
                      padding: "20px",
                      margin: "20px 10%",
                    }}
                  >
                    {index + 1}
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Select section"
                      className={classes.textField}
                      value={sections[index] ? sections[index].section : null}
                      onChange={(event) =>
                        setSectionInfo(index, event.target.value, "section")
                      }
                    >
                      <MenuItem value="1"> Integer</MenuItem>
                      <MenuItem value="2"> Numerical</MenuItem>
                      <MenuItem value="3"> Single Correct</MenuItem>
                      <MenuItem value="4"> Multiple Correct</MenuItem>
                      <MenuItem value="5"> Paragraph</MenuItem>
                    </TextField>

                    <TextField
                      id="standard-number"
                      type="number"
                      label="No. of Questions"
                      className={classes.textField}
                      value={
                        sections[index]
                          ? sections[index].numberOfQuestions
                          : null
                      }
                      InputProps={{
                        inputProps: {
                          min: 1,
                        },
                      }}
                      onChange={(event) =>
                        event.target.value >= 0
                          ? setSectionInfo(
                              index,
                              event.target.value,
                              "numberOfQuestions"
                            )
                          : null
                      }
                    />

                    <TextField
                      id="standard-number"
                      type="number"
                      label="Marks"
                      className={classes.textField}
                      value={sections[index] ? sections[index].marks : null}
                      InputProps={{
                        inputProps: {
                          min: 1,
                        },
                      }}
                      onChange={(event) =>
                        event.target.value >= 0
                          ? setSectionInfo(index, event.target.value, "marks")
                          : null
                      }
                    />

                    <TextField
                      id="standard-number"
                      type="number"
                      label="Negative Marking"
                      className={classes.textField}
                      value={sections[index] ? sections[index].negative : null}
                      InputProps={{
                        inputProps: {
                          min: 1,
                        },
                      }}
                      onChange={(event) =>
                        event.target.value >= 0
                          ? setSectionInfo(
                              index,
                              event.target.value,
                              "negative"
                            )
                          : null
                      }
                    />
                    <br />
                  </div>
                ))
              }
            </div>
          ) : null}

          {!(location.state ? location.state.subjectwise : null) ? (
            <InstructionInfo
              paperType={paperInfo.paperType}
              sendInfo={setInstructionInfo}
            />
          ) : null}
          {paperInfo.name == "" ||
          paperInfo.totalDuration == "" ||
          paperInfo.totalMarks == "" ||
          paperInfo.noOfQuestions == "" ||
          paperInfo.toBeAttempted == "" ||
          paperInfo.noOfQuestions == "0" ||
          Number(paperInfo.noOfQuestions) % 3 != 0 ? null : (
            <button
              style={{
                width: "60%",
                margin: "0px 20% 20px 20%",
                background: "#388cf2",
                color: "white",
                border: "1px solid white",
                borderRadius: "20px",
              }}
              onClick={addPaper}
            >
              Continue
            </button>
          )}
          {location.state.subjectwise == true &&
          paperInfo.name != "" &&
          paperInfo.noOfQuestions != "" &&
          paperInfo.level != "" ? (
            <button
              style={{
                width: "60%",
                margin: "0px 20% 20px 20%",
                background: "#388cf2",
                color: "white",
                border: "1px solid white",
                borderRadius: "20px",
              }}
              onClick={addPaper}
            >
              Continue
            </button>
          ) : null}
        </>
      ) : (
        <Questions
          subjectwise={location.state.subjectwise}
          subjectwiseClass={subjectwiseClass}
          level={paperInfo.level}
          sectionInfo={sections}
          paperType={location.state.paperType}
          paperRoute={paperRoute}
          pname={pSaveName}
          paperRef={refid}
        />
      )}
    </div>
  );
}
