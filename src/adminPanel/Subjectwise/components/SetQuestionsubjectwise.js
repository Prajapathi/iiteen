import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Latex from "react-latex-next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SubjectwiseTyper from "./SubjectwiseTyper.js";
import {
  FormControlLabel,
  FormLabel,
  Checkbox,
  Button,
  TextField,
  MenuItem,
  Radio,
  FormGroup,
  RadioGroup,
} from "@material-ui/core";
// import { db } from "./firebase";
import firebase from "firebase";
import "../components/css/myCss.css";
import yeardata from "./data/year";
import { render } from "@testing-library/react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Syllabus from "./data/syllabus";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  1: "Very Easy",
  2: "Easy",
  3: "Medium",
  4: "Hard",
  5: "Very Hard",
};

toast.configure();

const SetQuestionsubjectwise = (props) => {
  var [questionDetail, setQuestionDetail] = useState("");
  var [option1, setOption1] = useState("");
  var [option2, setOption2] = useState("");
  var [option3, setOption3] = useState("");
  var [option4, setOption4] = useState("");
  var [questionType, setQuestionType] = useState("4");
  var [correct, setCorrect] = useState([]);
  var [editPaper, setEditPaper] = useState("");
  var [solution, setSolution] = useState("");
  var [hint, setHint] = useState("");
  var [year, setYear] = useState("");
  var [college, setCollege] = useState("");
  var history = useHistory();
  var [editable, setEditable] = useState([]);
  var [count, setCount] = useState(0);
  var [visible, setVisible] = useState(true);
  const [multiOption, setMultiOption] = React.useState([
    false,
    false,
    false,
    false,
  ]);
  const [allQuestions, setAllQuestions] = useState("");
  const [section, setSection] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [Id, setId] = useState(props.location.state.id);
  const [subj, setSubj] = useState("");

  const [locationKeys, setLocationKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);

  const numarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [Class, setClass] = useState(
    props.location.state.Class ? props.location.state.Class : null
  );

  console.log(props.location.state.Class, Class);
  // const Id = props.location.state.id;

  // this QuestionNo here is like index to the allQuestion array it is not the questionNo of the database
  const QuestionNo = props.location.state.QuestionNo;
  const Subject = props.location.state.Subject;
  // const Chapter = props.location.state.Chapter;
  const [Chapter, setChapter] = useState(
    props.location.state.Chapter ? props.location.state.Chapter : null
  );
  const mockpaperno = props.location.state.mockpaperno;
  const mainpapertype = props.location.state.mainpapertype;
  const Level=props.location.state.Level;
  // console.log(Class,Id,QuestionNo,Subject,Chapter);
  // const allQuestions = props.location.state.allQuestions;

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // Handle forward event
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);

          // Handle back event

          console.log("pop");
          history.push(
            `${
              Subject === "physics"
                ? "/0"
                : Subject === "chemistry"
                ? "/1"
                : Subject === "maths"
                ? "/2"
                : Subject === "mocktest"
                ? "/3"
                : "/4"
            }`
          );
          // }
        }
      }
    });
  }, [locationKeys, Subject]);

  // function getquestiontype(type) {
  //   if (type == "singletype") {
  //     return "4";
  //   } else if (type == "multipletype") {
  //     return "5";
  //   } else if (type == "integertype") {
  //     return "1";
  //   } else if (type == "numericaltype") {
  //     return "2";
  //   } else {
  //     console.log("wrong questiontype from mocktestadvance");
  //   }
  // }
  useEffect(() => {
    //new code
    // localStorage.setItem("count",1);
    //
    fetchPaper();
    fetchAllQuestions();
    if (Subject == "physics") {
      setSubj(1);
    } else if (Subject == "chemistry") {
      setSubj(2);
    } else if (Subject == "maths") {
      setSubj(3);
    }
    // console.log(Subject,QuestionNo)
    if (Subject === "mocktest") {
      // console.log(Subject,QuestionNo)
      if (
        (QuestionNo >= 1 && QuestionNo <= 20) ||
        (QuestionNo >= 31 && QuestionNo <= 50) ||
        (QuestionNo >= 61 && QuestionNo <= 80)
      ) {
        setQuestionType("4");
      } else {
        // setMocksingletype("numericaltype")
        setQuestionType("2");
      }
      if (QuestionNo >= 1 && QuestionNo <= 30) {
        // console.log(Subject,QuestionNo)
        setSubj(1);
      } else if (QuestionNo >= 31 && QuestionNo <= 60) {
        setSubj(2);
      } else setSubj(3);
    }
    // if (Subject === "mocktestadvance") {
    //   fetchmocktestadvancepatterndata();
    // }
  }, []);

  // useEffect(() => {
  //   if (section.length > 0) {
  //     console.log(section);
  //     let totalnoofquespersubject = 0;
  //     for (let i = 0; i < section.length; i++) {
  //       totalnoofquespersubject += Number(section[i].noofques);
  //     }
  //     if (QuestionNo >= 1 && QuestionNo <= totalnoofquespersubject) {
  //       setSubj(1);
  //     } else if (
  //       QuestionNo >= 1 + totalnoofquespersubject &&
  //       QuestionNo <= totalnoofquespersubject * 2
  //     ) {
  //       setSubj(2);
  //     } else setSubj(3);
  //     let aggregate = 0;
  //     for (let i = 0; i < section.length; i++) {
  //       if (
  //         (QuestionNo >= 1 + aggregate &&
  //           QuestionNo <= Number(section[i].noofques) + aggregate) ||
  //         (QuestionNo >= 1 + aggregate + totalnoofquespersubject &&
  //           QuestionNo <=
  //             Number(section[i].noofques) +
  //               aggregate +
  //               totalnoofquespersubject) ||
  //         (QuestionNo >= 1 + aggregate + totalnoofquespersubject * 2 &&
  //           QuestionNo <=
  //             Number(section[i].noofques) +
  //               aggregate +
  //               totalnoofquespersubject * 2)
  //       ) {
  //         setQuestionType(getquestiontype(section[i].type));
  //         break;
  //       }
  //       aggregate += Number(section[i].noofques);
  //     }
  //   }
  // }, [section, QuestionNo]);

  console.log("allQuestions", allQuestions);

  // console.log("user auth",firebase.auth().currentUser,firebase.auth())

  const submitPaper = async (e) => {
    setSubmitted(true);
    toast.success("SUBMITTED");
    console.log(Class,Subject,Chapter,Level)
    const db = firebase.firestore();
    var q = await db
        .collection("SUBJECTWISE")
        .doc(Class)
        .collection(Subject)
        .doc(Chapter);
    await q.set({ noofques: QuestionNo }, { merge: true });
    await q
      .collection(`Level 0${Level}`)
      .add({
        question: questionDetail,
        answerType: questionType,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        // option:option,
        answer: correct,
        hint: hint,
        solution: solution,
        year: year,
        college: college,
        number: `${QuestionNo}`,
        subject: subj,
        class: Class,
        chapter: Chapter,
        rating:value
      })
      .then((docref) => {
        console.log(
          "SUBMITTED",
          "     Your question has been uploaded to database ",
          docref.id
        );

        setId(docref.id);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log("NOT SUBMITTED");
        toast.error("NOT SUBMITTED");
        alert(error.message);
      });
  };
  const updatePaper = async (e) => {
    // const option=[option1,option2,option3,option4];
    // console.log("inside update paper");
    const db = firebase.firestore();
    if (Id) {
      toast.success("UPDATED");
      await db
      .collection("SUBJECTWISE")
      .doc(Class)
      .collection(Subject)
      .doc(Chapter)
      .collection(`Level 0${Level}`)
        .doc(Id)
        .update({

          question: questionDetail,
          answerType: questionType,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          // option:option,
          answer: correct,
          hint: hint,
          solution: solution,
          year: year,
          college: college,
          number: `${QuestionNo}`,
          class: Class,
          chapter: Chapter,
          rating:value
        })
        .then(() => {
          console.log(
            "UPDATED",
            "     Your question has been updated to database"
          );
        })
        .catch((error) => {
          console.log("NOT UPDATED");
          toast.error("NOT UPDATED");
          alert(error.message);
        });
    }

    // console.log("end of update paper");
  };

  const handleCheck = (index) => {
    if (questionType == 5) {
      const ans = [...multiOption];
      // if(ans[index]===true){

      // }
      ans[index] = !ans[index];
      setMultiOption(ans);
      // setCorrect(...correct,index)
      if (ans[index] === true) {
        setCorrect((current) => [...current, index]);
      } else {
        setCorrect(correct.filter((item) => item !== index));
      }
      console.log(correct);
    } else if (questionType == 4) {
      setCorrect([index]);
      console.log(correct);
    }
  };

  function handleOnDragEnd(field, result, droptype) {
    if (droptype === "option1") {
      const items = Array.from(field);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption1(items);
    }
    if (droptype === "question") {
      const items = Array.from(field);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setQuestionDetail(items);
    }
    if (droptype === "option1") {
      const items = Array.from(field);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption1(items);
    }
    if (droptype === "option2") {
      const items = Array.from(field);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption2(items);
    }
    if (droptype === "option3") {
      const items = Array.from(field);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption3(items);
    }
    if (droptype === "option4") {
      const items = Array.from(field);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption4(items);
    }
    if (droptype === "solution") {
      const items = Array.from(field);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setSolution(items);
    }
    if (droptype === "hint") {
      const items = Array.from(field);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setHint(items);
    }
  }

  function deleteElement(index, field, droptype) {
    const updateItems = field.filter((elm, ind) => {
      return index !== ind;
    });
    if (droptype === "question") {
      setQuestionDetail(updateItems);
    }
    if (droptype === "option1") {
      setOption1(updateItems);
    }
    if (droptype === "option2") {
      setOption2(updateItems);
    }
    if (droptype === "option3") {
      setOption3(updateItems);
    }
    if (droptype === "option4") {
      setOption4(updateItems);
    }
    if (droptype === "solution") {
      setSolution(updateItems);
    }
    if (droptype === "hint") {
      setHint(updateItems);
    }

    return updateItems;
  }

  async function fetchPaper() {
    if (Id) {
      const db = firebase.firestore();
      console.log(Id,Class,Subject,Chapter,Level);
      await db
          .collection("SUBJECTWISE")
          .doc(Class)
          .collection(Subject)
          .doc(Chapter)
          .collection(`Level 0${Level}`)
        .doc(Id)
        .get()
        .then((snap) => {
          console.log(snap.data());
          if (snap.exists) {
            setEditPaper(snap.data());
          } else {
            alert("no");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  // async function fetchmocktestadvancepatterndata() {
  //   const db = firebase.firestore();
  //   await db
  //     .collection(mainpapertype.toUpperCase())
  //     .doc("ADVANCE")
  //     .collection("PAPER")
  //     .doc(`PAPER${Number(mockpaperno)}`)
  //     .get()
  //     .then((snap) => {
  //       if (snap.exists) {
  //         console.log(snap.data().sections);
  //         setSection(snap.data().sections);
  //         console.log(section);
  //       }
  //     });
  //   console.log(section);
  // }

  async function fetchAllQuestions() {
    const db = firebase.firestore();
    await db
        .collection("SUBJECTWISE")
        .doc(Class)
        .collection(Subject)
        .doc(Chapter)
        .collection(`Level 0${Level}`).orderBy("number").onSnapshot(
      function (querySnapshot) {
        console.log(querySnapshot.docs);
        var array = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          year: doc.data().year,
          questions: doc.data().question,
          quesno: doc.data().number,
        }));
        array.sort((a, b) => {
          return a.quesno - b.quesno;
        });
        console.log(array);
        setAllQuestions(array);
      },
      function (error) {
        console.log(error);
      }
    );
    console.log(allQuestions);
  }

  useEffect(() => {
    // console.log("inside editpaper but not complete inside");
    if (editPaper !== "" && count == 0) {
      console.log("inside editpaper", editPaper, count);
      if(editPaper.option1==undefined){
        console.log("option1 undefined",editPaper.option1)
        setOption1([editPaper.option[0]]);
      setOption2([editPaper.option[1]]);
      setOption3([editPaper.option[2]]);
      setOption4([editPaper.option[3]]);
      setCorrect(questionType=="4"?[editPaper.answer]:editPaper.answer);
      }else{
        setOption1(editPaper.option1);
        setOption2(editPaper.option2);
        setOption3(editPaper.option3);
        setOption4(editPaper.option4);
        setCorrect(editPaper.answer)
      }
      setQuestionDetail(editPaper.question);
      
      setQuestionType(editPaper.answerType);
      console.log(questionType=="4"?[editPaper.answer]:editPaper.answer)
      setYear(editPaper.year?editPaper.year:"");
      setCollege(editPaper.college?editPaper.college:"");
      setHint(editPaper.hint);
      setSolution(editPaper.solution);
        setValue(editPaper.rating?editPaper.rating:3)

      // console.log(count);
      setCount(1);
      // render();
    }
  }, [correct, editPaper, count]);

  console.log(questionDetail,solution,hint,option1,option2,option3,option4)

  function Handle(index) {
    console.log(index);
    console.log(editable.includes(index));
    if (editable.includes(index)) {
      let arr = [];
      for (let i = 0; i <= editable.length; i++) {
        if (editable[i] !== index) {
          arr.push(editable[i]);
        }
      }
      setEditable(arr);
    } else {
      console.log([...editable, index]);
      setEditable([...editable, index]);
      console.log("editable", editable);
    }
    console.log("editable", editable);
  }

  // async function Save(droptype, field, index, value=data2) {

  async function Save(droptype, field, index, value) {
    // if(dropType==="question"){
    console.log("inside save droptype");
    console.log(droptype, index, field, value);
    const temp = [];
    for (let i = 0; i < field.length; i++) {
      if (i === index) {
        var { data, type } = field[i];
        console.log(data, type, field[i]);
        // data = value;
        data = value;
        temp.push({ data, type });
      } else {
        temp.push(field[i]);
      }
    }

    if (droptype === "question") {
      setQuestionDetail(temp);
    }
    if (droptype === "option1") {
      setOption1(temp);
    }
    if (droptype === "option2") {
      setOption2(temp);
    }
    if (droptype === "option3") {
      setOption3(temp);
    }
    if (droptype === "option4") {
      setOption4(temp);
    }
    if (droptype === "solution") {
      setSolution(temp);
    }
    if (droptype === "hint") {
      setHint(temp);
    }
    console.log(temp);
    setOpen(false);
    console.log("outside save droptype");
    // return temp;
  }
  //


  const SubjectwiseDragContain = React.useCallback(
    (props) => {
      var t = 0;
      // console.log(props)
      props.filed &&
        props.filed.map((e, index) => {
          props.filed[index].id = "part " + index;
        });
      // console.log(props)
      return (
        <Container>
          <DragDropContext
            onDragEnd={(result) => {
              if (!result.destination) return;
              handleOnDragEnd(props.filed, result, props.dropType);
            }}
          >
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ marginTop: "50px" }}
                >
                  {/* {console.log("prop.filed", props.filed)} */}
                  {props.filed !== "" ? (
                    props.filed.map((e, index) => {
                      var { data } = e;
                      var keyBla = props.dropType + index;
                      // setData2(data);
                      return (
                        <Draggable
                          key={index}
                          draggableId={props.filed[index].id}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="drag-card">
                                {editable.includes(props.dropType + index) ? (
                                  <input
                                    autoFocus
                                    // ref={ref}
                                    value={data}
                                    onChange={(e) =>
                                      Save(
                                        props.dropType,
                                        props.filed,
                                        index,
                                        e.target.value
                                      )
                                    }
                                    style={{ width: "100%" }}
                                  ></input>
                                ) : (
                                  data
                                )}
                                <button
                                  className="dragButton"
                                  type="submit"
                                  onClick={() => {
                                    Handle(props.dropType + index);
                                    console.log(editable);
                                  }}
                                  style={{ margin: "5px" }}
                                >
                                  {editable.includes(props.dropType + index)
                                    ? "save"
                                    : "edit"}
                                </button>
                                {/* </form> */}

                                <button
                                  className="dragButton"
                                  onClick={() =>
                                    deleteElement(
                                      index,
                                      props.filed,
                                      props.dropType
                                    )
                                  }
                                  style={{ margin: "5px" }}
                                >
                                  Delete
                                </button>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <></>
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </Container>
      );
    },
    [editable]
  );

  // const notify = () => toast("SUBMITTED");
  useEffect(() => {
    console.log(subj);
  }, [subj]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {" "}
        Question No. - {QuestionNo}{" "}
      </h1>
      <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 220,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={1}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        </div>

      <SubjectwiseTyper
        info={questionDetail}
        setInfo={setQuestionDetail}
        title="question"
      />

      <SubjectwiseDragContain filed={questionDetail} dropType="question" />

      {/* ---------------------------------------Question End------------------------------------- */}
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

      <Container>
        {!(Subject === "mocktest" || Subject === "mocktestadvance") && (
          <div>
            <h4>Select Question type</h4>
            <div
              style={{
                display: "inline-flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
              onChange={(e) => {
                setQuestionType(e.target.value);
                setCorrect([]);
              }}
            >
              <RadioGroup
                name="radio-buttons-group"
                row
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <FormControlLabel
                  value="4"
                  // onChange={() => handleCheck(0)}
                  control={<Radio />}
                  label="Single Correct"
                  checked={"4" == questionType}
                  defaultChecked="true"
                />
                <FormControlLabel
                  value="5"
                  // onChange={() => handleCheck(1)}
                  control={<Radio />}
                  label="Multiple Correct"
                  checked={"5" == questionType}
                />
                <FormControlLabel
                  value="1"
                  // onChange={() => handleCheck(2)}
                  control={<Radio />}
                  label="Integers"
                  checked={"1" == questionType}
                />
                <FormControlLabel
                  value="2"
                  // onChange={() => handleCheck(3)}
                  control={<Radio />}
                  label="Numerical"
                  checked={"2" == questionType}
                />
              </RadioGroup>
            </div>
          </div>
        )}
        {console.log(questionType)}

        <div>
          {questionType == "2" ? (
            <div>
              <h4>Enter Answer</h4>
              {/* <input
                placeholder="Answer"
                value={correct}
                onChange={(e) => setCorrect(e.target.value)}
              ></input> */}
              <TextField
                label="Answer"
                value={correct}
                type="number"
                onChange={(e) => {
                  // setCorrect(Math.trunc(e.target.value * 100) / 100);
                  let t = e.target.value;
                  setCorrect(
                    Number(
                      t.indexOf(".") >= 0
                        ? t.substr(0, t.indexOf(".")) +
                            t.substr(t.indexOf("."), 3)
                        : t
                    )
                  );
                }}
              >
                {correct}
              </TextField>
            </div>
          ) : questionType == "1" ? (
            <div>
              <h4>Enter Answer</h4>
              <TextField
                label="Answer"
                select
                value={correct}
                onChange={(e) => setCorrect(e.target.value)}
                style={{ width: "100px", marginRight: "20px" }}
              >
                {numarr.map((a, index) => {
                  return (
                    <MenuItem value={a} key={index}>
                      {a}
                    </MenuItem>
                  );
                })}
              </TextField>
              <br />
            </div>
          ) : questionType == "4" || questionType == "5" ? (
            <div>
              <div>
                  <h4>Correct Answer</h4>
                <FormLabel component="legend" style={{ color: "black" }}>
                  Select Options
                </FormLabel>
                {questionType == "4" ? (
                  <RadioGroup name="radio-buttons-group" row>
                    {console.log(correct)}
                    <FormControlLabel
                      value="1"
                      checked={correct.includes(0) || correct.includes("0")}
                      onChange={() => handleCheck(0)}
                      control={<Radio />}
                      label="1"
                    />
                    <FormControlLabel
                      value="2"
                      checked={correct.includes(1) || correct.includes("1")}
                      onChange={() => handleCheck(1)}
                      control={<Radio />}
                      label="2"
                    />
                    <FormControlLabel
                      value="3"
                      checked={correct.includes(2) || correct.includes("2")}
                      onChange={() => handleCheck(2)}
                      control={<Radio />}
                      label="3"
                    />
                    <FormControlLabel
                      value="4"
                      checked={correct.includes(3) || correct.includes("3")}
                      onChange={() => handleCheck(3)}
                      control={<Radio />}
                      label="4"
                    />
                  </RadioGroup>
                ) : questionType == "5" ? (
                  <FormGroup row>
                    <FormControlLabel
                      // checked={multiOption[0]}
                      checked={correct.includes(0) || correct.includes("0")}
                      onChange={() => handleCheck(0)}
                      control={<Checkbox />}
                      label="1"
                    />
                    <FormControlLabel
                      // checked={multiOption[1]}
                      checked={correct.includes(1) || correct.includes("1")}
                      onChange={() => handleCheck(1)}
                      control={<Checkbox />}
                      label="2"
                    />
                    <FormControlLabel
                      // checked={multiOption[2]}
                      checked={correct.includes(2) || correct.includes("2")}
                      onChange={() => handleCheck(2)}
                      control={<Checkbox />}
                      label="3"
                    />
                    <FormControlLabel
                      // checked={multiOption[3]}
                      checked={correct.includes(3) || correct.includes("3")}
                      onChange={() => handleCheck(3)}
                      control={<Checkbox />}
                      label="4"
                    />
                  </FormGroup>
                ) : null}
              </div>
              <hr />
              <Row>
                <Col>
                  <SubjectwiseTyper info={option1} setInfo={setOption1} title="option 1" />
                </Col>
                <Col>
                  <SubjectwiseDragContain filed={option1} dropType="option1" />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <SubjectwiseTyper info={option2} setInfo={setOption2} title="option 2" />
                </Col>
                <Col>
                  <SubjectwiseDragContain filed={option2} dropType="option2" />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <SubjectwiseTyper info={option3} setInfo={setOption3} title="option 3" />
                </Col>
                <Col>
                  <SubjectwiseDragContain filed={option3} dropType="option3" />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <SubjectwiseTyper info={option4} setInfo={setOption4} title="option 4" />
                </Col>
                <Col>
                  <SubjectwiseDragContain filed={option4} dropType="option4" />
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Container>

      <Container>
        <hr />
        <Row>
          <Col>
            <SubjectwiseTyper info={solution} setInfo={setSolution} title="Solution" />
          </Col>
          <Col>
            <SubjectwiseDragContain filed={solution} dropType="solution" />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <SubjectwiseTyper info={hint} setInfo={setHint} title="Hint" />
          </Col>
          <Col>
            <SubjectwiseDragContain filed={hint} dropType="hint" />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h4>Year Of Paper</h4>
            <TextField
              label="Year"
              select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{ width: "100px", marginRight: "20px" }}
            >
              {yeardata.map((a, index) => {
                return (
                  <MenuItem value={a} key={index}>
                    {a}
                  </MenuItem>
                );
              })}
            </TextField>
          </Col>
          <Col>
            <h4>College</h4>
            <TextField
              label="College"
              value={college}
              onChangeCapture={(e) => setCollege(e.target.value)}
            >
              {college}
            </TextField>
          </Col>
        </Row>
      </Container>
      {allQuestions && visible && (
        <Container>
          <Row>
            {allQuestions && allQuestions[QuestionNo - 2] !== undefined && (
              <Col>
                {allQuestions[QuestionNo - 2] !== undefined ? (
                  <Button
                    className="shadow-btn"
                    component={Link}
                    to={{
                      pathname: "/Subjectwise/setQuestionsubjectwise",
                      state: {
                        id: allQuestions[QuestionNo - 2].id,
                        Class: Class,
                        Subject: Subject,
                        Chapter: Chapter,
                        QuestionNo: QuestionNo - 1,
                        mockpaperno: mockpaperno,
                        mainpapertype: mainpapertype,
                        Level:Level
                        // allQuestions: allQuestions,
                      },
                    }}
                    style={{
                      margin: "30px",
                      width: "30%",
                      background:
                        "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                    }}
                    onClick={async (e) => {
                      if (
                        correct.length == 0 ||
                        correct == [] ||
                        correct == null ||
                        correct == undefined
                      ) {
                        e.stopPropagation();
                        e.preventDefault();
                        toast.warn("fill the correct answer!");
                        return;
                      }
                      if(submitted && Id==undefined){
                        e.stopPropagation();
                        e.preventDefault();
                        return;
                      }
                      setVisible(false);
                      if (Id !== undefined) {
                        await updatePaper();
                      } else {
                        // await submitPaper()
                        !submitted ? await submitPaper() : await updatePaper();
                      }
                      window.location.reload();
                    }}
                  >
                    back
                  </Button>
                ) : null}
              </Col>
            )}

            <Col>
              {Id ? (
                <Button
                  className="shadow-btn"
                  onClick={() => {
                    console.log(correct);
                    if (
                      correct.length == 0 ||
                      correct == [] ||
                      correct == null ||
                      correct == undefined
                    ) {
                      toast.warn("fill the correct answer!");
                      return;
                    }
                    updatePaper();
                  }}
                  style={{
                    margin: "30px",
                    width: "40%",
                    background:
                      "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                  }}
                >
                  Update this Question
                </Button>
              ) : (
                <Button
                  className="shadow-btn"
                  onClick={() => {
                    // await submitPaper()
                    console.log(correct);
                    if (
                      correct.length == 0 ||
                      correct == [] ||
                      correct == null ||
                      correct == undefined
                    ) {
                      toast.warn("fill the correct answer!");
                      return;
                    }
                    !submitted ? submitPaper() : updatePaper();
                  }}
                  style={{
                    margin: "30px",
                    width: "40%",
                    background:
                      "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                  }}
                >
                  {/* in actual it is submit this question */}
                  Update this Question
                </Button>
              )}
            </Col>
            {allQuestions && (
              <Col>
                <Button
                  className="shadow-btn"
                  component={Link}
                  to={{
                    pathname: "/Subjectwise/setQuestionsubjectwise",
                    state: {
                      id:
                        allQuestions[QuestionNo] !== undefined
                          ? allQuestions[QuestionNo].id
                          : undefined,
                      Class: Class,
                      Subject: Subject,
                      Chapter: Chapter,
                      QuestionNo: QuestionNo + 1,
                      mockpaperno: mockpaperno,
                      mainpapertype: mainpapertype,
                      Level:Level
                      // allQuestions[QuestionNo] !== undefined
                      //   ? QuestionNo + 1
                      //   : allQuestions.length + 2,
                      // allQuestions: allQuestions,
                    },
                  }}
                  style={{
                    margin: "30px",
                    width: "30%",
                    background:
                      "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                  }}
                  onClick={async (e) => {
                    console.log(correct);
                    if (
                      correct.length == 0 ||
                      correct == [] ||
                      correct == null ||
                      correct == undefined
                    ) {
                      e.stopPropagation();
                      e.preventDefault();
                      toast.warn("fill the correct answer!");
                      return;
                    }
                    console.log(Id);
                    if(submitted && Id==undefined){
                      e.stopPropagation();
                      e.preventDefault();
                      return;
                    }
                    setVisible(false);
                    if (Id !== undefined) {
                      await updatePaper();
                    } else {
                      // await submitPaper();
                      !submitted ? await submitPaper() : await updatePaper();
                    }
                    // props.setQuestionNo(allQuestions.length + 1);
                    // setQuestionNo(allQuestions.length + 1);
                    window.location.reload();
                  }}
                >
                  {allQuestions[QuestionNo] !== undefined
                    ? "next"
                    : "Add New Question"}
                </Button>
                {console.log(section)}
              </Col>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default SetQuestionsubjectwise;
