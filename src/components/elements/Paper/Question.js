import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import QuestionSection from '../QuestionAnswer/QuestionSection'
import SubjectwiseChoiceSection from '../QuestionAnswer/SubjectwiseChoiceSection'
import ChoiceSection from '../QuestionAnswer/ChoiceSection'
import '../../../styles/question.css'

const sampleQues=[
    {
        data:"This is sample question. Choose the correct option from the following given options",
        type:1
    },
    {
        data:"",
        type:0
    },
    {
        data:"These are sample text segments.",
        type:1
    },
    {
        data:"y=\int_{0}^{1}x^{9}dx",
        type:2
    }
]

export default function Question(props) {
    const [question,setQuestion]=React.useState(props.question?props.question.question:["yo"])
    
    React.useEffect(() => {
        setQuestion(props.question?props.question.question:sampleQues)
    }, [props.question])

    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Row noGutters  >
                    <Col xs={5}>
                    <h2>{props.question?props.question.number:"pop"}</h2>
                        <QuestionSection data={question}/>
                    </Col>
                    <Col xs={7}>
                        {props.type=="subjectwise"?<SubjectwiseChoiceSection/>:<ChoiceSection nextQuestion={props.nextQuestion}/>} 
                    </Col>
            </Row>
        </Container>
    )
}
