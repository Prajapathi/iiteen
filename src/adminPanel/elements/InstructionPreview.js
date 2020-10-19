import React from 'react'

export default function InstructionPreview(props) {
    return (
        <div style={{border:'1px dashed grey',width:'65%',height:'800px',marginLeft:'25px'}}>
            { props.instructions.map((key,index)=>
                <>
                <h1>{props.instructions[index].heading}</h1>
                <p>{props.instructions[index].data}</p>
                <ul>
                { props.instructions[index].subpoints?props.instructions[index].subpoints.map((key,ind)=>
                    props.instructions[index].subpoints[ind]==""?null:<li key={ind}>{props.instructions[index].subpoints[ind]}</li>
                    ):null
                    }
                </ul>
                {props.instructions[index].linebreak=="true"?<hr/>:null}
                </>
            )}
        </div>
    )
}
