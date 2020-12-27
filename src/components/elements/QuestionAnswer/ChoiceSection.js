import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux'
import {setSeen,clearAnswer,setAnswer,bookmarkQuestion} from '../../../store/action/Paper'
import '../../../styles/choiceSection.css'
import Container from 'react-bootstrap/Container'
import { InlineMath, BlockMath } from 'react-katex';
import TextField from '@material-ui/core/TextField';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from '@material-ui/core/Badge';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

export function ChoiceSection(props) {
    const [palleteSub,setPalleteSub]=React.useState(1);
    const [answer,setAnswer]=React.useState('')
    const [selectOpt,setSelectOpt]=React.useState([false,false,false,false])
    const [show, setShow] = useState(false);

    useEffect(() => {
        //set isSeen true when the component mounts and recieves the value of props.number
        if(props.number==null)
            return
        props.setSeen(props.number-1)
    }, [props.number])

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
            props.goToNextQuestion();
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
                    
                        <Dropdown style={{width:'100%'}}>
                            <Dropdown.Toggle id="instruction-ques-box">
                                Instructions
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{background:'red',minWidth:'100%',padding:'30px'}}>
                                Action and reaction yo yo boy.
                            </Dropdown.Menu>
                        </Dropdown>
                        

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

      
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{
            position: 'absolute',
            bottom: 50,
            left: -400
        }}>
          <Toast.Header>
            <strong className="mr-auto" style={{color:'#3B95C2'}}>Please enter a proper response before submitting.</strong>
          </Toast.Header>
        </Toast>
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
