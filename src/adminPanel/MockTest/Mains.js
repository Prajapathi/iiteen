import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";
import firebase from "firebase";
import { Link, useParams } from "react-router-dom";
import { MenuItem, TextField } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Mains = () => {
  const [paper, setPaper] = useState([]);
  const [size, setSize] = useState(0);
  const [mainpapertype, setMainpapertype] = useState("");
  const [editable, setEditable] = useState([false]);
  const { type } = useParams();
  const [shift, setShift] = useState();
  const [date, setDate] = useState();
  const [indexofpapers,setIndexofpapers]=useState(0);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    if (type == "mocktest") {
      setMainpapertype("mock");
    } else setMainpapertype("aits");
  }, []);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(false);
    }
    setEditable(arr);
  }, [size]);

  useEffect(() => {
    localStorage.removeItem("syllabustype");
    const db = firebase.firestore();
    db.collection(`${type == "mocktest" ? "MOCK" : "AITS"}`)
      .doc("MAINS")
      .collection("PAPER")
      .orderBy("number")
      .onSnapshot(function (snap) {
        console.log(snap.docs);
        setPaper(
          snap.docs.map((doc) => ({
            number: doc.data().number,
            syllabusCreated: doc.data().syllabusCreated,
            noofques: doc.data().noofques,
            date: doc.data().date2,
            shift: doc.data().shift,
          }))
        );
        setLoading(false)
        console.log(snap.docs.length);
        setSize(snap.docs.length);
      });
  }, []);

  useEffect(()=>{
    const db = firebase.firestore();
    db.collection(`${type == "mocktest" ? "MOCK" : "AITS"}`)
      .doc("MAINS")
      .get()
      .then((snap)=>{
        console.log(snap.data())
        setIndexofpapers(snap.data().indexofpaper)
      })
  },[])

  function CreateNewPaper() {
    console.log(paper);
    const db = firebase.firestore();
    db.collection(mainpapertype.toUpperCase())
      .doc("MAINS")
      .collection("PAPER")
      .doc(`PAPER${indexofpapers + 1}`)
      .set({
        exist: true,
        number: indexofpapers + 1,
        syllabusSelected: false,
        syllabusCreated: false,
        name:`PAPER${indexofpapers + 1}`,
        paperType:1,
        totalDuration:180,
        totalMarks:360,
        toBeAttempted:75
      })
      .then(() => { 
        console.log("saved");
      })
      .catch((error) => {
        console.log(error.message());
      });
      db.collection(mainpapertype.toUpperCase())
      .doc("MAINS")
      .update({indexofpaper:indexofpapers+1})
      setIndexofpapers(indexofpapers+1)
  }

  function setEdit(index) {
    let temp = [...editable];
    temp[index] = !temp[index];
    setEditable(temp);
  }

  const savetodatabase = (index) => {
    console.log(index)
    if(date==undefined || shift==undefined){
      return
    }
    const db = firebase.firestore();
    db.collection(mainpapertype.toUpperCase())
      .doc("MAINS")
      .collection("PAPER")
      .doc(`PAPER${index}`)
      .update({
        date2: date,
        shift: shift,
        date:shift=="shift1"?new Date(date+"T09:00:00+05:30"):new Date(date+"T13:00:00+05:30")
      });
  };

  const deletepaperfromdatabase=(index,batchSize)=>{
    const db = firebase.firestore();
    db.collection(mainpapertype.toUpperCase())
      .doc("MAINS")
      .collection("PAPER")
      .doc(`PAPER${index}`)
      .delete()
      .then(function () {
        console.log("Paper successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing Paper: ", error);
      });

      if(batchSize)deleteCollection(db,index,batchSize)
  }

  //new code
  async function deleteCollection(db, index, batchSize) {
    const collectionRef = db.collection(mainpapertype.toUpperCase())
    .doc("MAINS")
    .collection("PAPER")
    .doc(`PAPER${index + 1}`).collection("question");
    const query = collectionRef.orderBy('number').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }
  
  async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();
  
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }
  
    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }
  //

  console.log(paper);

  return (
    <>{loading?
      <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center",height:"1000px" }}>
      <CircularProgress />
    </Box>:
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
          {paper.map((p, index) => (
            <div
              style={{
                width: "300px",
                margin: "30px",
              }}
            >
              <Link
                to={{
                  pathname: `${
                    !editable[index]
                      ? p.syllabusCreated
                        ? "/PreviousYearSubjectwise/3"
                        : `/admin/${mainpapertype}test/main/mains/selectsyllabus/${
                            p.number - 1
                          }`
                      : "#"
                  }`,
                  state: {
                    papernumber: Number(p.number),
                    paperindex:index+1,
                    mainpapertype: mainpapertype,
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  sessionStorage.setItem("paperindex",index+1)
                  editable[index] && e.preventDefault();
                }}
              >
                <div
                  className={styl.subjects}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <IconButton
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      backgroundColor: "#fc584c",
                      borderTopRightRadius: "15px !important",
                      borderTopLeftRadius: "0px",
                      borderBottomRightRadius: "0px",
                      borderBottomLeftRadius: "0px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (
                        window.confirm(
                          "Are you sure you want to delete this paper completely?"
                        )
                      ) {
                        deletepaperfromdatabase(p.number,p.noofques)
                      }
                    }}
                    className="dialog-close-icon"
                  >
                    <CloseIcon />
                  </IconButton>
                  <h4>Mains Paper {index+1}</h4>
                  <h6>No. of Questions :{p.noofques ? p.noofques : "0"}</h6>
                  {mainpapertype == "aits" ? (
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                      {!editable[index] ? (
                        <div style={{ color: "blue", fontSize: "13px" }}>
                          Date: {p.date ? p.date : 0} | Time:
                          {p.shift ? p.shift : 0}
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "baseline",
                            fontSize: "14px",
                          }}
                          // onClick={(e) => {
                          //   e.stopPropagation();
                          // }}
                        >
                          <TextField
                            id="datetime-local"
                            label="Date and time"
                            type="date"
                            sx={{
                              width: "50%",
                              height: "50%",
                              fontSize: "14px",
                            }}
                            // className={classes.textField}
                            // InputLabelProps={{
                            //   shrink: true,
                            // }}
                            InputProps={{ style: { fontSize: 12, height: 18 } }}
                            InputLabelProps={{
                              style: { fontSize: 12 },
                              // onClick: (e) => {
                              //   e.stopPropagation();
                              //   e.preventDefault();
                              // },
                            }}
                            style={{ width: "110px", marginRight: "10px" }}
                            value={!editable[index] ? p.date : date}
                            onChange={(e) => {
                              setDate(e.target.value);
                              console.log(e.target.value);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          />
                          <TextField
                            id="standard-number"
                            InputProps={{ style: { fontSize: 12, height: 18 } }}
                            InputLabelProps={{ style: { fontSize: 12 } }}
                            select
                            label="slot"
                            value={!editable[index] ? p.shift : shift}
                            style={{ width: "90px" }}
                            onChange={(event) => {
                              setShift(event.target.value);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <MenuItem value={"shift1"}>shift 1(9-12)</MenuItem>
                            <MenuItem value={"shift2"}>shift 2(1-4)</MenuItem>
                          </TextField>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          console.log("hello");
                          e.stopPropagation();
                          e.preventDefault();
                          if (editable[index]) savetodatabase(p.number);
                          else {
                            setDate(p.date);
                            setShift(p.shift);
                          }
                          setEdit(index);
                          console.log(editable);
                        }}
                        style={{
                          fontSize: "13px",
                          backgroundColor: "grey",
                          color: "white",
                          border: "1px solid grey",
                          borderRadius: "5px",
                          marginLeft: "5px",
                          height: "20px",
                        }}
                      >
                        {editable[index] ? "save" : "change"}
                      </button>
                    </div>
                  ) : null}
                </div>
              </Link>
            </div>
          ))}
          <div>
            <button className={styl.plusbutton} onClick={CreateNewPaper}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    }
    </>
    
  );
};

export default Mains;
