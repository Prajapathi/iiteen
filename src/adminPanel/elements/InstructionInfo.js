import React,{useEffect} from 'react'
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
    let arr=[0]
    console.log("pppp",instructions)
    return (
        <div style={{padding:'3%',display:'flex'}}>
            <div style={{width:'35%'}}>
                {[1,2,3,4].map((key,index)=>
                    <div style={{border:'1px dashed grey'}}>
                        <div style={{margin:'5px 20px'}}>{index+1}</div>
                        <InstructionField number={index} sendInfo={setInstructions} array={instructions}/>
                        <button onClick={instructions.length!=1?deleteInstruction(index):null} style={{margin:'-30px 14% 4% 14%',width:'70%',border:'1px solid black'}}>Delete Instruction</button>
                    </div>
                )}
                <button onClick={addInstruction} style={{margin:'3% 14%',width:'70%',border:'1px solid black'}}>Add Instruction</button>
            </div>
            <InstructionPreview/>
        </div>
    )
}
