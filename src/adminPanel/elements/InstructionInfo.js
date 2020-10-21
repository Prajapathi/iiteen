import React,{useEffect} from 'react'
import {Link} from "react-router-dom";
import InstructionField from './InstructionField'
import InstructionPreview from './InstructionPreview'

export default function InstructionInfo() {
    const [instructions,setInstructions]=React.useState(['']);
    const deleteInstruction = (index) => {
        const values=[...instructions];
        values.splice(index, 1);
        setInstructions(values)
    };
    const addInstruction = () => {
        setInstructions([...instructions,''])
    };
    console.log(instructions)
    return (
        <>
        <div style={{padding:'0px 3% 3%',display:'flex',width:'90%',margin:'auto'}}>
            <div style={{width:'50%'}}>
                {instructions.map((key,index)=>
                    <div style={{border:'1px dashed grey'}}>
                        <div style={{margin:'5px 20px'}}>{index+1}</div>
                        <InstructionField number={index} sendInfo={setInstructions} array={instructions}/>
                        <div onClick={instructions.length!=1?()=>deleteInstruction(index):null} style={{margin:'-30px 14% 4% 14%',width:'70%',border:'1px solid black'}}>Delete Instruction</div>
                    </div>
                )}
                <div onClick={addInstruction} style={{margin:'3% 14%',width:'70%',border:'1px solid black'}}>Add Instruction</div>
            </div>
            <InstructionPreview instructions={instructions}/>
        </div>
        <Link to="/Question">
            <button style={{width:'60%',margin:'0px 20% 20px 20%'}}>Continue</button>
        </Link>
        </>
    )
}
