import React from 'react'

export default function InstructionPreview(props) {
    return (
        <div style={{border:'1px dashed grey',width:'65%',marginLeft:'25px'}}>
            { props.instructions.map((key,index)=>
                <>
                <h1>{props.instructions[index].heading}</h1>
                <p>{props.instructions[index].data}</p>
                <ul>
                { props.instructions[index].subpoints?props.instructions[index].subpoints.map((key,ind)=>
                    props.instructions[index].subpoints[ind]==""?null:
                                                                <li key={ind} style={{listStyleType:'none'}}>
                                                                    <div style={{display:'flex'}}>
                                                                        {props.instructions[index].subpoints[ind].color==''?null:
                                                                            <div style={{width:'15px',height:'15px',borderRadius:'50%',background:props.instructions[index].subpoints[ind].color==1?'red':props.instructions[index].subpoints[ind].color==2?'green':'gray'}}></div>
                                                                        }
                                                                        {props.instructions[index].subpoints[ind].data}
                                                                    </div>
                                                                </li>
                    ):null
                    }
                </ul>
                {props.instructions[index].linebreak=="true"?<hr/>:null}
                </>
            )}
        </div>
    )
}
