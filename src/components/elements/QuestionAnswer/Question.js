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
    const [question,setQuestion]=React.useState(props.question?props.question.question:["No content found"])
    const [solution,setSolution]=React.useState(props.question?props.question.solution:["No content found"])
    const [hint,setHint]=React.useState(props.question?props.question.hint:["No content found"])
    
    React.useEffect(() => {
        setQuestion(props.question?props.question.question:sampleQues)
    }, [props.question])

    // console.log(question,solution,hint)
    console.log("props",props)

    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Row noGutters  >
                    <Col xs={6}>
                        <QuestionSection number={props.number} data={question}/>
                    </Col>
                    <Col xs={6}>
                        {/* {console.log("in question.js",props.number)} */}
                        {props.type=="subjectwise"?
                            <SubjectwiseChoiceSection
                                data={props.question} 
                                qid={props.qid}
                                solution={solution}
                                hint={hint}
                                noOfQuestions={props.noOfQuestions} 
                                number={props.number} 
                                goToPrevQuestion={props.goToPrevQuestion} 
                                goToNextQuestion={props.goToNextQuestion}
                            />
                            :<ChoiceSection 
                                data={props.question} 
                                qid={props.question.qid}
                                noOfQuestions={props.noOfQuestions} 
                                number={props.number} 
                                goToPrevQuestion={props.goToPrevQuestion} 
                                goToNextQuestion={props.goToNextQuestion}
                                showSummary={props.showSummary}
                            />} 
                    </Col>
            </Row>
        </Container>
    )
}
