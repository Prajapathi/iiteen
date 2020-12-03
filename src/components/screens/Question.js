import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import QuestionSection from '../elements/QuestionAnswer/QuestionSection'
import SubjectwiseChoiceSection from '../elements/QuestionAnswer/SubjectwiseChoiceSection'
import ChoiceSection from '../elements/QuestionAnswer/ChoiceSection'
import '../../styles/question.css'

export default function Question(props) {
    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Row noGutters  >
                    <Col xs={5}>
                        <QuestionSection/>
                    </Col>
                    <Col xs={7}>
                        {props.type=="subjectwise"?<SubjectwiseChoiceSection/>:<ChoiceSection/>} 
                    </Col>
            </Row>
        </Container>
    )
}
