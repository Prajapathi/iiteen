import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux'
import firebase from 'firebase'
import {clearAnswer,setAnswer,bookmarkQuestion} from '../../../store/action/Paper'
import '../../../styles/choiceSection.css'
import '../../../styles/detailedAnalysis.css'
import Container from 'react-bootstrap/Container'
import { InlineMath, BlockMath } from 'react-katex';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

export function SubjectwiseChoiceSection(props) {
    const [palleteSub,setPalleteSub]=React.useState(1);
    const [answer,setAnswer]=React.useState('')
    const [correctAnswer,setCorrectAnswer]=React.useState('')
    const [selectOpt,setSelectOpt]=React.useState([false,false,false,false])
    const [show, setShow] = useState(false);
    const [wrongAttempt,setWrongAttempt]=useState(false)
    const [showSolution,setShowSolution]=useState(false)
    const [showHint,setShowHint]=useState(false)
    const [checked, setChecked] = React.useState(false);
    const [animate,setAnimate]=React.useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

console.log("kkk",props.stateAnswer[props.number-1])

    useEffect(() => {
        //if answer given was wrong initially and solution was not shown, don't display previously given answer
        if(props.stateAnswer[props.number-1] && props.stateAnswer[props.number-1].isAnsweredWrong &&props.stateAnswer[props.number-1].isAnswered)
            return
        //if answer was already submitted then load this into local state for display
        if(props.stateAnswer[props.number-1] && props.stateAnswer[props.number-1].answerGiven!=null){
            let opt=[false,false,false,false]
            //for multi-correct questions
            if(props.stateAnswer[props.number-1].answerType==5)
                for(let i=0;i<props.stateAnswer[props.number-1].answerGiven.length;i++){
                        opt[props.stateAnswer[props.number-1].answerGiven[i]]=true
                }
            //for single-correct questions
            else if(props.stateAnswer[props.number-1].answerType==4)
                opt[props.stateAnswer[props.number-1].answerGiven]=true
           
            setSelectOpt(opt)
            setAnswer(props.stateAnswer[props.number-1].answerGiven)
        }
        if(props.stateAnswer[props.number-1] && !props.stateAnswer[props.number-1].isAnsweredWrong && props.stateAnswer[props.number-1].isAnswered)
            setShowSolution(true)
        
    }, [props.stateAnswer[props.number-1]])

    const changeOptSingle=(ind)=>{
        const opts=[false,false,false,false];
        opts[ind]=!selectOpt[ind];
        let ans=-1;
        for(let i=0;i<4;i++){
            if(opts[i]==true)
                ans=i
        }
        setAnswer(ans)
        setSelectOpt(opts)
    }

    const changeOptMultiple=(ind)=>{
        const opts=[false,false,false,false];
        for(let i=0;i<4;i++){
            if(ind==i)
                opts[i]=!selectOpt[i]
            else
                opts[i]=selectOpt[i]
        }
        let ans=[]
        for(let i=0;i<4;i++){
            if(opts[i]==true)
                ans.push(i)
        }
        setAnswer(ans)
        setSelectOpt(opts)
    }

    const saveAttemptDatabase=()=>{
        //when user clicks on show Solution or gives correct answer, update it in DB
        let lev="Level 0"+props.paper.level
        const db = firebase.firestore();
        db.collection("User").doc(props.user.uid).collection("SUBJECTWISEPapers").doc("Class "+props.paper.classNumber).collection(props.paper.subject).doc("Chapter "+props.paper.chapter)
            .set({
                [lev]:[...props.stateAnswer]
            },{merge: true})
            .then((res)=>{
                console.log("Saved")
            })
            .catch((err)=>{
                console.log("Error saving option",err)
            })
    }
    const submitQuestionPre=()=>{
        setAnimate(false)
    }
    const submitQuestion=()=>{
        //before submitting check the input answer. Set the value of flag to 1 if answer is not acceptable
        let flag=0;
        if(props.data.answerType==1){
            flag=Number.isInteger(answer)?0:1;
        }
        else if(props.data.answerType==2){
            flag=(answer==='')?1:0;
        }
        else if (props.data.answerType==4){
            if(answer===''|| answer==-1){
                flag=1;
            }
        }
        else if(props.data.answerType==5){
            if(answer==='' || answer.length==0)
                flag=1;
        }
        //if the answer given was in acceptable format
        if(flag==0){
            let previouslyAnswered=props.stateAnswer[props.number-1].isAnswered;
            props.setAnswer(props.number-1,answer);
            //if it was not answered before, save the new first attempt in database

            console.log(answer)
            //if the answer was wrong
            if(props.stateAnswer[props.number-1].isAnsweredWrong){
                setWrongAttempt(true)
                setShowHint(true)
                submitQuestionPre()
                setTimeout(() => {
                    setAnimate(true)
                }, 100);
            }
            //if the answer was correct
            else {
                setWrongAttempt(false)
                setShowSolution(true)
                saveAttemptDatabase();
            }
            if(!previouslyAnswered){
                saveAttemptDatabase();
            }
        }
        //if the answer given was not in acceptable format
        else{
            setShow(true)
        }
        
    }

    const giveUp=()=>{
        setShowSolution(true)
        setShowHint(false)
        setAnswer(props.stateAnswer[props.number-1].answer)
        props.setAnswer(props.number-1,props.stateAnswer[props.number-1].answer)

        let opt=[false,false,false,false]

        //for multi-correct questions
        if(props.stateAnswer[props.number-1].answerType==5)
            for(let i=0;i<props.stateAnswer[props.number-1].answer.length;i++){
                    opt[props.stateAnswer[props.number-1].answer[i]]=true
            }

        //for single-correct questions
        else if(props.stateAnswer[props.number-1].answerType==4)
            opt[props.stateAnswer[props.number-1].answer]=true
        
        setSelectOpt(opt)

        saveAttemptDatabase();
    }
    
    return(
        <>
        <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Row noGutters >
                <Col id="choice-sec">
                     <div className="heading">
                         {props.stateAnswer[props.number-1]?
                            props.stateAnswer[props.number-1].answerType==1? "Integer Type":
                                props.stateAnswer[props.number-1].answerType==2?"Numerical Type":
                                    props.stateAnswer[props.number-1].answerType==4?"Single Correct Option"
                                    :"Multiple Correct Options":""}
                        <div >
                            <ReportProblemOutlinedIcon style={{color:'#A6A5A5'}}/>
                            <BookmarkIcon style={{color:props.stateAnswer[props.number-1]?props.stateAnswer[props.number-1].isBookmarked?'black':'#A6A5A5':'#A6A5A5',marginLeft:'8px',cursor:'pointer'}} 
                                onClick={()=>props.bookmarkQuestion(props.number-1)}/>
                        </div>
                     </div>
                    
                     {/* Section displaying the correct answer */}
                    {
                        showSolution?
                            <div className="answer-analysis" style={{paddingTop:"5%"}}>
                                <div>
                                    {props.stateAnswer[props.number-1]?
                                        props.stateAnswer[props.number-1].answerType==1? 
                                            <>  The correct answer is {props.stateAnswer[props.number-1].answer}  </>
                                        :props.stateAnswer[props.number-1].answerType==2?
                                                <> The correct answer is between {props.stateAnswer[props.number-1].answer[0]}-{props.stateAnswer[props.number-1].answer[1]} </>
                                                : props.stateAnswer[props.number-1].answerType==4?
                                                        <>  The correct answer is option {props.stateAnswer[props.number-1].answer==0?"A."
                                                                                                :(props.stateAnswer[props.number-1].answer==1?"B."
                                                                                                    :props.stateAnswer[props.number-1].answer==2?"C."
                                                                                                        :"D.")} 
                                                        </>
                                                        :<>
                                                            The correct answer is option{props.stateAnswer[props.number-1].answer.length==1?" ":"s "}
                                                                {props.stateAnswer[props.number-1].answer.map((opt,i)=>
                                                                    <>
                                                                        {opt==0?"A":opt==1?"B":opt==2?"C":"D"}
                                                                        {i==props.stateAnswer[props.number-1].answer.length-1?".":", "}
                                                                    </>
                                                                )}
                                                        </>
                                    :""}
                                    
                                </div>
                            </div>
                            :
                               wrongAttempt && !showSolution?
                               <Grow
                                in={animate}
                                style={{ transformOrigin: '0 0 0' }}
                                {...(checked ? { timeout: 1000 } : {})}
                                >
                                    <div className="answer-analysis" style={{paddingTop:"5%"}}>
                                        <div style={{color:"red"}}>
                                             Wrong Answer. Please try again.
                                        </div>
                                    </div>
                                </Grow>
                                :null   
                        }
                        {props.data?props.data.answerType==1?
                                <div className="num-input">
                                    <TextField
                                        id="standard-number"
                                        type="number"
                                        step={1}
                                        label="Enter Answer"
                                        value={answer}
                                        onChange={showSolution?null:(event) =>setAnswer(Number(event.target.value))}
                                    />
                                </div>
                                :props.data.answerType==2?
                                    <div className="num-input">
                                        <TextField
                                            id="standard-number"
                                            type="number"
                                            label="Enter Answer"
                                            value={answer}
                                            onChange={showSolution?null:(event) =>setAnswer(Number(event.target.value))}
                                        />
                                    </div>
                                    :props.data.answerType==5||props.data.answerType==4?
                                        <div className="options" style={{paddingTop:showSolution || (wrongAttempt && !showSolution)?"0px":'8%'}}>
                                            {props.data?props.data.option.map((text, index) =>
                                                <div className="option"
                                                    onClick={showSolution?null:(props.data.answerType==5?()=>changeOptMultiple(index):()=>changeOptSingle(index))}
                                                    style={{border:selectOpt[index]==true?'2px solid rgb(59, 149, 194)':'1px solid white'}}
                                                > 
                                                        {index===0?'A.  ':(index===1?'B.  ':(index===2?'C. ':'D. '))} 
                                                        
                                                            {text.type==0?<br/>:(text.type==1
                                                                                ?text.data
                                                                                :(text.type==2
                                                                        ?<InlineMath>{text.data}</InlineMath>
                                                                        :(text.type==3?<img src={text.data} style={{width:"50%"}}/>:null)
                                                                    )
                                                                )
                                                            }
                                                </div>
                                            ):null}
                                        </div>
                        :null:null}
                    
                    <div className="solution-hint-sec">
                        
                        {
                            showHint && !showSolution?
                                <div className="solution-subjectwise">
                                    <h5 style={{textAlign:'center'}}>Hint</h5>
                                    { props.hint?
                                        props.hint.map((item,index)=>
                                            <>
                                            {item.type==0?<br/>:(item.type==1
                                                                ?item.data
                                                                :(item.type==2
                                                                        ?<InlineMath>{item.data}</InlineMath>
                                                                        :(item.type==3?
                                                                            <div id="ques-img-sec">
                                                                                <img src={item.data} style={{width:"100%"}}/>
                                                                            </div>
                                                                        :null)
                                                                )
                                                                )
                                            }
                                            </>
                                        )
                                        :null
                                    }
                                </div>
                            :null
                        }
                        {
                            showHint && !showSolution?
                                <button onClick={()=>giveUp()}>Show solution</button>
                            :null
                        }
                        {
                            showSolution===true?
                                <div className="solution-subjectwise">
                                    <h5 style={{textAlign:'center',color:'green'}}>Solution</h5>
                                    { props.solution?
                                        props.solution.map((item,index)=>
                                            <>
                                            {item.type==0?<br/>:(item.type==1
                                                                ?item.data
                                                                :(item.type==2
                                                                        ?<InlineMath>{item.data}</InlineMath>
                                                                        :(item.type==3?
                                                                            <div id="ques-img-sec">
                                                                                <img src={item.data} style={{width:"100%"}}/>
                                                                            </div>
                                                                        :null)
                                                                )
                                                                )
                                            }
                                            </>
                                        )
                                        :null
                                    }
                                </div>
                            :null
                        } 
                    </div>

                    <div className="submit" style={{marginTop:"2%",marginBottom:"2%"}}>
                        <div className="back-button">
                            <ArrowBackIosIcon 
                                style={{fontSize:'38px',color:props.number==1?'rgba(0,0,0,0.1)':null,cursor:props.number==1?'not-allowed':'pointer'}}
                                onClick={props.number==1?null:()=>props.goToPrevQuestion()}>
                            </ArrowBackIosIcon>
                        </div>

                        {
                            props.stateAnswer[props.number-1] && props.stateAnswer[props.number-1].isAnswered?
                                wrongAttempt && !showSolution?
                                <button style={{background:'red'}} onClick={()=>submitQuestion()}>Retry</button>
                                :
                                (props.stateAnswer[props.number-1] && props.number!=props.noOfQuestions && (!props.stateAnswer[props.number-1].isAnsweredWrong &&props.stateAnswer[props.number-1].isAnswered && props.number!=props.noOfQuestions)?
                                    <button style={{background:'#3B95C2'}} onClick={()=>props.goToNextQuestion()}>Next</button>
                                    :<button style={{background:'#18d618'}} onClick={()=>submitQuestion()}>Submit</button>
                                )
                                :<button style={{background:'#18d618'}} onClick={()=>submitQuestion()}>Submit</button>
                        }
                        {
                            props.number==props.noOfQuestions?
                                null
                                :
                                <div className="forward-button">
                                    <ArrowForwardIosIcon 
                                        style={{fontSize:'38px'}}
                                        onClick={()=>props.goToNextQuestion()}>
                                    </ArrowForwardIosIcon>
                                </div>
                        }      
                       
                    </div>
                </Col>
            </Row>
        </Container>
        <Snackbar
            open={show}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            style={{
                background:'#3B95C2',
                color:'white',
                padding:"15px",
                fontSize:"18px"
            }}
            onClose={() => setShow(false)}
        >
            <div>
                Please enter a proper response before submitting.
            </div>
        </Snackbar>
    </>
    )
}
const mapStateToProps=(state)=>{
    return{
        paper:state.MockTestReducer.paper,
        stateAnswer:state.MockTestReducer.answers,
        user:state.AuthReducer.user
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        setAnswer:(ind,ans)=>dispatch(setAnswer(ind,ans)),
        clearAnswer:(ind)=>dispatch(clearAnswer(ind)),
        bookmarkQuestion:(ind)=>dispatch(bookmarkQuestion(ind)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SubjectwiseChoiceSection)


