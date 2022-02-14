import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";

const MockTestAdmin = () => {
  const params=useParams();

  return (
    <div>
      <Container
      style={{
        marginTop: "10%",
        textAlign: "center",
        color: "rgb(88, 88, 88)",
      }}
      >
        <h1>{params.type=='mocktest'?"MOCK":"AITS"} test admin pane</h1>
        <div
        style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Row>
            <Col>
              <a href={`/admin/${params.type}/main`}>
                <div className={styl.subjects}>
                  <h4>{params.type=='mocktest'?"MOCK":"AITS"} Test</h4>
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
