import React,{useEffect} from 'react'
import InstructionField from './InstructionField'
import InstructionPreview from './InstructionPreview'

// [{
// data: "25 questions each for Physics,↵Chemistry & Maths"
// heading: ""
// isLine: false
// points: Array(1)
// 0: {data: "", color: ""}
// section: 0
// },{
// data: "20 Objective Multiple Choice type ↵Questions(MCQs) per  subject"
// heading: ""
// isLine: true
// points: Array(3)
// 0:
// color: 2
// data: "4 Marks for correct Answer"
// 1:
// color: 1
// data: "1 Negative mark for Incorrect Answer"
// 2:
// color: 3
// data: "No Negative mark for Skipped Questions"
// length: 3
// __proto__: Array(0)
// section: 0
// __proto__: Object
// 2:
// data: "5 Numerical Type Questions per subject"
// heading: ""
// isLine: false
// points: Array(3)
// 0:
// color: 2
// data: "4 Marks for correct Answer"
// __proto__: Object
// 1:
// color: 1
// data: "No Negative marks for Incorrect answer or ↵Skipped Questions"
// __proto__: Object
// 2:
// color: 3
// data: "Round off the answer to 2(two) decimal↵places;e.g. 3.45,-4.00,-156.10,0.12"
// __proto__: Object
// length: 3
// __proto__: Array(0)
// section: 0
// __proto__: Object
// length: 3
// __proto__: Array(0)
export default function InstructionInfo(props) {
    const [instructions,setInstructions]=React.useState(['']);
    const deleteInstruction = (index) => {
        const values=[...instructions];
        values.splice(index, 1);
        setInstructions(values)
    };
    const addInstruction = () => {
        setInstructions([...instructions,''])
    };
    useEffect(() => {
        props.sendInfo(instructions)
    }, [instructions])
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
