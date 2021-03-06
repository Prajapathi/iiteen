import React, { useEffect, useState } from "react";
import "../../../styles/subjectSection.css";
import physics from "../../../assets/images/physics.png";
import chemistry from "../../../assets/images/Chemistry.png";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import maths from "../../../assets/images/Maths.png";
import CardSection from "../../elements/CardSection";

export default function PreviousYearSubjectSection(props) {
  const [search, setSearch] = useState("");
  var subject = props.subject;

  const searchup = (item) => {
    //console.log(item)
    setSearch(item);
  };
  return (
    <div>
      <div id="subject-bar">
        <div className="subject-sub-bar">
          <div id="sub">
            <div id="sub-info">
              <div id="chapterNos">27 Chapters</div>
            </div>
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
                {subject == "physics"
                  ? "Physics"
                  : subject == "chemistry"
                  ? "Chemistry"
                  : "Maths"}
              </h2>
              <img
                src={
                  subject == "physics"
                    ? physics
                    : subject == "chemistry"
                    ? chemistry
                    : maths
                }
                id="subject-img"
                alt={subject}
              />
            </div>
          </div>
          <input
            type="text"
            className="search-chapter"
            placeholder="Search"
            onChange={(e) => {
              console.log("search", e.target.value);
              searchup(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <CardSection
          sec="PreviousYearSectionwise"
          search={search}
          subject={subject}
          classNumber={props.classNumber}
          loadingStart={props.loadingStart}
        />
      </div>
    </div>
  );
}
