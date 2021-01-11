import React, { useState,useEffect } from 'react';
import '../../../styles/choiceSection.css'
import Container from 'react-bootstrap/Container'
import 'katex/dist/katex.min.css';
import '../../../styles/detailedAnalysis.css'
import { InlineMath, BlockMath } from 'react-katex';
import TextField from '@material-ui/core/TextField';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import InstructionDropdown from '../Paper/InstructionDropdown'

export default function ChoiceSection(props) {
    const [palleteSub,setPalleteSub]=React.useState(1);
    const [answer,setAnswer]=React.useState('')
    const [selectOpt,setSelectOpt]=React.useState([false,false,false,false])

   

    useEffect(() => {
        //if answer was already submitted then load this into local state for display
        if(props.answers[props.number-1] && props.answers[props.number-1].answerGiven!=null){
            let opt=[false,false,false,false]

            //for multi-correct questions
            if(props.answers[props.number-1].answerType==5)
                for(let i=0;i<props.answers[props.number-1].answerGiven.length;i++){
                        opt[props.answers[props.number-1].answerGiven[i]]=true
                }

            //for single-correct questions
            else if(props.answers[props.number-1].answerType==4)
                opt[props.answers[props.number-1].answerGiven]=true
           
            setSelectOpt(opt)
            setAnswer(props.answers[props.number-1].answerGiven)
        }
        
    }, [props.answers[props.number-1]])

   

    return(
        <>
        <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Row noGutters >
                <Col id="choice-sec" style={{minHeight:'100vh'}}>

                     <div className="heading">
                         {props.answers[props.number-1]?
                            props.answers[props.number-1].answerType==1? "Integer Type":
                                props.answers[props.number-1].answerType==2?"Numerical Type":
                                    props.answers[props.number-1].answerType==4?"Single Correct Option"
                                    :"Multiple Correct Options":""}
                        <div>
                            <ReportProblemOutlinedIcon style={{color:'#A6A5A5'}}/>
                            <BookmarkIcon style={{color:props.answers[props.number-1]?props.answers[props.number-1].isBookmarked?'black':'#A6A5A5':'#A6A5A5',marginLeft:'8px',cursor:'pointer'}} />
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
                                    />
                                </div>
                                :props.data.answerType==2?
                                    <div className="num-input">
                                        <TextField
                                            id="standard-number"
                                            type="number"
                                            label="Enter Answer"
                                            value={answer}
                                        />
                                    </div>
                                    :props.data.answerType==5||props.data.answerType==4?
                                        <div className="options">
                                            {props.data?props.data.option.map((text, index) =>
                                                <div className="option"
                                                    style={{border:props.answers[props.number-1].answer==index?'2px solid #2AD586':(selectOpt[index]==true?'2px solid #FF1E1E':'1px solid white')}}
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
                    <div className="answer-analysis">
                        {props.answers[props.number-1].isAnsweredWrong?"YO":"no"}Your answer was incorrect
                    </div>

                    <div className="submit">
                        <div className="back-button">
                            <ArrowBackIosIcon 
                                style={{fontSize:'38px',color:props.number==1?'rgba(0,0,0,0.1)':null,cursor:props.number==1?'not-allowed':'pointer'}}
                                onClick={props.number==1?null:()=>props.goToPrevQuestion()}>
                            </ArrowBackIosIcon>
                        </div>
                      
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
                    
                 <div className="solution-analysis">
                        <h5 style={{textAlign:'center',color:'green',marginBottom:'8px'}}>Solution</h5>
                          {
                            props.data?props.data.solution.map((item,index)=>
                                < >
                                {item.type==0?<br/>:(item.type==1
                                                    ?item.data
                                                    :(item.type==2
                                                                ?<InlineMath>{item.data}</InlineMath>
                                                                :(item.type==3?<div id="ques-img-sec"><img src={item.data} style={{width:"100%"}}/></div>:null)
                                                    )
                                                    )
                                }
                                </>
                            ):null}
                    </div>
                </Col>
            </Row>
        </Container>
    </>
    )
}
