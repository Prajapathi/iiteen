import React, { useEffect, useState } from "react";
import "../../../styles/subjectSection.css";
import physics from "../../../assets/images/physics.png";
import chemistry from "../../../assets/images/Chemistry.png";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import maths from "../../../assets/images/Maths.png";
import CardSection from "../../elements/CardSection";
import { AITStestCardSection } from "./AITStestCardSection";

export default function SubjectSection(props) {
  const [search, setSearch] = useState("");
  var heading = props.heading;

  const searchup = (item) => {
    //console.log(item)
    setSearch(item);
  };
  return (
    <div>
      <div id="subject-bar">
        <div className="subject-sub-bar">
          <div id="sub">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontWeight: "700",
                  marginRight: "10px",
                  marginTop: "7px",
                }}
              >
                {heading}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div>
        <AITStestCardSection
            section="AITS"
          classNumber={props.classNumber}
          loadingStart={props.loadingStart}
        />
      </div>
    </div>
  );
}
