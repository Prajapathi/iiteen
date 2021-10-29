import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux'
import {setSeen,clearAnswer,setAnswer,bookmarkQuestion} from '../../../store/action/Paper'
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import InstructionDropdown from '../Paper/InstructionDropdown'
import Latex from "react-latex-next";

export function ChoiceSection(props) {
    const [palleteSub,setPalleteSub]=React.useState(1);
    const [answer,setAnswer]=React.useState('')
    const [selectOpt,setSelectOpt]=React.useState([false,false,false,false])
    const [show, setShow] = useState(false);
    const [open,setOpen]=React.useState(false)
    const [errorType,setErrorType]=useState(0)
    const [showInstruction,setShowInstruction]=useState(false)

    useEffect(() => {
        //set isSeen true when the component mounts and recieves the value of props.number
        if(props.number==null)
            return
        props.setSeen(props.number-1)
    }, [props.number])

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
   
    const clearResponse=()=>{
        props.clearAnswer(props.number-1)
        //clear the options/answer on the screen
        if(props.stateAnswer[props.number-1] && props.stateAnswer[props.number-1].answerGiven==false){
            if(props.stateAnswer[props.number-1].answerType==4||props.stateAnswer[props.number-1].answerType==5){
                setSelectOpt([false,false,false,false])
                setAnswer('')
            }
            else if(props.stateAnswer[props.number-1].answerType==1||props.stateAnswer[props.number-1].answerType==2)
                setAnswer('')
        }
    }
    const submitQuestion=()=>{
        //If there is choice in questions then check for no of questions attempted
        if(props.paper.toBeAttempted && props.paper.noOfQuestions!=props.paper.toBeAttempted){
            let countQ=0, sub=props.paper.questions[props.number-1].subject;
            for(let i=0;i<props.stateAnswer.length;i++){
                if((props.stateAnswer[i].answerType==4||props.stateAnswer[i].answerType==5) && (sub==props.paper.questions[i]) && (props.stateAnswer[i].isAnswered))
                    countQ++;
            }
            if(countQ>=(props.paper.noOfQuestions-props.paper.toBeAttempted)/3){
                setErrorType(1)
                setShow(true)
                return;
            }
        }
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
            if(props.number!=props.noOfQuestions)
                props.goToNextQuestion();
        }
        else{
            setErrorType(0)
            setShow(true)
        }
        
    }

    return(
        <>
        <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Row noGutters >
                <Col id="choice-sec">
                        {/* <div>
                            <div id="instruction-ques-box" onClick={()=>setShowInstruction(!showInstruction)}>
                                Instructions
                                {
                                    showInstruction?<ArrowDropUpIcon/>:<ArrowDropDownIcon/>
                                }
                            </div>
                            <div style={{opacity:showInstruction?1:0}} id="instruction-detail">
                                   <InstructionDropdown inst={.noOfQuestions!=props.paper.toBeAttempted.instructionInfo} section={props.paper.questions[props.number-1]?props.paper.questions[props.number-1].section:0}/>
                            </div>
                        </div> */}
                        

                     <div className="heading">
                         {props.stateAnswer[props.number-1]?
                            props.stateAnswer[props.number-1].answerType==1? "Integer Type":
                                props.stateAnswer[props.number-1].answerType==2?"Numerical Type":
                                    props.stateAnswer[props.number-1].answerType==4?"Single Correct Option"
                                    :"Multiple Correct Options":""}
                        <div >
                            <ReportProblemOutlinedIcon style={{color:'#A6A5A5', cursor:"pointer"}} onClick={()=>setOpen(true)}/>
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
                                        <div className="options" style={{ wordWrap: "break-word"}}>
                                            {props.data?props.data.option.map((text, index) =>
                                                <div className="option"
                                                    onClick={props.stateAnswer[props.number-1]&&props.stateAnswer[props.number-1].isAnswered?null:(props.data.answerType==5?()=>changeOptMultiple(index):()=>changeOptSingle(index))}
                                                    style={{border:selectOpt[index]==true?'2px solid rgb(59, 149, 194)':'1px solid white',  wordWrap: "break-word" }}
                                                > 
                                                        {index===0?'A.  ':(index===1?'B.  ':(index===2?'C. ':'D. '))} 
                                                        
                                                            <div className="babay" style={{ wordWrap: "break-word"}}>
                                                            {text.type==0?<br/>:(text.type==1
                                                                                ?text.data
                                                                                :(text.type==2
                                                                        ?<Latex>{text.data}</Latex>
                                                                        :(text.type==3?<img src={text.data} style={{width:"50%"}}/>:null)
                                                                    )
                                                                )
                                                            }
                                                            </div>
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
                                <button style={{background:'#FF1E1E'}} onClick={()=>clearResponse()}>Clear Response</button>
                                :<button style={{background:'#18d618'}} onClick={()=>submitQuestion()}>{props.number==props.noOfQuestions?"Submit":"Submit and Next"}</button>
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

{/*       
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{
            position: 'absolute',
            bottom: 100,
            left: -500,
            background:'#3B95C2',
            color:'white'
        }}>
          <Toast.Header style={{background:'#3B95C2'}}>
                <div className="mr-auto" style={{color:'white',fontSize:'18px'}}>
                        {errorType==0?"Please enter a proper response before submitting."
                            :"Maximum number of questions already attempted in this section. Please clear response before attempting more."}
                </div>
          </Toast.Header>
        </Toast> */}
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
                {errorType==1?
                        "Please enter a proper response before submitting."
                        :<> Maximum number of questions already attempted in this section. 
                            <br/> Please clear response before attempting more.</>
                    }
            </div>
        </Snackbar>

        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            id="report-box"
        >
            <DialogTitle id="alert-dialog-title">{"Report"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <textarea style={{resize:"none"}} rows="4"/>
                    <button id="report-button" onClick={()=>setOpen(false)}>Report</button>
                </DialogContentText>
            </DialogContent>
        </Dialog>
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
        setSeen:(ind)=>dispatch(setSeen(ind)),
        setAnswer:(ind,ans)=>dispatch(setAnswer(ind,ans)),
        clearAnswer:(ind)=>dispatch(clearAnswer(ind)),
        bookmarkQuestion:(ind)=>dispatch(bookmarkQuestion(ind)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChoiceSection)
