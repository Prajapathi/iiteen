import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import "../../../styles/MockTest.css";
import Loading from "../../elements/Loading";
import icon from "../../../assets/images/MockTesticon.png";
import AITStestCard from "./AITStestCard";
import { Slide } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

export function AITStestCardSection(props) {
  const [aitsTestPapersmains, setAitsTestPapersmains] = useState([]);
  const [attemptedPapersmains, setAttemptedPapersmains] = useState([]);
  const [aitsTestPapersadvance, setAitsTestPapersadvance] = useState([]);
  const [attemptedPapersadvance, setAttemptedPapersadvance] = useState([]);
  const [initialitems, setInitialitems] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [chapterIndex, setChapterIndex] = useState(0);
  const [chapterNumber, setChapterNumber] = useState([]);
  const [disableLeft, setDisableLeft] = useState("gray");
  const [vpWidth, setvpWidth] = useState(window.innerWidth);
  const [cardNumbers, setcardNumbers] = useState(1);
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("left");

  document.title = "AITS Test | IITEENS";

  useEffect(() => {
    //evaluate the number of cards to be displayed at one time
    let cardN;
    if (vpWidth > 1250) {
      cardN = 5;
    } else if (vpWidth > 1000) {
      cardN = 4;
    } else if (vpWidth > 700) {
      cardN = 3;
    } else if (vpWidth > 500) {
      cardN = 2;
    } else cardN = 1;
    setcardNumbers(cardN);

    setLoading(false);

    //set array for card numbers
    let items = [];
    for (let i = 0; i < initialitems.length / cardN; i++) {
      items.push(i + 1);
    }
    setChapterNumber(items);

    //set initial cards list
    let firstFourProducts = initialitems.slice(
      chapterIndex,
      chapterIndex + cardN
    );
    setChapters(firstFourProducts);

    window.addEventListener("resize", () => setvpWidth(window.innerWidth));
  }, [initialitems]);

  useEffect(() => {
    setChapters(initialitems.slice(chapterIndex, chapterIndex + cardNumbers));
  }, [chapterIndex, initialitems]);

  useEffect(() => {
    if (vpWidth > 1300) {
      setcardNumbers(5);
    } else if (vpWidth > 1180) {
      setcardNumbers(4);
    } else if (vpWidth > 890) {
      setcardNumbers(3);
    } else if (vpWidth > 600) {
      setcardNumbers(2);
    } else setcardNumbers(1);
    // console.log(cardNumbers);
  }, [vpWidth]);

  useEffect(() => {
    setChapters(initialitems.slice(chapterIndex, chapterIndex + cardNumbers));
    let items = [];
    for (let i = 0; i < initialitems.length / cardNumbers; i++) {
      items.push(i + 1);
    }

    setChapterNumber(items);
  }, [cardNumbers, initialitems]);

  const nextProduct = () => {
    setSlideDirection("right");
    setSlideIn(false);

    setTimeout(() => {
      setDisableLeft("black");
      const lastchapterIndex = initialitems.length - 1;
      const resetChapterIndex =
        chapterIndex + cardNumbers - 1 >= lastchapterIndex;
      const index = resetChapterIndex ? 0 : chapterIndex + cardNumbers;
      setChapterIndex(index);
      // setStl("blue");
      setSlideDirection("left");
      setSlideIn(true);
    }, 300);
  };
  const prevProduct = (e) => {
    if (chapterIndex === 0) {
      setDisableLeft("gray");
      return;
    }
    setSlideDirection("left");
    setSlideIn(false);
    setTimeout(() => {
      setDisableLeft("black");
      const index = chapterIndex - cardNumbers;
      setChapterIndex(index);
      if (index === 0) {
        setDisableLeft("gray");
      }
      setSlideDirection("right");
      setSlideIn(true);
    }, 300);
  };

  const refreshChapters = (number) => {
    console.log("number", number);
    if (chapterIndex === 0) {
      setDisableLeft("gray");
    }
    if((chapterIndex/cardNumbers+1)===number){
      return;
    }else if((chapterIndex/cardNumbers+1)<number){
      setSlideDirection("right");
      setSlideIn(false);
      setTimeout(() => {
        setDisableLeft("black");
        setChapterIndex(cardNumbers*(number-1));
        // setStl("blue");
        setSlideDirection("left");
        setSlideIn(true);
      }, 300);
    }else{
      setSlideDirection("left");
      setSlideIn(false);
      setTimeout(() => {
        setDisableLeft("black");
        setChapterIndex(cardNumbers*(number-1));
        if (cardNumbers*(number-1) === 0) {
          setDisableLeft("gray");
        }
        setSlideDirection("right");
        setSlideIn(true);
      }, 300);
    }
  };

  useEffect(() => {
    //fetching all the papers from MOCK folder of database and storing it in mockTestPapers
    setLoading(true);

    console.log(params.papertype);

    const db = firebase.firestore();
    db.collection("AITS")
      .doc("MAINS")
      .collection("PAPER")
      .orderBy("number")
      .get()
      .then(function (querySnapshot) {
        //store papers
        let papers = [];
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          papers.push(doc.data());
        });
        console.log(papers);
        setAitsTestPapersmains(papers);

        //After fetcing papers, fetch attempted papers to check for re-attempts
        db.collection("User")
          .doc(props.user.uid)
          .collection("AITSPapers")
          .doc("MAINS")
          .collection("PAPER")
          .get()
          .then(function (querySnapshot) {
            let attempted = [];
            querySnapshot.forEach(function (doc) {
              console.log(doc.id, " => ", doc.data());
              attempted.push(doc.data());
            });
            console.log(attempted);
            setAttemptedPapersmains(attempted);
            setLoading(false);
          })
          .catch(function (error) {
            setLoading(false);
            console.log("Error getting documents: ", error);
          });
      })
      .catch(function (error) {
        setLoading(false);
        console.log("Error getting documents: ", error);
      });
  }, []);

  useEffect(() => {
    //fetching all the papers from MOCK folder of database and storing it in mockTestPapers
    setLoading(true);

    console.log(params.papertype);

    const db = firebase.firestore();
    db.collection("AITS")
      .doc("ADVANCE")
      .collection("PAPER")
      .orderBy("number")
      .get()
      .then(function (querySnapshot) {
        //store papers
        let papers = [];
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          papers.push(doc.data());
        });
        console.log(papers);
        setAitsTestPapersadvance(papers);

        //After fetcing papers, fetch attempted papers to check for re-attempts
        db.collection("User")
          .doc(props.user.uid)
          .collection("AITSPapers")
          .doc("ADVANCE")
          .collection("PAPER")
          .get()
          .then(function (querySnapshot) {
            let attempted = [];
            querySnapshot.forEach(function (doc) {
              console.log(doc.id, " => ", doc.data());
              attempted.push(doc.data());
            });
            console.log(attempted);
            setAttemptedPapersadvance(attempted);
            setLoading(false);
          })
          .catch(function (error) {
            setLoading(false);
            console.log("Error getting documents: ", error);
          });
      })
      .catch(function (error) {
        setLoading(false);
        console.log("Error getting documents: ", error);
      });
  }, []);

  //function to check if particular paper has been attempted
  const checkAttemptedmains = (id) => {
    for (let i = 0; i < attemptedPapersmains.length; i++) {
      if (attemptedPapersmains[i].quid == id) return true;
    }
    return false;
  };
  const checkAttemptedadvance = (id) => {
    for (let i = 0; i < attemptedPapersadvance.length; i++) {
      if (attemptedPapersadvance[i].quid == id) return true;
    }
    return false;
  };
  console.log(aitsTestPapersmains, attemptedPapersmains);
  console.log(aitsTestPapersadvance, attemptedPapersadvance);

  useEffect(() => {
    let arr = [];
    aitsTestPapersmains.map((item, index) => {
      item.papertype = "mains";
      if (
        new Date().toISOString().substring(0, 10) <= item.date &&
        props.heading == "Upcoming Test"
      ) {
        arr.push(item);
      } else if (
        new Date().toISOString().substring(0, 10) > item.date &&
        props.heading == "Past Test"
      ) {
        arr.push(item);
      }
    });
    aitsTestPapersadvance.map((item, index) => {
      item.papertype = "advance";
      if(item.shift=="shift1"){
        if (new Date().getTime() <= new Date(item.date+"T12:00:00+05:30").getTime() && props.heading == "Upcoming Test") {
          arr.push(item);
        } else if (new Date().getTime() > new Date(item.date+"T12:00:00+05:30").getTime() && props.heading == "Past Test") {
          arr.push(item);
        }
      }else if(item.shift=="shift2"){
        if (new Date().getTime() <= new Date(item.date+"T16:00:00+05:30").getTime() && props.heading == "Upcoming Test") {
          arr.push(item);
        } else if (new Date().getTime() > new Date(item.date+"T16:00:00+05:30").getTime() && props.heading == "Past Test") {
          arr.push(item);
        }
      }
      // if (new Date().toISOString().substring(0, 10) <= item.date && props.heading == "Upcoming Test") {
      //   arr.push(item);
      // } else if (new Date().toISOString().substring(0, 10) > item.date && props.heading == "Past Test") {
      //   arr.push(item);
      // }
    });
    setInitialitems(arr);
  }, [aitsTestPapersmains, aitsTestPapersadvance]);

  return (
    <div className="screen" id="mocktest" style={{ minHeight: "40vh",paddingTop:"0px" }}>
      {loading == true ? (
        <Loading />
      ) : (
        <>
          <div id="mocktest-heading" style={{ height: "55px" }}>
            {/* <img src={icon} id="mocktesticon" alt="mocktest" /> */}
            <div class="section-heading" style={{ color: "white" }}>
              {props.heading}
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-evenly"}}>
            {/* rendering each paper in a card and passing the paper info to the individual card */}
            {/* {aitsTestPapersmains.map((item, index) => {
              console.log(
                new Date().toISOString().substring(0, 10),
                item.date,
                new Date().toISOString().substring(0, 10) <= item.date,
                props.heading=="Upcoming Test"
              );
              if(new Date().toISOString().substring(0, 10) <= item.date && props.heading=="Upcoming Test") {
                return (
                  <div key={index} style={{ margin: "20px" }}>
                    <AITStestCard
                      isAttempted={checkAttemptedmains(`PAPER${item.number}`)}
                      paper={item}
                      setLoading={setLoading}
                      papertype="mains"
                      papernumber={item.number}
                      paperindex={index + 1}
                    />
                  </div>
                );
              }else if(new Date().toISOString().substring(0, 10) > item.date && props.heading=="Past Test") {
                return (
                  <div key={index} style={{ margin: "20px" }}>
                    <AITStestCard
                      isAttempted={checkAttemptedmains(`PAPER${item.number}`)}
                      paper={item}
                      setLoading={setLoading}
                      papertype="mains"
                      papernumber={item.number}
                      paperindex={index + 1}
                    />
                  </div>
                );
              }
            })}
            {aitsTestPapersadvance.map((item, index) => {
              console.log(
                new Date().toISOString().substring(0, 10),
                item.date,
                new Date().toISOString().substring(0, 10) <= item.date,
                props.heading=="Upcoming Test"
              );
              if(new Date().toISOString().substring(0, 10) <= item.date && props.heading=="Upcoming Test") {
                return (
                  <div key={index} style={{ margin: "20px" }}>
                    <AITStestCard
                      isAttempted={checkAttemptedadvance(`PAPER${item.number}`)}
                      paper={item}
                      setLoading={setLoading}
                      papertype="advance"
                      papernumber={item.number}
                      paperindex={index + 1}
                    />
                  </div>
                );
              }else if(new Date().toISOString().substring(0, 10) > item.date && props.heading=="Past Test") {
                return (
                  <div key={index} style={{ margin: "20px" }}>
                    <AITStestCard
                      isAttempted={checkAttemptedadvance(`PAPER${item.number}`)}
                      paper={item}
                      setLoading={setLoading}
                      papertype="advance"
                      papernumber={item.number}
                      paperindex={index + 1}
                    />
                  </div>
                );
              }
            })} */}
            {console.log(initialitems)}
            {console.log(chapters)}
            {chapters.map((item, index) => (
              <Slide in={slideIn} direction={slideDirection}>
                <div key={index} style={{ margin: "20px" }}>
                  <AITStestCard
                    isAttempted={
                      item.papertype == "advance"
                        ? checkAttemptedadvance(`PAPER${item.number}`)
                        : checkAttemptedmains(`PAPER${item.number}`)
                    }
                    paper={item}
                    setLoading={props.loadingStart}
                    papertype={item.papertype}
                    papernumber={item.number}
                    paperindex={chapterIndex+index + 1}
                    heading={props.heading}
                  />
                </div>
              </Slide>
            ))}
          </div>
          {chapters.length !== 0 ? (
        <div style={{ display: "flex", margin: "20px 0" }}>
          <ArrowLeftIcon
            type="button"
            style={{
              fontSize: "46px",
              margin: "0px 0 0px auto",
              color: disableLeft,
            }}
            className="arrow"
            onClick={prevProduct}
          />

          {/* pagination for cards */}
          <div style={{ margin: "auto 0", display: "flex" }}>
            {cardNumbers != 1
              ? chapterNumber.map((number) => (
                  <div
                    id="touchnum"
                    style={{
                      margin: "4px",
                      color:
                        number == (chapterIndex + cardNumbers) / cardNumbers
                          ? "#448698"
                          : "rgba(0,0,0,0.8)",
                    }}
                    onClick={() => {
                      refreshChapters(number);
                        console.log("number", number);
                      
                    }}
                  >
                    {number}
                  </div>
                ))
              : null}
          </div>

          <ArrowRightIcon
            type="button"
            style={{ fontSize: "46px", margin: "0 auto 0px 0" }}
            className="arrow"
            onClick={nextProduct}
          />
        </div>
      ) : null}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
  };
};

export default connect(mapStateToProps, null)(AITStestCardSection);
