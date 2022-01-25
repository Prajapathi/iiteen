import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";
import firebase from "firebase";
import { Link } from "react-router-dom";

const Mains = () => {
  const [paper, setPaper] = useState([]);
  const [size, setSize] = useState(0);

  useEffect(() => {
    localStorage.removeItem("syllabustype")
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
            syllabusCreated: doc.data().syllabusCreated,
            noofques:doc.data().noofques
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
      .set({ exist: true, number: paper.length + 1, syllabusSelected: false ,syllabusCreated:false})
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
          alignItems: "center",
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
            flexWrap: "wrap",
          }}
        >
          {paper.map((p) => (
            <div
              style={{
                width: "300px",
                margin: "30px",
              }}
            >
              {/* <a
                href={`${
                  p.syllabusCreated
                    ? ""
                    : "/mocktestadminmain/mains/selectsyllabus/0"
                }`}
              >
                <div className={styl.subjects}>
                  <h4>Mains Paper {p.number}</h4>
                </div>
              </a> */}
              <Link
                to={{
                  pathname: `${
                    p.syllabusCreated
                      ? "/PreviousYearSubjectwise/3"
                      : `/mocktestadminmain/mains/selectsyllabus/${p.number-1}`
                  }`,
                  state: { papernumber: Number(p.number) },
                }}
              >
                <div className={styl.subjects} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <h4>Mains Paper {p.number}</h4>
                  <h6>No. of Questions :{p.noofques?p.noofques:"0"}</h6>
                </div>
              </Link>
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
