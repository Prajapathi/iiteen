import React from 'react'
import {Link,useLocation,useHistory} from "react-router-dom";
import firebase from 'firebase'
import {connect} from 'react-redux'
import '../../../../styles/choiceSection.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Question from '../../QuestionAnswer/Question'

export function Paper(props) {
    const history= useHistory();
    const [palleteArray,setPalleteArray]=React.useState([])
    const [questions,setQuestions]=React.useState([])
    const [index,setIndex]=React.useState(0)

    React.useEffect(() => {
        //if user is not navigating through MockTestCard then redirect to home
        let verifyPaper=localStorage.getItem("PaperName")
        if(verifyPaper==null|| verifyPaper!="Subjectwise"){
            history.push('/Subjectwise')
        }
        localStorage.removeItem("PaperName")

        console.log("lll",props.paper)
        setQuestions(props.paper.questions)
        const a=[];
        for(let i=0;i<25;i++){
            a.push(0)
        }
        setPalleteArray(a);
        setIndex(props.paper.lastIndex?props.paper.lastIndex:0)
    }, [])

    const navigateQuestion=(ind)=>{
        setIndex(ind)
    }

    return (
        <>
            <div className="timer-bar subjectwise-title-bar">
                        <div>{props.paper.name} </div>
                        <div>Level {props.paper.level} </div>
            </div>
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0,marginLeft: 0, marginRight: 0}}>
                <div  noGutters style={{marginLeft: 0, marginRight: 0, display:'flex'}} >

                        <div style={{width:'80%'}} >
                            <Question key={index}
                                type={"subjectwise"} 
                                question={questions? questions[index]: []}
                                noOfQuestions={25}
                                number={questions && questions[index]?questions[index].number:0}
                                goToPrevQuestion={()=>setIndex(index-1)} 
                                goToNextQuestion={()=>setIndex(index+1)}
                            />
                        </div>

                        <div style={{width:'20%'}}>
                            <div className="ques-pallete">
                                {
                                     palleteArray.map((text, ind) => ( 
                                            <div className="page-no" 
                                                style={{
                                                    background:props.answers[ind].isBookmarked?'#ff9700':
                                                        (( props.answers[ind].isAnswered)?'#3B95C2':'white'),
                                                    color:props.answers[ind].isBookmarked||( props.answers[ind].isAnswered)?"white":"black",
                                                    border:index==ind?'1px solid black':null
                                                }} 
                                                onClick={()=>navigateQuestion(ind)}>
                                                {ind+1}
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                </div>
            </Container>
        </>
    )
}
const mapStateToProps=(state)=>{
    return{
        paper:state.MockTestReducer.paper,
        answers:state.MockTestReducer.answers,
    }
}

export default connect(mapStateToProps)(Paper)