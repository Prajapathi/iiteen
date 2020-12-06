import React from 'react'
import '../../../styles/questionSection.css'
import { InlineMath, BlockMath } from 'react-katex';

export default function QuestionSection(props) {
    const str= "x=\int_{0}^{1}ydx"
    return (
            <div className="question-sec">
                <div id="question-no">Q.3</div>
                <div id="question-text">
        {
            props.data?props.data.map((item,index)=>
                < >
                {item.type==0?<br/>:(item.type==1
                                    ?item.data
                                    :(item.type==2
                                                ?<InlineMath>{item.data}</InlineMath>
                                                :(item.type==3?<img src={item.data} style={{width:"50px"}}/>:null)
                                     )
                                    )
                }
                </>
            ):null}
                    {/* <InlineMath>{str}</InlineMath> */}
                </div>
            </div>
    )
}
