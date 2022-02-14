import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function InstructionDropdown(props) {
  const [instruction, setInstruction] = useState(["", "", "", "", ""]);

  const { mockpaperType } = useParams();

  useEffect(
    () => {
      //creating instruction array for individual sections
      // const i = [...instruction];
      // props.inst.map((item, index) => (i[item.section] = item));
      // setInstruction(i);
    },
    [
      //   props.inst
    ]
  );

  return (
    <div>
      <>
        {/* <div className="paper-inst">
          <div className="inst-point-box"></div>
          <div className="inst-point-data">
            {instruction[props.section].data}

            <ul>
              {instruction[props.section].points
                ? instruction[props.section].points.map((key, ind) =>
                    instruction[props.section].points[ind] == "" ? null : (
                      <li key={ind} style={{ listStyleType: "none" }}>
                        <div className="inst-sub-points">
                          {instruction[props.section].points[ind].color ==
                          "" ? null : (
                            <div
                              style={{
                                background:
                                  instruction[props.section].points[ind]
                                    .color == 1
                                    ? "#F6391B"
                                    : instruction[props.section].points[ind]
                                        .color == 2
                                    ? "#2BC559"
                                    : "#878585",
                              }}
                            ></div>
                          )}
                          {instruction[props.section].points[ind].data}
                        </div>
                      </li>
                    )
                  )
                : null}
            </ul>
          </div>
        </div>

        {instruction[props.section].isLine == true ? <hr /> : null} */}

        {mockpaperType == "MAINS" ? (
          <>
            {props.answerType == 4 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  paddingBottom: "0px",
                }}
              >
                <div className="inst-point-box"></div>
                <div className="inst-point-data">
                  Part A contains 20 multiple choice questions. Each Questions
                  has 4 choices (A),(B),(C),(D) out of which only ONE is correct
                  <ul style={{ marginLeft: "42px" }}>
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
            )}
            {props.answerType == 2 && (
              <div 
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexWrap: "wrap",
                justifyContent: "center",
                paddingBottom: "0px",
              }}
              >
                <div className="inst-point-box"></div>
                <div className="inst-point-data">
                  Part B contains 10 numerical choice questions. The answer to
                  each questions is a numerical
                  <ul style={{ marginLeft: "42px" }}>
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
            )}
          </>
        ) : (
          <>
            {props.answerType == 4 && (
              <div 
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexWrap: "wrap",
                justifyContent: "center",
                paddingBottom: "0px",
              }}
              >
                <div className="inst-point-box"></div>
                <div className="inst-point-data">
                  Part A contains 20 multiple choice questions. Each Questions
                  has 4 choices (A),(B),(C),(D) out of which only ONE is correct
                  <ul style={{ marginLeft: "42px" }}>
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
                </div>
              </div>
            )}
            {props.answerType == 2 && (
              <div 
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexWrap: "wrap",
                justifyContent: "center",
                paddingBottom: "0px",
              }}
              >
                <div className="inst-point-box"></div>
                <div className="inst-point-data">
                  Part B contains 10 numerical choice questions. The answer to
                  each questions is a numerical
                  <ul style={{ marginLeft: "42px" }}>
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
                </div>
              </div>
            )}
            {props.answerType == 5 && (
              <div 
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexWrap: "wrap",
                justifyContent: "center",
                paddingBottom: "0px",
              }}
              >
                <div className="inst-point-box"></div>
                <div className="inst-point-data">
                  Part C multiple choice questions. Each Questions has 4 choices
                  (A),(B),(C),(D) out of which ONE or more is/are correct
                  <ul style={{ marginLeft: "42px" }}>
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
                </div>
              </div>
            )}
            {props.answerType == 1 && (
              <div 
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexWrap: "wrap",
                justifyContent: "center",
                paddingBottom: "0px",
              }}
              >
                <div className="inst-point-box"></div>
                <div className="inst-point-data">
                  Part D multiple choice questions. Each Questions has 4 choices
                  (A),(B),(C),(D) out of which ONE or more is/are correct
                  <ul style={{ marginLeft: "42px" }}>
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
                </div>
              </div>
            )}
            {/* {props.inst
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
                    ) : (
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
                    )}
                  </div>
                </div>
              ))
            : null} */}
          </>
        )}
      </>
    </div>
  );
}
