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
                        <b>{props.instructions[index].heading}</b> 
                        {props.instructions[index].data}
                         
                        <ul>
                        { props.instructions[index].subpoints?props.instructions[index].subpoints.map((key,ind)=>
                            props.instructions[index].subpoints[ind]==""?null:
                                                                        <li key={ind} style={{listStyleType:'none'}}>
                                                                            <div id="sub-points">
                                                                                {props.instructions[index].subpoints[ind].color==''?null:
                                                                                    <div style={{background:props.instructions[index].subpoints[ind].color==1?'red':props.instructions[index].subpoints[ind].color==2?'green':'gray'}}></div>
                                                                                }
                                                                                {props.instructions[index].subpoints[ind].data}
                                                                            </div>
                                                                        </li>
                            ):null
                            }
                        </ul>
                    </div>
                </div>
               
                {props.instructions[index].linebreak=="true"?<hr/>:null}
                </>
            )}
        </div>
    )
}
