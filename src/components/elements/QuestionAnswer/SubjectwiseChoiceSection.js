import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux'
import {clearAnswer,setAnswer,bookmarkQuestion} from '../../../store/action/Paper'
import '../../../styles/choiceSection.css'
import Container from 'react-bootstrap/Container'
import { InlineMath, BlockMath } from 'react-katex';
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
    const [showInstruction,setShowInstruction]=useState(false)
    const [wrongAttempt,setWrongAttempt]=useState(false)
    const [showSolution,setShowSolution]=useState(false)

console.log("kkk",props.stateAnswer[props.number-1])

    useEffect(() => {
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
        if(flag==0){
            props.setAnswer(props.number-1,answer);
            if(props.stateAnswer[props.number-1].isAnsweredWrong)
                setWrongAttempt(true)
            else setShowSolution(true)
        }
        else{
            setShow(true)
        }
        
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
                    
                        {props.data?props.data.answerType==1?
                                <div className="num-input">
                                    <TextField
                                        id="standard-number"
                                        type="number"
                                        step={1}
                                        label="Enter Answer"
                                        value={answer}
                                        onChange={props.stateAnswer[props.number-1]&&props.stateAnswer[props.number-1].isAnswered?null:(event) =>setAnswer(Number(event.target.value))}
                                    />
                                </div>
                                :props.data.answerType==2?
                                    <div className="num-input">
                                        <TextField
                                            id="standard-number"
                                            type="number"
                                            label="Enter Answer"
                                            value={answer}
                                            onChange={props.stateAnswer[props.number-1]&&props.stateAnswer[props.number-1].isAnswered?null:(event) =>setAnswer(Number(event.target.value))}
                                        />
                                    </div>
                                    :props.data.answerType==5||props.data.answerType==4?
                                        <div className="options">
                                            {props.data?props.data.option.map((text, index) =>
                                                <div className="option"
                                                    onClick={props.stateAnswer[props.number-1]&&props.stateAnswer[props.number-1].isAnswered?null:(props.data.answerType==5?()=>changeOptMultiple(index):()=>changeOptSingle(index))}
                                                    style={{border:selectOpt[index]==true?'2px solid rgb(59, 149, 194)':'1px solid white'}}
                                                > 
                                                        {index===0?'A.  ':(index===1?'B.  ':(index===2?'C. ':'D. '))} 
                                                        
                                                            {text.type==0?<br/>:(text.type==1
                                                                                ?text.data
                                                                                :(text.type==2
                                                                        ?<InlineMath>{text.data}</InlineMath>
                                                                        :(text.type==3?<img src={text.data} style={{width:"100%"}}/>:null)
                                                                    )
                                                                )
                                                            }
                                                </div>
                                            ):null}
                                        </div>
                        :null:null}
                    
                     

                    <div className="submit">
                        <div className="back-button">
                            <ArrowBackIosIcon 
                                style={{fontSize:'38px',color:props.number==1?'rgba(0,0,0,0.1)':null,cursor:props.number==1?'not-allowed':'pointer'}}
                                onClick={props.number==1?null:()=>props.goToPrevQuestion()}>
                            </ArrowBackIosIcon>
                        </div>

                        {
                            props.stateAnswer[props.number-1] && props.stateAnswer[props.number-1].isAnswered?
                                (props.number!=props.noOfQuestions?
                                    <button style={{background:'#3B95C2'}} onClick={()=>props.goToNextQuestion()}>Next</button>
                                    :null
                                )
                                :<button style={{background:'#18d618'}} onClick={()=>submitQuestion()}>Submit</button>
                        }
                        {
                            props.number==props.noOfQuestions?
                                <button style={{background:'#ff9700'}} onClick={props.showSummary}>Submit Paper</button>
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
        stateAnswer:state.MockTestReducer.answers
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


// {showSolution===true?
//                     <div className="solution">
//                         <h5 style={{textAlign:'center',color:'green',marginBottom:'8px'}}>Solution</h5>
//                         this is the solution to the given problem. you can check it out here:www.google.com. This is the solution of subject-wise problem;
//                     </div>:null}