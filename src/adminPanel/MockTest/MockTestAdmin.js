import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";

const MockTestAdmin = () => {
  return (
    <div>
      <Container
      style={{
        marginTop: "10%",
        textAlign: "center",
        color: "rgb(88, 88, 88)",
      }}
      >
        <h1>Mock test admin pane</h1>
        <div
        style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Row>
            <Col>
              <a href={`/mocktestadminmain`}>
                <div className={styl.subjects}>
                  <h4>Mock Test</h4>
                </div>
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default MockTestAdmin;
