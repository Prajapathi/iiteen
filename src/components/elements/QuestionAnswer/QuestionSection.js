import React from 'react'
import '../../../styles/questionSection.css'
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function QuestionSection(props) {
    const str= "x=\int_{0}^{1}ydx"
    return (
            <div className="question-sec">
                <div id="question-no">Question {props.number}</div>
                <div id="question-text">
        {
            props.data?props.data.map((item,index)=>
                <div key={index} style={{overflowWrap:'anywhere'}}>
                {item.type==0?<br/>:(item.type==1
                                    ?item.data
                                    :(item.type==2
                                                ?<InlineMath>{item.data}</InlineMath>
                                                :(item.type==3?<div id="ques-img-sec"><img src={item.data} style={{width:"100%"}}/></div>:null)
                                     )
                                    )
                }
                </div>
            ):null}
                    {/* <InlineMath>{str}</InlineMath> */}
                </div>
            </div>
    )
}
