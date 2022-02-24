import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styl from "../components/css/QuePaper.module.css";
import "../components/css/myCss.css";
import { useHistory } from "react-router-dom";

const SubPaper = () => {
  localStorage.removeItem("Class");
  localStorage.removeItem("chapter");
  localStorage.removeItem("a");

  return (
    <div>
      <Container
        style={{
          marginTop: "10%",
          textAlign: "center",
          color: "rgb(88, 88, 88)",
        }}
      >
        <h1>Subject Wise</h1>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Row>
            <Col>
              <a href={`/Subjectwise/0`}>
                <div className={styl.subjects}>
                  <h4>Physics</h4>
                </div>
              </a>
            </Col>
            <Col>
              <a href={`/Subjectwise/1`}>
                <div className={styl.subjects}>
                  <h4>Chemistry</h4>
                </div>
              </a>
            </Col>
            <Col>
              <a href={`/Subjectwise/2`}>
                <div className={styl.subjects}>
                  <h4>Maths</h4>
                </div>
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SubPaper;
