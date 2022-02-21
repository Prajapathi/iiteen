/* eslint-disable eqeqeq */
/* eslint-disable no-loop-func */
import React, { useEffect } from "react";
import firebase from "firebase";
import { Link, useLocation, useHistory } from "react-router-dom";
import Question from "./elements/Question";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Questions(props) {
  const location = useLocation();
  const history = useHistory();
  const [index, setIndex] = React.useState(0);
  const [questionArray, setQuestionArray] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [imagesNum, setImagesNum] = React.useState(0);
  const [flag, setFlag] = React.useState(false);
  const [numberQ, setnumberQ] = React.useState(0);
  const [saveQ, setSaveQ] = React.useState(false);
  const [subjectwiseSub, setSubjectwiseSub] = React.useState("");
  const [savelastone, setSavelastone] = React.useState(false);
  const [lastsaveindex, setLastsaveindex] = React.useState(-1);
  const [indextoidmap, setIndextoidmap] = React.useState([]);

  useEffect(() => {
    setnumberQ(localStorage.getItem("noOfQuestions"));
    localStorage.removeItem("noOfQuestions");
    if (props.subjectwise == true) {
      setSubjectwiseSub(localStorage.getItem("subject"));
      localStorage.removeItem("subject");
    }
  }, []);

  async function uploadImg() {
    let imgtemp = [];
    let imageNum = 0;
    for (let i = 0; i < questionArray.length; i++) {
      for (let j = 0; j < questionArray[i].question.length; j++) {
        if (questionArray[i].question[j].type == "3") {
          imageNum++;
          imgtemp.push({
            i,
            j,
            k: 0,
            s: "question",
            file: questionArray[i].question[j].data,
          });
        }
      }
      for (let j = 0; j < questionArray[i].solution.length; j++) {
        if (questionArray[i].solution[j].type == "3") {
          imageNum++;
          imgtemp.push({
            i,
            j,
            k: 0,
            s: "solution",
            file: questionArray[i].solution[j].data,
          });
        }
      }
      for (let j = 0; j < questionArray[i].hint.length; j++) {
        if (questionArray[i].hint[j].type == "3") {
          imageNum++;
          imgtemp.push({
            i,
            j,
            k: 0,
            s: "hint",
            file: questionArray[i].hint[j].data,
          });
        }
      }
      for (let j = 0; j < questionArray[i].option.length; j++) {
        if (questionArray[i].option[j] == null) continue;
        if (questionArray[i].option[j].type == "3") {
          imageNum++;
          imgtemp.push({
            i,
            j,
            k: 0,
            s: "option",
            file: questionArray[i].option[j].data,
          });
        }
      }
    }
    if (imgtemp.length == 0) {
      // savePaperFB()
      outerFunction();
    } else {
      setImages(imgtemp);
      setImagesNum(imageNum);
    }
  }
  useEffect(() => {
    if (flag == true) {
      outerFunction();
    }
  }, [flag]);

  useEffect(() => {
    if (saveQ == true) {
      history.push("/AddPaper");
    }
  }, [saveQ]);

  useEffect(() => {
    if (imagesNum != 0 && images.length == imagesNum) {
      HandleImageUpload();
    }
  }, [images]);

  async function HandleImageUpload() {
    const storage = firebase.storage();
    let flagNum = 0;
    let t;
    let paperTypeHere =
      props.paperType == 1
        ? "AITS"
        : props.paperType == 2
        ? "PREVIOUS"
        : "MOCK";
    for (let l = 0; l < images.length; l++) {
      if (props.subjectwise == false) {
        const uploadTask = storage
          .ref(
            `/${paperTypeHere}/${props.pname}/${images[l].i}/${images[l].file.name}`
          )
          .put(images[l].file);
        t = await uploadTask.on(
          "state_changed",
          (snapShot) => {},
          (err) => {
            //catches the errors
            console.log(err);
          },
          () => {
            storage
              .ref(`${paperTypeHere}/${props.pname}/${images[l].i}`)
              .child(images[l].file.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                const imgURL = fireBaseUrl;
                const t = [...questionArray];
                if (images[l].s == "question") {
                  t[images[l].i].question[images[l].j].data = imgURL;
                } else if (images[l].s == "solution") {
                  t[images[l].i].solution[images[l].j].data = imgURL;
                } else if (images[l].s == "hint") {
                  t[images[l].i].hint[images[l].j].data = imgURL;
                } else {
                  t[images[l].i].option[images[l].j].data = imgURL;
                }
                setQuestionArray(t);
                flagNum++;
                if (flagNum == images.length) {
                  setFlag(true);
                }
                // savePaperFB()
              });
          }
        );
      } else {
        let subHere =
          subjectwiseSub == 1
            ? "Physics"
            : subjectwiseSub == 2
            ? "Chemistry"
            : "Maths";
        const uploadTask = storage
          .ref(
            `/SUBJECTWISE/Class ${props.subjectwiseClass}/${subHere}/${props.pname}/Level 0${props.level}/${images[l].i}/${images[l].file.name}`
          )
          .put(images[l].file);
        t = await uploadTask.on(
          "state_changed",
          (snapShot) => {},
          (err) => {
            //catches the errors
            console.log(err);
          },
          () => {
            storage
              .ref(
                `SUBJECTWISE/Class ${props.subjectwiseClass}/${subHere}/${props.pname}/Level 0${props.level}/${images[l].i}`
              )
              .child(images[l].file.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                const imgURL = fireBaseUrl;
                const t = [...questionArray];
                if (images[l].s == "question") {
                  t[images[l].i].question[images[l].j].data = imgURL;
                } else if (images[l].s == "solution") {
                  t[images[l].i].solution[images[l].j].data = imgURL;
                } else if (images[l].s == "hint") {
                  t[images[l].i].hint[images[l].j].data = imgURL;
                } else {
                  t[images[l].i].option[images[l].j].data = imgURL;
                }
                setQuestionArray(t);
                flagNum++;
                if (flagNum == images.length) {
                  setFlag(true);
                }
                // savePaperFB()
              });
          }
        );
      }
    }
    return t;
  }
  const savePaper = () => {
    setLoading(true);
    uploadImg();
  };
  // const savePaperFB=()=>{
  //     const db = firebase.firestore();

  //     db.settings({
  //         timestampsInSnapshots: true
  //     });
  //     // for(let i=0;i<questionArray.length;i++){

  //     // }
  //     const userRef = db.collection(`${props.paperRoute}/${props.paperRef}/Questions`).add({
  //             questionArray
  //     }).then((res)=>{
  //         history.push('/AddPaper')
  //     }).catch((error)=>{
  //         console.log("Error saving the document: ",error);
  //     })
  // }
  // async function uploadQuestionAsPromise(file){
  //     const db = firebase.firestore();
  //     db.settings({
  //         timestampsInSnapshots: true
  //     });
  //     console.log(props.pname)
  //     const userRef = db.collection(`${props.paperRoute}/${props.pname}/Questions`).add({
  //             ...file
  //     }).then((res)=>{
  //          setSaveQ(saveQ+1)
  //         console.log("yee",file)

  //        // history.push('/AddPaper')
  //     }).catch((error)=>{
  //         console.log("Error saving the document: ",error);
  //     })
  // }

  async function uploadFiles() {
    let qs = 0;
    console.log(savelastone);
    for (let file of savelastone ? [questionArray[index]] : questionArray) {
      console.log(index,lastsaveindex)
      if (index > lastsaveindex) {
        const db = firebase.firestore();
        db.settings({
          timestampsInSnapshots: true,
        });
        console.log(props.pname);
        if (props.subjectwise == false) {
          const userRef = db
            .collection(`${props.paperRoute}/${props.pname}/Questions`)
            .add({
              ...file,
            })
            .then((res) => {
              // indextoidmap.push(res.id)
              indextoid(index,res.id)
              setLastsaveindex(index)
              qs++;
              console.log("Question uploaded: ", file);
              if (qs == numberQ) {
                setSaveQ(true);
              }
              toast.success("SUBMITTED");
              // history.push('/AddPaper')
            })
            .catch((error) => {
              console.log("Error saving the document: ", error);
            });
        } else {
          let paperSub =
            subjectwiseSub == 1
              ? "Physics"
              : subjectwiseSub == 2
              ? "Chemistry"
              : "Maths";
          const userRef = db
            .collection(
              `SUBJECTWISE/Class ${props.subjectwiseClass}/${paperSub}/${props.pname}/Level 0${props.level}`
            )
            .add({
              ...file,
            })
            .then((res) => {
              // indextoidmap.push(res.id)
              indextoid(index,res.id)
              setLastsaveindex(index)
              qs++;
              console.log("Question uploaded: ", file);
              if (qs == numberQ) {
                setSaveQ(true);
              }
              toast.success("SUBMITTED");
              // history.push('/AddPaper')
            })
            .catch((error) => {
              console.log("Error saving the document: ", error);
            });
        }
      }else{
        const db = firebase.firestore();
        db.settings({
          timestampsInSnapshots: true,
        });
        console.log(props.pname);
        if (props.subjectwise == false) {
          const userRef = db
            .collection(`${props.paperRoute}/${props.pname}/Questions`)
            .doc(indextoidmap[index]).update({
              ...file,
            })
            .then((res) => {
              qs++;
              console.log("Question uploaded: ", file);
              if (qs == numberQ) {
                setSaveQ(true);
              }
              toast.success("UPDATED");
              // history.push('/AddPaper')
            })
            .catch((error) => {
              console.log("Error saving the document: ", error);
            });
        } else {
          let paperSub =
            subjectwiseSub == 1
              ? "Physics"
              : subjectwiseSub == 2
              ? "Chemistry"
              : "Maths";
          const userRef = db
            .collection(
              `SUBJECTWISE/Class ${props.subjectwiseClass}/${paperSub}/${props.pname}/Level 0${props.level}`
            )
            .doc(indextoidmap[index]).update({
              ...file,
            })
            .then((res) => {
              qs++;
              console.log("Question uploaded: ", file);
              if (qs == numberQ) {
                setSaveQ(true);
              }
              toast.success("UPDATED");
              // history.push('/AddPaper')
            })
            .catch((error) => {
              console.log("Error saving the document: ", error);
            });
        }
      }
    }
  }
  function indextoid(index,id){
    let arr=[...indextoidmap]
    arr.push(id)
    setIndextoidmap(arr)
  }

  async function outerFunction() {
    await uploadFiles();
    //new code
    if (index == numberQ - 1) {
      setSaveQ(true);
    }
    setLoading(false);
    
    //
  }

  const confirmSave = () => {
    // let save = window.confirm("Do you want to save the paper?");
    // if (save == true) {
    //   savePaper();
    // } else return;
    if (filledeverything()) {
      savePaper();
      return true;
    } else return false;
  };

  function filledeverything() {
    let flag = 0;
    if (
      questionArray[index].question[0].data == 0 ||
      questionArray[index].hint[0].data == 0 ||
      questionArray[index].solution[0].data == 0
    ) {
      flag = 1;
    } else if (
      questionArray[index].answerType == 4 ||
      questionArray[index].answerType == 5
    ) {
      if (
        questionArray[index].option[0].data == 0 ||
        questionArray[index].option[1].data == 0 ||
        questionArray[index].option[2].data == 0 ||
        questionArray[index].option[3].data == 0 ||
        questionArray[index].answer.length == 0
      ) {
        flag = 1;
      }
    } else if (
      questionArray[index].answerType == 1 ||
      questionArray[index].answerType == 2
    ) {
      if (questionArray[index].answer.length == 0) {
        flag = 1;
      }
    }
    if (flag == 1) {
      toast.warn("Are you sure you filled everything!");
      return false;
    } else return true;
  }

  return (
    <>
      {loading == true ? (
        <CircularProgress style={{ margin: "25% 50%" }} />
      ) : (
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Flip}
            toastStyle={{ backgroundColor: "black", color: "white" }}
          />
          <Question
            key={index}
            index={Number(index)}
            noOfQuestions={numberQ}
            subjectwise={props.subjectwise}
            subject={subjectwiseSub}
            infoArray={questionArray}
            sendInfo={setQuestionArray}
            sectionInfo={props.sectionInfo}
          />
          {index > 0 ? (
            <button
              style={{
                width: "60%",
                height: "40px",
                margin: "0px 20% 20px 20%",
                background: "#388cf2",
                color: "white",
                border: "1px solid white",
                borderRadius: "20px",
              }}
              onClick={() => {
                setIndex(index - 1);
                window.scrollTo(0, 0);
              }}
            >
              BACK
            </button>
          ) : null}
          {index <= numberQ - 1 ? (
            <button
              style={{
                width: "60%",
                margin: "0px 20% 20px 20%",
                background: "#388cf2",
                color: "white",
                border: "1px solid white",
                borderRadius: "20px",
              }}
              onClick={async () => {
                setSavelastone(true);
                if (!(await confirmSave())) {
                  return;
                }
                setIndex(index + 1);
                window.scrollTo(0, 0);
              }}
            >
              Continue
            </button>
          ) : //  (
          //   <button
          //     style={{
          //       width: "60%",
          //       height: "40px",
          //       margin: "0px 20% 20px 20%",
          //       background: "#388cf2",
          //       color: "white",
          //       border: "1px solid white",
          //       borderRadius: "20px",
          //     }}
          //     onClick={confirmSave}
          //   >
          //     SAVE PAPER
          //   </button>
          // )
          null}
          {/* {index == 0 ? (
            <button
              style={{
                width: "60%",
                height: "40px",
                margin: "0px 20% 20px 20%",
                background: "#388cf2",
                color: "white",
                border: "1px solid white",
                borderRadius: "20px",
              }}
              onClick={() => {
                confirmSave();
              }}
            >
              SAVE ONE QUESTION
            </button>
          ) : null} */}
        </div>
      )}
    </>
  );
}
