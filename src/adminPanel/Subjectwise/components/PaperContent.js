import React, { useState } from "react";
import {
  Container,
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
} from "react-bootstrap";
// import { db } from "./firebase";
import "./css/tp.css";
import { InlineTex } from "react-tex";
import Latex from "react-latex-next";
import { Button } from "bootstrap";
  
const PaperContent = () => {
  var [questionDetail, setQuestionDetail] = useState("");
  var [typing, setTyping] = useState("");
  var [option1, setoption1] = useState("");

  var [option2, setOption2] = useState([{ type: "0", data: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOption2([...option2, { type: 1, data: typing }])
    console.log(questionDetail, option2, option1);

    // db.collection("PYSV")
    //   .doc("physics")
    //   .collection("questions")
    //   .add({
    //     question: questionDetail,
    //     option2: option2,
    //     option1: option1,
    //   })
    //   .then(() => {
    //     alert("Your message has been submitted👍");
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });

    setQuestionDetail("");
    setTyping("")
 
    setoption1("");
  };

  const submitBtn = (e) =>{
    
  };
  return (
    <div>
      <Container>
        <h1>Paper Content</h1>

        <form className="form" onSubmit={handleSubmit}>
          <h1>Question Paper</h1>
          <div
            style={{
              background: "white",
              maxWidth: "100px",
              overflowWrap: "break-word",
            }}
          >
            {/* <InlineTex style={{maxWidth:'100px'}} texContent={questionDetail}/> */}
            <Latex style={{ background: "black" }}>{typing}</Latex>
          </div>

          <label>Question</label>

          <input
            placeholder="Question"
            value={typing}
            onChange={(e) => setTyping(e.target.value)}
          ></input>

          {/* <label>Oprtion1</label>
          <input
            placeholder="option1"
            value={option1}
            onChange={(e) => setoption1(e.target.value)}
          /> */}

          <label>option2</label>

          {option2.map((e, index) => {
            var { data, type } = e;
            return (
              <div>
                {data}
              </div>
            );
          })}

          <button
            type="submit"
            // style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
          >
            Submit
          </button>
        </form>
      </Container>

      <Container>
        <div id="blabla">
          <input type="radio" value="1" name="textType" />
          text
          <br />
          <input type="radio" value="2" name="textType" />
          formula
          <br />
          <input type="radio" value="3" name="textType" />
          image
          <br />
  
        </div>

        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title="Dropdown"
            id="input-group-dropdown-1"
          >
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Separated link</Dropdown.Item>
          </DropdownButton>
          <FormControl aria-label="Text input with dropdown button" />
        </InputGroup>
      </Container>
    </div>
  );
};

export default PaperContent;
