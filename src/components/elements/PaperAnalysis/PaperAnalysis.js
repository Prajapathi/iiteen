import React, { useState } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import BarGraph from "./BarGraph";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../../styles/paperAnalysis.css";
import avatar from "../../../assets/images/avatar.png";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import "../../../styles/noQuestionsError.css";

const useStyles = makeStyles((theme) => ({
  navimg: {
    height: "80px",
    width: "80px",
    objectFit: "cover",
    objectPosition: "center center",
    background: "grey",
    border: "1px solid grey",
    borderRadius: "50%",
    margin: "5% 40%",
    [theme.breakpoints.down("sm")]: {
      marginRight: "15px",
    },
  },
}));

const tagMap = {
  physics: {
    0: "Mechanics-1",
    1: "Mechanics-2",
    2: "Magnetism and EMI",
    3: "Waves and Thermodynamics",
    4: "Optics and Modern Physics",
    5: "Electrostatics and current electricity",
  },
  chemistry: {
    0: "Organic Chemistry-11",
    1: "Physical Chemistry-11",
    2: "Inorganic Chemistry-11",
    3: "Organic Chemistry-12",
    4: "Physical Chemistry-12",
    5: "Inorganic Chemistry-12",
  },
  maths: {
    0: "Trignometry",
    1: "Calculus",
    2: "Algebra",
    3: "Coordinate Geometry",
    4: "Vectors and 3D Geometry",
  },
};

function calctimedevoted(time) {
  let hr = Math.trunc(time / 3600);
  let min = Math.trunc(time / 60) % 60;
  let sec = Math.trunc(time % 60);
  let str = "";
  if (hr != 0) {
    str += hr + "hr ";
  }
  if (min != 0) {
    str += min + "min ";
  }
  str += sec + "sec";
  return str;
}

export function PaperAnalysis(props) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const markdistribution = [
    [3, 1, 0],
    [4, 2, 0],
    [4, 0, 0],
    [2, 0, 0],
  ];

  let { paperType, paperName, mockpaperType } = useParams();
  let paperTypeCaps = paperType.toUpperCase();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [paperInfo, setPaperInfo] = useState([]);
  const [percent, setPercent] = useState({
    physics: 0,
    chemistry: 0,
    maths: 0,
  });
  const [totalmarks, setTotalmarks] = useState(0);
  const [users, setUsers] = useState([]);
  const [usersdata, setUsersdata] = useState([]);
  const [usersdata2, setUsersdata2] = useState([]);
  const [physicsdataforrank, setPhysicsdataforrank] = useState([]);
  const [chemistrydataforrank, setChemistrydataforrank] = useState([]);
  const [mathsdataforrank, setMathsdataforrank] = useState([]);

  const [analysisnotavalaible, setAnalysisnotavailabe] = useState(false);

  //function for rounding off numbers
  const roundOff = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  const blankData = {
    labels: ["Not attempted"],
    datasets: [
      {
        data: [100],
        backgroundColor: ["#dedede"],
      },
    ],
  };

  const marksDataChart = {
    labels: ["Physics", "Chemistry", "Maths"],
    datasets: [
      {
        data: [percent.physics, percent.chemistry, percent.maths],
        backgroundColor: ["#448498", "#FF4A4F", "#2AD586"],
        borderColor: [
          "rgba(0, 0, 0, 0.1)",
          "rgba(0, 0, 0, 0.1)",
          "rgba(0, 0, 0, 0.1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const quesDataChart = {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        data: data
          ? data.totalAttempted == 0
            ? [0, 0]
            : [data.totalCorrect, data.totalAttempted - data.totalCorrect]
          : [],
        backgroundColor: ["#2AD586", "#FF4A4F"],
        borderColor: [
          "rgba(0, 0, 0, 0.1)",
          "rgba(0, 0, 0, 0.1)",
          "rgba(0, 0, 0, 0.1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const timeDataChart = {
    labels: ["Physics", "Chemistry", "Maths"],
    datasets: [
      {
        data: data
          ? data.totalAttempted == 0
            ? [0, 0, 0]
            : [data.physec, data.chesec, data.matsec]
          : [],
        backgroundColor: ["#448498", "#FF4A4F", "#2AD586"],
        borderColor: [
          "rgba(0, 0, 0, 0.1)",
          "rgba(0, 0, 0, 0.1)",
          "rgba(0, 0, 0, 0.1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  //data fetching
  React.useEffect(() => {
    console.log("props", props);
    let paperTypeRoute;
    switch (paperTypeCaps) {
      case "MOCKTEST":
        paperTypeRoute = "MOCK";
        break;
      case "PREVIOUSYEAR":
        paperTypeRoute = "PREVIOUS";
        break;
      case "AITSTEST":
        paperTypeRoute = "AITS";
        break;
      default:
        paperTypeRoute = "undefined";
    }

    //if the URL does not have correct paper type
    if (paperTypeRoute == "undefined") {
      //404 page

      history.push("/mjki@123U");
    }

    const db = firebase.firestore();

    //Fetch the analysis of the attempted paper
    console.log(paperTypeRoute);
    db.collection("User")
      .doc(props.user.uid)
      .collection(paperTypeRoute + "Papers")
      .doc(mockpaperType)
      .collection("PAPER")
      .doc(paperName)
      .collection("LeaderBoard")
      .doc("Analysis")
      .get()
      .then(function (querySnapshot) {
        console.log("here's the analysis:", querySnapshot.data());
        setData(querySnapshot.data());

        if (querySnapshot.data() == null) {
          console.log(props.user.uid, paperTypeRoute, mockpaperType, paperName);
          // window.alert("Previous Analysis Does Not Exist!");
          //404 page
          setAnalysisnotavailabe(true);
          // if (paperType == "mocktest") {
          //   history.push("/mocktest");
          // } else history.push("/aits");
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    //Fetch the details of the paper
    db.collection(paperTypeRoute)
      .doc(mockpaperType)
      .collection("PAPER")
      .doc(paperName)
      .get()
      .then(function (querySnapshot) {
        console.log("here's the paper:", querySnapshot.data());
        setPaperInfo(querySnapshot.data());
        if (querySnapshot.data() == null) {
          window.alert("Paper Does Not Exist!");
          //404 page
          if (paperType == "mocktest") {
            history.push("/mocktest");
          } else history.push("/aits");
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  console.log(paperName, data, paperInfo);

  //Data calculation for pie chart after fetching
  React.useEffect(() => {
    //setting % marks
    console.log(paperInfo.sections);
    let tm = 0;
    let marksdistributiontype = 0;
    if (paperInfo.sections != undefined) {
      paperInfo.sections &&
        paperInfo.sections.map((item, i) => {
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
    } else {
      setTotalmarks(360);
    }
    if (data != undefined) {
      let total =
        Math.abs(data.mathsMarks) +
        Math.abs(data.chemistryMarks) +
        Math.abs(data.physicsMarks);
      let p = 0,
        c = 0,
        m = 0;
      if (total !== 0) {
        if (data.physicsMarks !== 0) {
          p = roundOff((data.physicsMarks / total) * 100);
        }
        if (data.chemistryMarks !== 0) {
          c = roundOff((data.chemistryMarks / total) * 100);
        }
        if (data.mathsMarks !== 0) {
          m = roundOff((data.mathsMarks / total) * 100);
        }
      }
      setPercent({ physics: p, chemistry: c, maths: m });
    }
  }, [paperInfo]);

  function paperhasended(date2, shift) {
    let date1 = new Date();
    // console.log(date1.toISOString(),date1.getHours(),date2,shift,new Date(date2))
    if (shift == "shift1") {
      // console.log(new Date(date2+"T12:00:00+05:30"))
      if (new Date(date2 + "T12:00:00+05:30").getTime() < date1.getTime()) {
        // console.log("true hai",new Date(date2+"T09:00:00+05:30"),date1)
        return true;
      }
    }
    if (shift == "shift2") {
      // console.log(new Date(date2+"T16:00:00+05:30"))
      if (new Date(date2 + "T16:00:00+05:30").getTime() < date1.getTime()) {
        // console.log("true hai")
        return true;
      }
    }
    return false;
  }

  React.useEffect(() => {
    if (
      data != undefined &&
      data.rank == undefined &&
      paperInfo != undefined &&
      paperhasended(paperInfo.date2, paperInfo.shift)
    ) {
      const db = firebase.firestore();
      db.collection("User").onSnapshot((snap) => {
        console.log(snap.docs);
        setUsers(
          snap.docs.map((doc) => ({
            uid: doc.id,
          }))
        );
      });
      // calculateResult()
    }
  }, [data, paperInfo]);

  React.useEffect(() => {
    console.log(users);
    if (users != undefined && users.length != 0) {
      let arr = [];
      const db = firebase.firestore();
      setUsersdata(
        users.map((item) =>
          db
            .collection("User")
            .doc(item.uid)
            .collection("AITSPapers")
            .doc(mockpaperType)
            .collection("PAPER")
            .doc(paperName)
            .collection("LeaderBoard")
            .doc("Analysis")
            .get()
            .then((snap) => {
              console.log(snap.data());
              if (snap.data() != undefined) {
                return {
                  uid: item.uid,
                  totalmarks: snap.data().totalMarks,
                  physicsmarks: snap.data().physicsMarks,
                  chemistrymarks: snap.data().chemistryMarks,
                  mathsmarks: snap.data().mathsMarks,
                };
              }
            })
        )
      );
    }
  }, [users]);

  console.log(users);

  React.useEffect(() => {
    if (usersdata != undefined && usersdata.length != 0) {
      console.log(usersdata);
      // setUsersdata2()
      Promise.all(usersdata).then((item) => {
        let arr = [];
        item.map((a) => {
          if (a != undefined) {
            arr.push(a);
          }
        });
        arr.sort(function (a, b) {
          if (a.totalmarks < b.totalmarks) {
            return 1;
          }
          return -1;
        });
        setUsersdata2(arr);
        arr.sort(function (a, b) {
          if (a.physicsmarks < b.physicsmarks) {
            return 1;
          }
          return -1;
        });
        setPhysicsdataforrank(arr);
        arr.sort(function (a, b) {
          if (a.chemistrymarks < b.chemistrymarks) {
            return 1;
          }
          return -1;
        });
        setChemistrydataforrank(arr);
        arr.sort(function (a, b) {
          if (a.mathsmarks < b.mathsmarks) {
            return 1;
          }
          return -1;
        });
        setMathsdataforrank(arr);
      });
    }
  }, [usersdata]);
  console.log(usersdata2);

  React.useEffect(() => {
    if (usersdata2 != undefined && usersdata2.length != 0) {
      console.log(usersdata2);
      const db = firebase.firestore();
      db.collection("AITS")
        .doc(mockpaperType)
        .collection("PAPER")
        .doc(paperName)
        .update({ totalstudents: usersdata2.length });
      usersdata2.map((item, index) => {
        db.collection("User")
          .doc(item.uid)
          .collection("AITSPapers")
          .doc(mockpaperType)
          .collection("PAPER")
          .doc(paperName)
          .collection("LeaderBoard")
          .doc("Analysis")
          .update({ Rank: index + 1 });
      });
    }
  }, [usersdata2]);
  React.useEffect(() => {
    if (physicsdataforrank != undefined && physicsdataforrank.length != 0) {
      console.log(physicsdataforrank);
      const db = firebase.firestore();
      physicsdataforrank.map((item, index) => {
        db.collection("User")
          .doc(item.uid)
          .collection("AITSPapers")
          .doc(mockpaperType)
          .collection("PAPER")
          .doc(paperName)
          .collection("LeaderBoard")
          .doc("Analysis")
          .update({ physicsRank: index + 1 });
      });
    }
  }, [physicsdataforrank]);
  React.useEffect(() => {
    if (chemistrydataforrank != undefined && chemistrydataforrank.length != 0) {
      console.log(chemistrydataforrank);
      const db = firebase.firestore();
      chemistrydataforrank.map((item, index) => {
        db.collection("User")
          .doc(item.uid)
          .collection("AITSPapers")
          .doc(mockpaperType)
          .collection("PAPER")
          .doc(paperName)
          .collection("LeaderBoard")
          .doc("Analysis")
          .update({ chemistryRank: index + 1 });
      });
    }
  }, [chemistrydataforrank]);
  React.useEffect(() => {
    if (mathsdataforrank != undefined && mathsdataforrank.length != 0) {
      console.log(mathsdataforrank);
      const db = firebase.firestore();
      mathsdataforrank.map((item, index) => {
        db.collection("User")
          .doc(item.uid)
          .collection("AITSPapers")
          .doc(mockpaperType)
          .collection("PAPER")
          .doc(paperName)
          .collection("LeaderBoard")
          .doc("Analysis")
          .update({ mathsRank: index + 1 });
      });
    }
  }, [mathsdataforrank]);

  return loading == true ? (
    <CircularProgress style={{ margin: "25% 50%" }} />
  ) : analysisnotavalaible ? (
    <div className="no-questions-error">
      Paper Analysis not available. Attempt the paper first
    </div>
  ) : (
    <div className="analysis-page">
      <div style={{ display: "flex", flexDirection: "row" }}>
        {paperTypeCaps == "AITSTEST" && (
          <div style={{ flex: "30%" }}>
            <div
              style={{
                color: "#498E9C",
                fontWeight: "bold",
                fontSize: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              LeaderBoard
            </div>
            <div className="analysis-head">AIR: {data.Rank}</div>
            <div
              style={{
                height: "460px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                {data.Rank == undefined ? (
                  "Results will be declared soon"
                ) : (
                  <div style={{ disply: "flex" }}>
                    <img
                      src={props.user.photoURL ? props.user.photoURL : avatar}
                      className={clsx(classes.navimg)}
                    />
                    <div className="rank-card">
                      <div>
                        <div className="rank-card-sections">
                          <div>Total Students</div>
                          <div>{paperInfo.totalstudents}</div>
                        </div>
                        <div className="rank-card-sections">
                          <div>Percentage</div>
                          <div></div>
                        </div>
                        <div className="rank-card-sections">
                          <div>Av Percentage</div>
                          <div></div>
                        </div>
                        <div className="rank-card-sections">
                          <div>Percentile</div>
                          <div>
                            {(data.Rank / paperInfo.totalstudents) * 100}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rank-card">
                      <div className="rank-card-heading">
                        <div>Subjects</div>
                        <div>Ranks</div>
                      </div>
                      <div>
                        <div className="rank-card-sections">
                          <div>Physics</div>
                          <div>{data.physicsRank}</div>
                        </div>
                        <div className="rank-card-sections">
                          <div>Chemistry</div>
                          <div>{data.chemistryRank}</div>
                        </div>
                        <div className="rank-card-sections">
                          <div>Maths</div>
                          <div>{data.mathsRank}</div>
                        </div>
                      </div>
                    </div>
                    <div className="rank-luck">
                      Best of luck for your final exams
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="detailed-analysis-button-sec">
              <DescriptionOutlinedIcon id="detailed-analysis-button-icon" />
              <Link
                to={
                  `/${paperType}/${mockpaperType}/Papers/Detailed_Analysis/` +
                  paperName
                }
              >
                <button className="detailed-analysis-button">
                  Detailed Analysis
                </button>
              </Link>
            </div>
          </div>
        )}

        <div
          style={{ flex: `${paperTypeCaps == "AITSTEST" ? "70%" : "100%"}` }}
        >
          <div className="analysis-head">Report Card</div>
          <div className="report-card-section">
            <div className="report-card">
              <div className="report-card-heading">
                <div>Overall</div>
                <div>
                  {data.totalMarks}/{totalmarks}
                </div>
              </div>
              <div>
                <div className="report-card-sections">
                  <div>Attempted</div>
                  <div>{data.totalAttempted}</div>
                </div>
                <div className="report-card-sections">
                  <div>Time</div>
                  <div>
                    {calctimedevoted(data.physec + data.chesec + data.matsec)}
                  </div>
                </div>
                <div className="report-card-sections">
                  <div>Correct</div>
                  <div>{data.totalCorrect}</div>
                </div>
                <div className="report-card-sections">
                  <div>Wrong</div>
                  <div>{data.totalAttempted - data.totalCorrect}</div>
                </div>

                <div className="report-card-sections">
                  <div>Accuracy</div>
                  <div>
                    {data.totalAttempted == 0 ? (
                      0
                    ) : (
                      <>
                        {roundOff(
                          (data.totalCorrect / data.totalAttempted) * 100
                        )}
                        %
                      </>
                    )}
                  </div>
                </div>
                <div className="report-card-sections">
                  <div>Percentage</div>
                  <div>
                    {totalmarks == 0 ? (
                      0
                    ) : (
                      <>{roundOff((data.totalMarks / totalmarks) * 100)}%</>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="report-card">
              <div className="report-card-heading">
                <div>Physics</div>
                <div>
                  {data.physicsMarks}/{roundOff(totalmarks / 3)}
                </div>
              </div>
              <div className="report-card-sections">
                <div>Attempted</div>
                <div>{data.physicsAttempted}</div>
              </div>
              <div className="report-card-sections">
                <div>Time</div>
                <div>{calctimedevoted(data.physec)}</div>
              </div>
              <div className="report-card-sections">
                <div>Correct</div>
                <div>{data.physicsCorrect}</div>
              </div>
              <div className="report-card-sections">
                <div>Wrong</div>
                <div>{data.physicsAttempted - data.physicsCorrect}</div>
              </div>

              <div className="report-card-sections">
                <div>Accuracy</div>
                <div>
                  {data.physicsAttempted == 0 ? (
                    0
                  ) : (
                    <>
                      {roundOff(
                        (data.physicsCorrect / data.physicsAttempted) * 100
                      )}
                      %
                    </>
                  )}
                </div>
              </div>
              <div className="report-card-sections">
                <div>Percentage</div>
                <div>
                  {totalmarks == 0 ? (
                    0
                  ) : (
                    <>
                      {roundOff((data.physicsMarks / (totalmarks / 3)) * 100)}%
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="report-card">
              <div className="report-card-heading">
                <div>Chemistry</div>
                <div>
                  {data.chemistryMarks}/{roundOff(totalmarks / 3)}
                </div>
              </div>
              <div className="report-card-sections">
                <div>Attempted</div>
                <div>{data.chemistryAttempted}</div>
              </div>
              <div className="report-card-sections">
                <div>Time</div>
                <div>{calctimedevoted(data.chesec)}</div>
              </div>
              <div className="report-card-sections">
                <div>Correct</div>
                <div>{data.chemistryCorrect}</div>
              </div>
              <div className="report-card-sections">
                <div>Wrong</div>
                <div>{data.chemistryAttempted - data.chemistryCorrect}</div>
              </div>

              <div className="report-card-sections">
                <div>Accuracy</div>
                <div>
                  {data.chemistryAttempted == 0 ? (
                    0
                  ) : (
                    <>
                      {roundOff(
                        (data.chemistryCorrect / data.chemistryAttempted) * 100
                      )}
                      %
                    </>
                  )}
                </div>
              </div>
              <div className="report-card-sections">
                <div>Percentage</div>
                <div>
                  {totalmarks == 0 ? (
                    0
                  ) : (
                    <>
                      {roundOff((data.chemistryMarks / (totalmarks / 3)) * 100)}
                      %
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="report-card">
              <div className="report-card-heading">
                <div>Maths</div>
                <div>
                  {data.mathsMarks}/{roundOff(totalmarks / 3)}
                </div>
              </div>
              <div className="report-card-sections">
                <div>Attempted</div>
                <div>{data.mathsAttempted}</div>
              </div>
              <div className="report-card-sections">
                <div>Time</div>
                <div>{calctimedevoted(data.matsec)}</div>
              </div>
              <div className="report-card-sections">
                <div>Correct</div>
                <div>{data.mathsCorrect}</div>
              </div>
              <div className="report-card-sections">
                <div>Wrong</div>
                <div>{data.mathsAttempted - data.mathsCorrect}</div>
              </div>
              <div className="report-card-sections">
                <div>Accuracy</div>
                <div>
                  {data.mathsAttempted == 0 ? (
                    0
                  ) : (
                    <>
                      {roundOff(
                        (data.mathsCorrect / data.mathsAttempted) * 100
                      )}
                      %
                    </>
                  )}
                </div>
              </div>
              <div className="report-card-sections">
                <div>Percentage</div>
                <div>
                  {totalmarks == 0 ? (
                    0
                  ) : (
                    <>{roundOff((data.mathsMarks / (totalmarks / 3)) * 100)}%</>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="analysis-head">Analysis</div>

          <div className="analysis-section">
            <div id="marks-analysis">
              Subjectwise Marks
              <div className="analysis-sub-section">
                <div id="analysis-chart">
                  <Pie
                    data={
                      percent.physics == 0 &&
                      percent.chemistry == 0 &&
                      percent.maths == 0
                        ? blankData
                        : marksDataChart
                    }
                    options={{ legend: { display: false } }}
                  />
                </div>
                <div id="analysis-chart-legend">
                  <div>Physics: {percent.physics}%</div>
                  <div style={{ color: "#FF4A4F" }}>
                    Chemistry: {percent.chemistry}%
                  </div>
                  <div style={{ color: "#2AD586" }}>
                    Maths: {percent.maths}%
                  </div>
                </div>
              </div>
            </div>

            <div id="legend">
              <div id="legend-sub-sec">
                <div className="legend-subject" style={{ color: "#3B95C2" }}>
                  <div
                    className="legend-circle"
                    style={{ background: "#3B95C2" }}
                  ></div>
                  Physics
                </div>
                <div className="legend-subject" style={{ color: "#FF4A4F" }}>
                  <div
                    className="legend-circle"
                    style={{ background: "#FF4A4F" }}
                  ></div>
                  Chemistry
                </div>
                <div className="legend-subject" style={{ color: "#2AD586" }}>
                  <div
                    className="legend-circle"
                    style={{ background: "#2AD586" }}
                  ></div>
                  Maths
                </div>
              </div>
            </div>

            <div id="time-analysis">
              Time Devoted
              <div className="analysis-sub-section">
                <div id="analysis-chart-legend">
                  <div style={{ color: "#448498" }}>
                    Physics:{" "}
                    {data.physec
                      ? roundOff(data.physec / data.totalsec) * 100
                      : 0}
                    %
                  </div>
                  <div style={{ color: "#FF4A4F" }}>
                    Chemistry:{" "}
                    {data.chesec
                      ? roundOff(data.chesec / data.totalsec) * 100
                      : 0}
                    %
                  </div>
                  <div style={{ color: "#2AD586" }}>
                    Math:{" "}
                    {data.matsec
                      ? roundOff(data.matsec / data.totalsec) * 100
                      : 0}
                    %
                  </div>
                </div>
                <div id="analysis-chart">
                  <Pie
                    data={data.totalAttempted == 0 ? blankData : timeDataChart}
                    options={{ legend: { display: false } }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bar-section">
        {/* physics section */}
        <div className="subject-bar-card" style={{ background: "#D8F3FD" }}>
          <div className="subject-bar-card-bar-sec-head">Physics</div>
          <div className="subject-bar-card-bar-wrapper">
            <div className="subject-bar-card-bar-sec">
              {[0, 1, 2, 3, 4, 5].map((index, i) =>
                data && data.physicsTags[i + "e"] ? (
                  <BarGraph
                    correct={
                      data.physicsTags[i + "a"] == 0
                        ? 0
                        : roundOff(
                            (data.physicsTags[i + "c"] /
                              data.physicsTags[i + "a"]) *
                              100
                          )
                    }
                    wrong={
                      data.physicsTags[i + "a"] == 0
                        ? 0
                        : 100 -
                          roundOff(
                            (data.physicsTags[i + "c"] /
                              data.physicsTags[i + "a"]) *
                              100
                          )
                    }
                    name={tagMap.physics[i]}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
        <div className="subject-bar-card" style={{ background: "#FCFDD8" }}>
          <div className="subject-bar-card-bar-sec-head">Chemistry</div>
          <div className="subject-bar-card-bar-wrapper">
            <div className="subject-bar-card-bar-sec">
              {[0, 1, 2, 3, 4, 5].map((index, i) =>
                data && data.chemistryTags[i + "e"] ? (
                  <BarGraph
                    correct={
                      data.chemistryTags[i + "a"] == 0
                        ? 0
                        : roundOff(
                            (data.chemistryTags[i + "c"] /
                              data.chemistryTags[i + "a"]) *
                              100
                          )
                    }
                    wrong={
                      data.chemistryTags[i + "a"] == 0
                        ? 0
                        : 100 -
                          roundOff(
                            (data.chemistryTags[i + "c"] /
                              data.chemistryTags[i + "a"]) *
                              100
                          )
                    }
                    name={tagMap.chemistry[i]}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
        <div className="subject-bar-card" style={{ background: "#FDEDD8" }}>
          <div className="subject-bar-card-bar-sec-head">Mathematics</div>
          <div className="subject-bar-card-bar-wrapper">
            <div className="subject-bar-card-bar-sec">
              {[0, 1, 2, 3, 4, 5].map((index, i) =>
                data && data.mathsTags[i + "e"] ? (
                  <BarGraph
                    correct={
                      data.mathsTags[i + "a"] == 0
                        ? 0
                        : roundOff(
                            (data.mathsTags[i + "c"] /
                              data.mathsTags[i + "a"]) *
                              100
                          )
                    }
                    wrong={
                      data.mathsTags[i + "a"] == 0
                        ? 0
                        : 100 -
                          roundOff(
                            (data.mathsTags[i + "c"] /
                              data.mathsTags[i + "a"]) *
                              100
                          )
                    }
                    name={tagMap.maths[i]}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
  };
};

export default connect(mapStateToProps)(PaperAnalysis);
