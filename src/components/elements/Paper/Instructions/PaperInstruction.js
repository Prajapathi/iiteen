import React from "react";
import "../../../../styles/paperInstruction.css";

const MainsDefaultInst = [
  {
    data: "25 questions each for Physics, Chemistry & Maths",
    isLine: false,
    section: 0,
    points: [],
  },
  {
    data: "20 Objective Multiple Choice type Questions(MCQs) per subject",
    isLine: true,
    section: 3,
    points: [
      { color: 2, data: "4 Marks for correct Answer" },
      { color: 1, data: "1 Negative mark for Incorrect Answer" },
      { color: 3, data: "No Negative mark for Skipped Questions" },
    ],
  },
  {
    data: "5 Numerical Type Questions per subject",
    isLine: false,
    section: 2,
    points: [
      { color: 2, data: "4 Marks for correct Answer" },
      {
        color: 1,
        data: "No Negative marks for Incorrect answer or Skipped Questions",
      },
      {
        color: 3,
        data: "Round off the answer to 2(two) decimal places;e.g. 3.45,-4.00,-156.10,0.12",
      },
    ],
  },
];
const AdvDefaultInst = [
  {
    data: "18 questions each for Physics, Chemistry & Maths",
    isLine: false,
    section: 0,
    points: [],
  },
  {
    data: "Each Subject contains Three Parts: Part-A, Part-B, Part-C",
    isLine: true,
    section: 0,
    points: [],
  },
  {
    data: "Part-A contains 6 multiple choice questions. Each Question has 4 choices (A),(B),(C),(D) out of which only ONE is correct.",
    isLine: false,
    section: 3,
    points: [
      { color: 2, data: "3 Marks for correct Answer" },
      { color: 1, data: "1 Negative mark for Incorrect Answer" },
      { color: 3, data: "No Negative mark for Skipped Questions" },
    ],
  },
  {
    data: "Part-B contains 6 multiple choice questions. Each Question has 4 choices (A),(B),(C),(D) out of which one or more is/are correct.",
    isLine: false,
    section: 4,
    points: [
      { color: 2, data: "4 Marks if all correct options are marked correct" },
      { color: 2, data: "4 Marks if all correct options are marked correct" },
      {
        color: 1,
        data: "-2 Negative mark for Incorrect combination of Answer marked",
      },
      { color: 3, data: "No Negative mark for Skipped Questions" },
    ],
  },
  {
    data: "Part-C contains 6 integer type questions. The answer to each question is a single digit integer ranging from 0 to 9.",
    isLine: false,
    section: 1,
    points: [
      { color: 2, data: "3 Marks for correct Answer" },
      { color: 1, data: "-1 Negative mark for Incorrect Answer" },
      { color: 3, data: "No Negative mark for Skipped Questions" },
    ],
  },
];
export default function PaperInstruction(props) {
  const [check, setCheck] = React.useState(false);
  const [totalmarks, setTotalmarks] = React.useState(0);
  const markdistribution = [
    [3, 1, 0],
    [4, 2, 0],
    [4, 0, 0],
    [2, 0, 0],
  ];

  React.useEffect(() => {
    console.log(props.details.sections);
    let tm = 0;
    let marksdistributiontype = 0;
    props.details.sections &&
      props.details.sections.map((item, i) => {
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
  }, []);

  return (
    <div id="inst-body">
      <div id="paper-heading">
        {props.details.sections ? "JEE ADVANCE" : "JEE MAINS"}{" "}
      </div>
      <div id="top-bar">MARKING SCHEME</div>
      <div id="detail-head">
        <div>
          <div className="detail-subhead">Duration</div>
          <div className="detail-subhead-data">
            {props.details.sections ? "M" : "180"} mins
          </div>
        </div>
        <div>
          <div className="detail-subhead">Questions</div>
          <div className="detail-subhead-data">
            {props.details ? props.details.noOfQuestions : "-"}
          </div>
        </div>
        <div>
          <div className="detail-subhead">Marks</div>
          <div className="detail-subhead-data">
            {props.details ? totalmarks : "-"}
          </div>
        </div>
      </div>

      {!props.inst ? (
        <>
          <div className="paper-inst">
            <div className="inst-point-box"></div>
            <div className="inst-point-data">
              30 questions each for Physics, Chemistry and Maths
            </div>
          </div>
          <div className="paper-inst">
            <div className="inst-point-box"></div>
            <div className="inst-point-data">
              Each Subject contains 2 Parts: Part A, Part B
            </div>
          </div>
          <div className="paper-inst">
            <div className="inst-point-box"></div>
            <div className="inst-point-data">
              Part A contains 20 multiple choice questions. Each Questions has 4
              choices (A),(B),(C),(D) out of which only ONE is correct
              <ul style={{marginLeft:"42px"}}>
                <li style={{ listStyleType: "none" }}>
                  <div className="inst-sub-points">
                    <div
                      style={{
                        
                        background: "#2BC559",
                      }}
                    ></div>
                    4 Marks for correct answer
                  </div>
                </li>
                <li style={{ listStyleType: "none" }}>
                  <div className="inst-sub-points">
                    <div
                      style={{
                        background: "#F6391B",
                      }}
                    ></div>
                    1 negative mark for incorrect Answer
                  </div>
                </li>
                <li style={{ listStyleType: "none" }}>
                  <div className="inst-sub-points">
                    <div
                      style={{
                        background: "#878585",
                      }}
                    ></div>
                    No Negative mark for Skipped Questions
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="paper-inst">
            <div className="inst-point-box"></div>
            <div className="inst-point-data">
              Part B contains 10 numerical choice questions. The answer to each
              questions is a numerical
              <ul style={{marginLeft:"42px"}}>
                <li style={{ listStyleType: "none" }}>
                  <div className="inst-sub-points">
                    <div
                      style={{
                        
                        background: "#2BC559",
                      }}
                    ></div>
                    4 Marks for correct answer
                  </div>
                </li>
                <li style={{ listStyleType: "none" }}>
                  <div className="inst-sub-points">
                    <div
                      style={{
                        background: "#F6391B",
                      }}
                    ></div>
                    1 negative mark for incorrect Answer
                  </div>
                </li>
                <li style={{ listStyleType: "none" }}>
                  <div className="inst-sub-points">
                    <div
                      style={{
                        background: "#878585",
                      }}
                    ></div>
                    No Negative mark for Skipped Questions
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="paper-inst">
            <div className="inst-point-box"></div>
            <div className="inst-point-data">
              {props.details.noOfQuestions / 3} questions each for Physics,
              Chemistry and Maths.
            </div>
          </div>
          <div className="paper-inst">
            <div className="inst-point-box"></div>
            <div className="inst-point-data">
              Each Subject contains {props.inst.length} Parts:{" "}
              {props.inst.map((items, index) => (
                <span>Part {String.fromCharCode(65 + index)}, </span>
              ))}
            </div>
          </div>
          {props.inst
            ? props.inst.map((items, index) => (
                <div className="paper-inst">
                  <div className="inst-point-box"></div>
                  <div className="inst-point-data">
                    Part-{String.fromCharCode(65 + index)} contains{" "}
                    {items.noofques}{" "}
                    {items.type == "singletype"
                      ? "multiple choice questions. Each Questions has 4 choices (A),(B),(C),(D) out of which only ONE is correct"
                      : items.type == "multipletype"
                      ? "multiple choice questions. Each Questions has 4 choices (A),(B),(C),(D) out of which ONE or more is/are correct"
                      : items.type == "integertype"
                      ? "integer type questions. The answer to each questions is a single digit integer ranging from 0 to 9"
                      : "numerical type questions. The answer to each questions is a numerical"}
                    {items.type == "singletype" ? (
                      <ul style={{marginLeft:"42px"}}>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#2BC559",
                              }}
                            ></div>
                            3 Marks for correct answer
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                
                                background: "#F6391B",
                              }}
                            ></div>
                            1 negative mark for incorrect Answer
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#878585",
                              }}
                            ></div>
                            No Negative mark for Skipped Questions
                          </div>
                        </li>
                      </ul>
                    ) : items.type == "multipletype" ? (
                      <ul style={{marginLeft:"42px"}}>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#2BC559",
                                
                              }}
                            ></div>
                            4 Marks if all correct options are marked correct
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#e6e600",
                              }}
                            ></div>
                            3 mark ,if all 4 correct but only 3 are selected
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#e6e600",
                              }}
                            ></div>
                            2 mark ,if 3 or more are correct but only 2 are selected
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#e6e600",
                              }}
                            ></div>
                            1 mark ,if 2 or more are correct but only 1 is selected
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#F6391B",
                              }}
                            ></div>
                            2 Negative mark for incorrect combination of Answer
                            marked
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#878585",
                              }}
                            ></div>
                            No Negative mark for Skipped Questions
                          </div>
                        </li>
                      </ul>
                    ) : items.type == "integertype" ? (
                      <ul style={{marginLeft:"42px"}}>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#2BC559",
                              }}
                            ></div>
                            4 Marks for correct answer
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                
                                background: "#F6391B",
                              }}
                            ></div>
                            No negative mark for incorrect Answer
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#878585",
                              }}
                            ></div>
                            No Negative mark for Skipped Questions
                          </div>
                        </li>
                      </ul>
                    ) : (
                      <ul style={{marginLeft:"42px"}}>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#2BC559",
                              }}
                            ></div>
                            2 Marks for correct answer
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#F6391B",
                              }}
                            ></div>
                          No negative mark for incorrect Answer
                          </div>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <div className="inst-sub-points">
                            <div
                              style={{
                                background: "#878585",
                              }}
                            ></div>
                            No Negative mark for Skipped Questions
                          </div>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ))
            : null}
        </>
      )}

      <div id="inst-bottom">
        <div style={{ display: "flex" }}>
          <label class="inst-checkbox">
            I have read the instructions
            <input
              type="checkbox"
              checked={check}
              onClick={() => setCheck(!check)}
            />
            <span class="checkmark"></span>
          </label>
        </div>
        <div>
          {/* Time Remaining: 00:30:00 */}
          <button
            id="inst-start"
            style={{ background: "#ff9700" }}
            onClick={() => props.goToGeneralInst()}
          >
            Back
          </button>
          <button
            id="inst-start"
            style={{ background: !check ? "grey" : null }}
            disabled={!check}
            onClick={() => props.start(true)}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
