import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Latex from "react-latex-next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Typer from "./Typer.js";
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
  TextareaAutosize,
} from "@material-ui/core";
// import { db } from "./firebase";
import firebase from "firebase";
import "../components/css/myCss.css";
import yeardata from "../components/data/year";
import { render } from "@testing-library/react";
import { Link, useHistory } from "react-router-dom";
import { browserHistory } from "react-router";

const SetQuestion = (props) => {
  var [type, setType] = useState("1");
  var [text, setText] = useState("");
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
  const [multiOption, setMultiOption] = React.useState([
    false,
    false,
    false,
    false,
  ]);
  const [allQuestions, setAllQuestions] = useState("");

  const [locationKeys, setLocationKeys] = useState([]);
  const [saveposition, setSaveposition] = useState(0);

  const ref = useRef();
  const cursorPosition = 2;
  const [data2,setData2]=useState("");

  const numarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // const Class = props.match.params.Class
  // const Id = props.match.params.Id
  // const QuestionNo = props.match.params.questionNo
  // const Subject = props.match.params.subject
  // const Chapter = props.match.params.chapter
  // alert(props.match.params.Id)

  // console.log(props.location.state);
  const Class = props.location.state.Class;
  const Id = props.location.state.id;
  // this QuestionNo here is like index to the allQuestion array it is not the questionNo of the database
  const QuestionNo = props.location.state.QuestionNo;
  const Subject = props.location.state.Subject;
  const Chapter = props.location.state.Chapter;
  // console.log(Class,Id,QuestionNo,Subject,Chapter);
  // const allQuestions = props.location.state.allQuestions;

  useEffect(() => {
    fetchPaper();
    fetchAllQuestions();
  }, []);

  // useEffect(()=>{
  //   async function fetchData(){
  //     console.log("fetch paper started");
  //     await fetchPaper();
  //     console.log("fetch paper ended");
  //   }
  //   fetchData();
  // },[])

  // window.onpopstate = function (e) {
  //   console.log("pop");
  //   if (!localStorage.getItem("a")) {
  //     // setA(!a);
  //     localStorage.setItem("a", true);
  //     console.log("just popped");
  //     history.push(
  //       `${Subject === "physics" ? 0 : Subject === "chemistry" ? 1 : 2}`
  //     );
  //   }
  // };

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

          // console.log("pop");
          // if (!localStorage.getItem("a")) {
          //   // setA(!a);
          //   localStorage.setItem("a", true);
          //   console.log("just popped");
          history.push(
            `${Subject === "physics" ? 0 : Subject === "chemistry" ? 1 : 2}`
          );
          // }
        }
      }
    });
  }, [locationKeys, Subject]);

  // window.addEventListener(
  //   "popstate",
  //   (event) => {
  //     if (event.state) {
  //       //do your code here
  //       console.log("pop");
  //       if (!localStorage.getItem("a")) {
  //         // setA(!a);
  //         localStorage.setItem("a", true);
  //         console.log("just popped");
  //         history.push(
  //           `${Subject === "physics" ? 0 : Subject === "chemistry" ? 1 : 2}`
  //         );
  //       }
  //     }
  //   },
  //   false
  // );

  // console.log("allQuestions", allQuestions);

  const submitPaper = async (e) => {
    // const option=[option1,option2,option3,option4];
    const db = firebase.firestore();
    await db
      .collection("PYSV")
      .doc(Class)
      .collection(Subject)
      .doc(Chapter)
      .collection("question")
      .add({
        question: questionDetail,
        answerType: questionType,
        option2: option2,
        option1: option1,
        option3: option3,
        option4: option4,
        // option:option,
        answer: correct,
        hint: hint,
        solution: solution,
        year: year,
        college: college,
        number: `${QuestionNo}`,
      })
      .then(() => {
        console.log(
          "SUBMITTED",
          "     Your question has been uploaded to database"
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const updatePaper = async (e) => {
    // const option=[option1,option2,option3,option4];
    // console.log("inside update paper");
    const db = firebase.firestore();
    await db
      .collection("PYSV")
      .doc(Class)
      .collection(Subject)
      .doc(Chapter)
      .collection("question")
      .doc(Id)
      .update({
        // question: questionDetail,
        // questionType: questionType,
        // option2: option2,
        // option1: option1,
        // option3: option3,
        // option4: option4,
        // correct: correct,
        // solution: solution,
        // hint: hint,
        // year: year,
        // college: college,
        // questionNumber: `${QuestionNo}`,

        question: questionDetail,
        answerType: questionType,
        option2: option2,
        option1: option1,
        option3: option3,
        option4: option4,
        // option:option,
        answer: correct,
        hint: hint,
        solution: solution,
        year: year,
        college: college,
        number: `${QuestionNo}`,
      })
      .then(() => {
        console.log(
          "UPDATED",
          "     Your question has been updated to database"
        );
      })
      .catch((error) => {
        alert(error.message);
      });
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

  function handleOnDragEnd(array, result) {
    if (array === option1) {
      const items = Array.from(option1);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption1(items);
    }
    if (array === questionDetail) {
      const items = Array.from(questionDetail);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setQuestionDetail(items);
    }
    if (array === option1) {
      const items = Array.from(option1);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption1(items);
    }
    if (array === option2) {
      const items = Array.from(option2);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption2(items);
    }
    if (array === option3) {
      const items = Array.from(option3);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption3(items);
    }
    if (array === option4) {
      const items = Array.from(option4);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOption4(items);
    }
    if (array === solution) {
      const items = Array.from(solution);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setSolution(items);
    }
    if (array === hint) {
      const items = Array.from(hint);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setHint(items);
    }
  }

  function deleteElement(index, field) {
    const updateItems = field.filter((elm, ind) => {
      return index !== ind;
    });
    if (field === questionDetail) {
      setQuestionDetail(updateItems);
    }
    if (field === option1) {
      setOption1(updateItems);
    }
    if (field === option2) {
      setOption2(updateItems);
    }
    if (field === option3) {
      setOption3(updateItems);
    }
    if (field === option4) {
      setOption4(updateItems);
    }
    if (field === solution) {
      setSolution(updateItems);
    }
    if (field === hint) {
      setHint(updateItems);
    }

    return updateItems;
  }

  async function fetchPaper() {
    // console.log("inside fetchPaper");
    if (Id) {
      const db = firebase.firestore();
      await db
        .collection("PYSV")
        .doc(Class)
        .collection(Subject)
        .doc(Chapter)
        .collection("question")
        .doc(Id)
        .get()
        .then((snap) => {
          if (snap.exists) {
            setEditPaper(snap.data());
            // console.log("data fetched");
          } else {
            alert("no");
          }
          // alert(`${Chapter}, ${Class}, ${Id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // console.log("outside fetchPaper");

    // console.log("came here after fetching data");
    // console.log(" not inside editpaper",editPaper);
    // setQuestionDetail(editPaper.question);
    //   setOption1(editPaper.option1);
    //   setOption2(editPaper.option2);
    //   setOption3(editPaper.option3);
    //   setOption4(editPaper.option4);
    //   setQuestionType(editPaper.questionType);
    //   setCorrect(editPaper.correct);
    //   setYear(editPaper.year);
    //   setCollege(editPaper.college);
    //   setHint(editPaper.hint);
    //   setSolution(editPaper.solution);
  }

  async function fetchAllQuestions() {
    const db = firebase.firestore();
    await db
      .collection("PYSV")
      .doc(Class)
      .collection(Subject)
      .doc(Chapter)
      .collection("question")
      .orderBy("number")
      .onSnapshot(function (querySnapshot) {
        var array = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          year: doc.data().year,
          questions: doc.data().question,
          quesno: doc.data().number,
        }));
        array.sort((a, b) => {
          return a.quesno - b.quesno;
        });
        setAllQuestions(array);
      });
    console.log(allQuestions);
  }

  useEffect(() => {
    // console.log("inside editpaper but not complete inside");
    if (editPaper !== "" && count == 0) {
      console.log("inside editpaper", editPaper, count);
      setQuestionDetail(editPaper.question);
      setOption1(editPaper.option1);
      setOption2(editPaper.option2);
      setOption3(editPaper.option3);
      setOption4(editPaper.option4);
      setQuestionType(editPaper.answerType);
      setCorrect(editPaper.answer);
      setYear(editPaper.year);
      setCollege(editPaper.college);
      setHint(editPaper.hint);
      setSolution(editPaper.solution);
      // console.log(count);
      setCount(1);
      // render();
    }
  }, [correct, editPaper, count]);

  function Handle(index) {
    if (editable.includes(index)) {
      let arr = [];
      for (let i = 0; i <= editable.length; i++) {
        if (editable[i] !== index) {
          arr.push(editable[i]);
        }
      }
      setEditable(arr);
    } else {
      setEditable([...editable, index]);
    }
    console.log("editable", editable);
  }

  async function Save(droptype, field, index, value=data2) {
    // if(dropType==="question"){
    console.log("inside save droptype");
    const temp = [];
    for (let i = 0; i < field.length; i++) {
      if (i === index) {
        var { data, type } = field[i];
        console.log(data, type, field[i]);
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
    // console.log(questionDetail);
    // var start = ref.current.selectionStart;
    // var end = ref.current.selectionEnd;
    // var sel = ref.current.value.substring(start, end);
    // var finText =
    //   ref.current.value.substring(0, start) +
    //   "[b]" +
    //   sel +
    //   "[/b]" +
    //   ref.current.value.substring(end);
    // ref.current.value = finText;
    // ref.current.focus();
    // ref.current.selectionEnd = end + 7;
    // }
    console.log("outside save droptype");
    // return temp;
  }
  //
  //   function boldText() {
  //     var start = ref.selectionStart;
  //     var end = ref.selectionEnd;
  //     var sel = ref.value.substring(start, end);
  //     var finText = ref.value.substring(0, start) + '[b]' + sel + '[/b]' + ref.value.substring(end);
  //     ref.value = finText;
  //     ref.focus();
  // }
  //

  const DragContain = (props) => {
    var t = 0;
    return (
      <Container>
        <DragDropContext
          onDragEnd={(result) => {
            if (!result.destination) return;
            handleOnDragEnd(props.filed, result);
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
                {console.log("prop.filed", props.filed)}
                {props.filed !== "" ? (
                  props.filed.map((e, index) => {
                    var { data } = e;
                    var keyBla = props.dropType + index;
                    // setData2(data);
                    return (
                      <Draggable
                        key={index}
                        draggableId={props.dropType + data}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="drag-card">
                              {/* <form
                                onSubmit={(elm) => {
                                  elm.preventDefault();
                                  Save(props.dropType, props.filed, index);
                                }}
                              > */}
                              {/* {console.log(index)} */}
                              {data}
                              {/* {editable.includes(props.dropType + index) ? (
                                <input
                                  autoFocus
                                  ref={ref}
                                  value={data}
                                  onBlur={() => ref.current.setSelectionRange(cursorPosition, cursorPosition)}
                                  onChange={(e) => {
                                    // setSaveposition(this.input.selectionStart)
                                    console.log(ref.current.selectionStart);
                                    const a = ref.current.selectionStart;
                                    setSaveposition(ref.current.selectionStart);
                                    console.log(saveposition);
                                    console.log(a);
                                    Save(
                                      props.dropType,
                                      props.filed,
                                      index,
                                      e.target.value
                                    );
                                    console.log(saveposition);
                                    console.log(a);
                                  }}
                                  style={{ width: "100%" }}
                                ></input>
                              ) : (
                                null
                              )} */}
                              {editable.includes(props.dropType + index) ? (
                                <input
                                  autoFocus
                                  ref={ref}
                                  value={data2}
                                  onChange={(e)=>setData2(e.target.value)}
                                  style={{ width: "100%" }}
                                ></input>
                              ) : (
                                null
                              )}
                              <button
                                className="dragButton"
                                type="submit"
                                onClick={() => {
                                  // if(!editable.includes(props.dropType + index))setData2(data)
                                  if(editable.includes(props.dropType + index))Save(props.dropType, props.filed, index);
                                  Handle(props.dropType + index);
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
                                  deleteElement(index, props.filed)
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
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}> Question No. - {QuestionNo} </h1>
      <br />
      <Typer
        info={questionDetail}
        setInfo={setQuestionDetail}
        title="question"
      />

      <DragContain filed={questionDetail} dropType="question" />

      {/* ---------------------------------------Question End------------------------------------- */}

      <Container>
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
        <div>
          {questionType === "2" ? (
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
                  setCorrect(Math.trunc(e.target.value * 100) / 100);
                }}
              >
                {correct}
              </TextField>
            </div>
          ) : questionType === "1" ? (
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
          ) : questionType === "4" || questionType === "5" ? (
            <div>
              <div>
                <h4>
                  <h4>Correct Answer</h4>
                </h4>
                <FormLabel component="legend" style={{ color: "black" }}>
                  Select Options
                </FormLabel>
                {questionType === "4" ? (
                  <RadioGroup name="radio-buttons-group" row>
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
                ) : questionType === "5" ? (
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
                  <Typer info={option1} setInfo={setOption1} title="option 1" />
                </Col>
                <Col>
                  <DragContain filed={option1} dropType="option1" />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Typer info={option2} setInfo={setOption2} title="option 2" />
                </Col>
                <Col>
                  <DragContain filed={option2} dropType="option2" />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Typer info={option3} setInfo={setOption3} title="option 3" />
                </Col>
                <Col>
                  <DragContain filed={option3} dropType="option3" />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Typer info={option4} setInfo={setOption4} title="option 4" />
                </Col>
                <Col>
                  <DragContain filed={option4} dropType="option4" />
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
            <Typer info={solution} setInfo={setSolution} title="Solution" />
          </Col>
          <Col>
            <DragContain filed={solution} dropType="solution" />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Typer info={hint} setInfo={setHint} title="Hint" />
          </Col>
          <Col>
            <DragContain filed={hint} dropType="hint" />
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
      <Container>
        <Row>
          {allQuestions && allQuestions[QuestionNo - 2] !== undefined && (
            <Col>
              {allQuestions[QuestionNo - 2] !== undefined ? (
                <Button
                  className="shadow-btn"
                  component={Link}
                  to={{
                    pathname: "/PreviousYearSubjectwise/setQuestion",
                    state: {
                      id: allQuestions[QuestionNo - 2].id,
                      Class: Class,
                      Subject: Subject,
                      Chapter: Chapter,
                      QuestionNo: QuestionNo - 1,
                      // allQuestions: allQuestions,
                    },
                  }}
                  style={{
                    margin: "30px",
                    width: "30%",
                    background:
                      "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                  }}
                  onClick={async () => {
                    if (Id !== undefined) {
                      await updatePaper();
                    } else {
                      await submitPaper();
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
                onClick={updatePaper}
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
                onClick={submitPaper}
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
                  pathname: "/PreviousYearSubjectwise/setQuestion",
                  state: {
                    id:
                      allQuestions[QuestionNo] !== undefined
                        ? allQuestions[QuestionNo].id
                        : undefined,
                    Class: Class,
                    Subject: Subject,
                    Chapter: Chapter,
                    QuestionNo: QuestionNo + 1,
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
                onClick={async () => {
                  if (Id !== undefined) {
                    await updatePaper();
                  } else {
                    await submitPaper();
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
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default SetQuestion;
