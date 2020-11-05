import React from 'react'
import '../styles/Instructions.css'

export default function InstructionPreview(props) {
    return (
        <div id="instruction">
            { props.instructions.map((key,index)=>
                <>
                <div id="main-inst">
                    <div id="blue-box"></div>
                    <div id="main-data">
                        {props.instructions[index].data}
                         
                        <ul>
                        { props.instructions[index].points?props.instructions[index].points.map((key,ind)=>
                            props.instructions[index].points[ind]==""?null:
                                                                        <li key={ind} style={{listStyleType:'none'}}>
                                                                            <div id="sub-points">
                                                                                {props.instructions[index].points[ind].color==''?null:
                                                                                    <div style={{background:props.instructions[index].points[ind].color==1?'red':props.instructions[index].points[ind].color==2?'green':'gray'}}></div>
                                                                                }
                                                                                {props.instructions[index].points[ind].data}
                                                                            </div>
                                                                        </li>
                            ):null
                            }
                        </ul>
                    </div>
                </div>
               
                {props.instructions[index].isLine==true?<hr/>:null}
                </>
            )}
        </div>
    )
}
