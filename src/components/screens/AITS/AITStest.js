import React,{useEffect} from "react";
import "../../../styles/subjectwise.css";
import Button from "@material-ui/core/Button";
import Loading from "../../elements/Loading";
import AITStestSection from "./AITStestSection";
import { AITStestCardSection } from "./AITStestCardSection";

export default function Subjectwise() {
  const [loading, setLoading] = React.useState(false);

  document.title = "AITS | IITEENS";
  return (
    <div className="screen" id="subjectwise">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "800",
              letterSpacing: "5px",
              wordSpacing: "15px",
              color: "#3F7B94",
              padding: "15px 0px",
            }}
          >
            ALL INDIA TEST SERIES
          </h1>
          <div>
            <AITStestCardSection
              heading="Upcoming Test"
              loadingStart={setLoading}
              papertype="mains"
            />
          </div>
          <div>
            <AITStestCardSection
              heading="Past Test"
              loadingStart={setLoading}
            />
          </div>
        </>
      )}
    </div>
  );
}
