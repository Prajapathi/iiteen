import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";

const MockTestAdminMain = () => {
  localStorage.removeItem("count");
    return (
        <div>
        <Container
          style={{
            marginTop: "10%",
            textAlign: "center",
            color: "rgb(88, 88, 88)",
          }}
        >
          <h1>Select Paper Type</h1>
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Row>
              <Col>
                <a href={'/mocktestadminmain/mains'}>
                  <div className={styl.subjects}>
                    <h4>Mains</h4>
                  </div>
                </a>
              </Col>
              <Col>
                <a href={'/mocktestadminmain/advance'}>
                  <div className={styl.subjects}>
                    <h4>Advanced</h4>
                  </div>
                </a>
              </Col>
            </Row>
          </div>
        </Container>
        </div>
    )
}

export default MockTestAdminMain
