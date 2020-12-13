import React from 'react'
import '../../../styles/paperInstruction.css'

const MainsDefaultInst=[
    {   data:"25 questions each for Physics, Chemistry & Maths",
        isLine: false,
        section:0,
        points:[]
    },
    {   data:"20 Objective Multiple Choice type Questions(MCQs) per subject",
        isLine: true,
        section:3,
        points:[
            {color:2,data:"4 Marks for correct Answer"},
            {color:1,data:"1 Negative mark for Incorrect Answer"},
            {color:3,data:"No Negative mark for Skipped Questions"}
            ]
    },
    {   data:"5 Numerical Type Questions per subject",
        isLine: false,
        section:2,
        points:[
            {color:2,data:"4 Marks for correct Answer"},
            {color:1,data:"No Negative marks for Incorrect answer or Skipped Questions"},
            {color:3,data:"Round off the answer to 2(two) decimal places;e.g. 3.45,-4.00,-156.10,0.12"}
            ]

    }
]
const AdvDefaultInst=[
    {   data:"18 questions each for Physics, Chemistry & Maths",
        isLine: false,
        section:0,
        points:[]
    },
    {   data:"Each Subject contains Three Parts: Part-A, Part-B, Part-C",
        isLine: true,
        section:0,
        points:[]
    },
    {   data:"Part-A contains 6 multiple choice questions. Each Question has 4 choices (A),(B),(C),(D) out of which only ONE is correct.",
        isLine: false,
        section:3,
        points:[
            {color:2,data:"3 Marks for correct Answer"},
            {color:1,data:"1 Negative mark for Incorrect Answer"},
            {color:3,data:"No Negative mark for Skipped Questions"}
            ]
    },
    {   data:"Part-B contains 6 multiple choice questions. Each Question has 4 choices (A),(B),(C),(D) out of which one or more is/are correct.",
        isLine: false,
        section:4,
        points:[
            {color:2,data:"4 Marks if all correct options are marked correct"},
            {color:2,data:"4 Marks if all correct options are marked correct"},
            {color:1,data:"-2 Negative mark for Incorrect combination of Answer marked"},
            {color:3,data:"No Negative mark for Skipped Questions"}
            ]
    },
    {   data:"Part-C contains 6 integer type questions. The answer to each question is a single digit integer ranging from 0 to 9.",
        isLine: false,
        section:1,
        points:[
            {color:2,data:"3 Marks for correct Answer"},
            {color:1,data:"-1 Negative mark for Incorrect Answer"},
            {color:3,data:"No Negative mark for Skipped Questions"}
            ]
    },
]
export default function PaperInstruction(props) {
    return (
        <div id="inst-body">
           <div id="paper-heading">JEE MAINS </div>
            <div id="top-bar"> 
                MARKING SCHEME
            </div>
            <div id="detail-head">
                <div>
                    <div className="detail-subhead">Duration</div>
                    <div className="detail-subhead-data">180 mins</div>
                </div>
                <div>
                    <div className="detail-subhead">Questions</div>
                    <div className="detail-subhead-data">75</div>
                </div>
                <div>
                    <div className="detail-subhead">Marks</div>
                    <div className="detail-subhead-data">300</div>
                </div>
            </div>
           
             { props.inst.map((key,index)=>
                <>
                <div className="paper-inst">
                    <div className="inst-point-box"></div>
                    <div className="inst-point-data">
                        {props.inst[index].data}
                         
                        <ul>
                        { props.inst[index].points?props.inst[index].points.map((key,ind)=>
                            props.inst[index].points[ind]==""?null:
                                                                        <li key={ind} style={{listStyleType:'none'}}>
                                                                            <div className="inst-sub-points">
                                                                                {props.inst[index].points[ind].color==''?null:
                                                                                    <div style={{background:props.inst[index].points[ind].color==1?'#F6391B':props.inst[index].points[ind].color==2?'#2BC559':'#878585'}}></div>
                                                                                }
                                                                                {props.inst[index].points[ind].data}
                                                                            </div>
                                                                        </li>
                            ):null
                            }
                        </ul>
                    </div>
                    
                </div>
               
                {props.inst[index].isLine==true?<hr/>:null}
                </>
            )}

            <div id="inst-bottom" style={{padding:"20px 50px"}}>
            <div></div>
                <div>
                    Time Remaining: 00:30:00
                    <button id="inst-start"  style={{background:"white",color:"#333131"}} onClick={()=>props.setContinue(true)}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
