import React from 'react'
import {Link,useLocation} from "react-router-dom";
import PaperInfo from './elements/PaperInfo'
import InstructionInfo from './elements/InstructionInfo'

export default function Paper() {
    const [numberQ,setNumberQ]=React.useState(0)
    const [paperInfo,setPaperInfo]=React.useState([]);
    const [instructionInfo,setInstructionInfo]=React.useState([]);
    const [subjectiveClass,setSubjectiveClass]=React.useState();
    const location = useLocation();
    return (
        <div>
            <PaperInfo sendNumberQ={setNumberQ} sendInfo={setPaperInfo} subjective={location.state.subjective} sendSubjectiveClass={setSubjectiveClass}/>
            {
                !(location.state.subjective)?<InstructionInfo sendInfo={setInstructionInfo}/>:null
            }
            <Link to={{ pathname: '/Questions', state: { number:numberQ,subjective:location.state.subjective,paperType:location.state.paperType} }}>
                <button style={{width:'60%',
                margin:'0px 20% 20px 20%',
                background:'#388cf2',
                color:'white',
                border:'1px solid white',
                borderRadius:'20px'
                }}>
                    Continue
                </button>
            </Link>
        </div>
    )
}
