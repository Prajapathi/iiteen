import React,{useEffect} from 'react'
import InstructionField from './InstructionField'
import InstructionPreview from './InstructionPreview'

const MainsDefaultInst=[
    {   data:"25 questions each for Physics, Chemistry & Maths",
        isLine: false,
        section:0,
        points:[]
    },
    {   data:"20 Objective Multiple Choice type Questions(MCQs) per subject",
        isLine: true,
        section:0,
        points:[
            {color:2,data:"4 Marks for correct Answer"},
            {color:1,data:"1 Negative mark for Incorrect Answer"},
            {color:3,data:"No Negative mark for Skipped Questions"}
            ]
    },
    {   data:"5 Numerical Type Questions per subject",
        isLine: false,
        section:0,
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
export default function InstructionInfo(props) {
    const [instructions,setInstructions]=React.useState(props.paperType?props.paperType==1?MainsDefaultInst:AdvDefaultInst:AdvDefaultInst);

    useEffect(() => {
        setInstructions(props.paperType==1?MainsDefaultInst:AdvDefaultInst)
    }, [props.paperType])

    const deleteInstruction = (index) => {
        const values=[...instructions];
        values.splice(index, 1);
        
        //console.log(index,values)
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
                    <div style={{border:'1px dashed grey'}} key={index}>
                        <div style={{margin:'5px 20px'}}>{index+1}</div>
                        <InstructionField key={index} number={index} sendInfo={setInstructions} array={instructions}/>
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
