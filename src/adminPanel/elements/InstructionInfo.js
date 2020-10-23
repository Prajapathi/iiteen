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
    console.log(instructions)
    return (
        <>
        <div style={{padding:'0px 3% 3%',display:'flex',width:'90%',margin:'auto'}}>
            <div style={{width:'50%'}}>
                {instructions.map((key,index)=>
                    <div style={{border:'1px dashed grey'}}>
                        <div style={{margin:'5px 20px'}}>{index+1}</div>
                        <InstructionField number={index} sendInfo={setInstructions} array={instructions}/>
                        <div onClick={instructions.length!=1?()=>deleteInstruction(index):null} 
                        style={{margin:'-30px 14% 4% 14%',
                        background:'#f23b38',
                        width:'70%',
                        border:'1px solid black',
                        cursor:'pointer',
                        textAlign:'center',
                        color:'white',
                        border:'1px solid white',
                        borderRadius:'20px'}}>
                            Delete Instruction
                        </div>
                    </div>
                )}
                <div onClick={addInstruction} style={{margin:'3% 14%',
                    width:'70%',
                    border:'1px solid black',
                    cursor:'pointer',
                    textAlign:'center',
                    background:'#0fcf0c',
                    color:'white',
                    border:'1px solid white',
                    borderRadius:'20px'}}>
                    Add Instruction
                </div>
            </div>
            <InstructionPreview instructions={instructions}/>
        </div>
        </>
    )
}
