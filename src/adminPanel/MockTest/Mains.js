import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";
import firebase from "firebase";

const Mains = () => {
  const [paper, setPaper] = useState([]);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("MOCK")
      .doc("MAINS")
      .collection("PAPER")
      .orderBy("number")
      .onSnapshot(function (snap) {
        console.log(snap.docs);
        setPaper(
          snap.docs.map((doc) => ({
            number: doc.data().number,
          }))
        );
        console.log(snap.docs.length);
        setSize(snap.docs.length);
      });
  }, []);

  function CreateNewMockPaper() {
    console.log(paper);
    const db = firebase.firestore();
    db.collection("MOCK")
      .doc("MAINS")
      .collection("PAPER")
      .doc(`PAPER${paper.length + 1}`)
      .set({ exist: true, number: paper.length + 1 ,syllabusSelected:false})
      .then(() => {
        console.log("saved");
      })
      .catch((error) => {
        console.log(error.message());
      });
  }

  return (
    <div>
      <div
        style={{
          marginTop: "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems:"center",
          textAlign: "center",
          color: "rgb(88, 88, 88)",
        }}
      >
        <h1>Mains Paper Type</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "1100px",
            flexWrap:"wrap"
          }}
        >
          {paper.map((p) => (
            <div
              style={{
                width: "300px",
                margin: "30px"
              }}
            >
              <a href={"/mocktestadminmain/mains/selectsyllabus/0"}>
                <div className={styl.subjects}>
                  <h4>Mains Paper {p.number}</h4>
                </div>
              </a>
            </div>
          ))}
          <div>
            <button className={styl.plusbutton} onClick={CreateNewMockPaper}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mains;
