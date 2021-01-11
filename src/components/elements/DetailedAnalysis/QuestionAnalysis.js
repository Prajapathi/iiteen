import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import QuestionSection from '../QuestionAnswer/QuestionSection'
import SubjectwiseChoiceSection from '../QuestionAnswer/SubjectwiseChoiceSection'
import ChoiceAnalysis from './ChoiceAnalysis'
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

export default function Analysis(props) {
    const [question,setQuestion]=React.useState(props.question?props.question.question:[""])
    
    React.useEffect(() => {
        setQuestion(props.question?props.question.question:sampleQues)
    }, [props.question])

    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Row noGutters  >
                    <Col xs={6}>
                        <QuestionSection number={props.number} data={question}/>
                    </Col>
                    <Col xs={6}>
                        {props.type=="subjectwise"?<SubjectwiseChoiceSection/>:
                            <ChoiceAnalysis
                                data={props.question} 
                                noOfQuestions={props.noOfQuestions} 
                                number={props.number} 
                                answers={props.answers}
                                goToPrevQuestion={props.goToPrevQuestion} 
                                goToNextQuestion={props.goToNextQuestion}
                            />} 
                    </Col>
            </Row>
        </Container>
    )
}
