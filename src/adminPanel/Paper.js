import React from 'react'
import {Link} from "react-router-dom";
import PaperInfo from './elements/PaperInfo'
import InstructionInfo from './elements/InstructionInfo'

export default function Paper() {
    const [numberQ,setNumberQ]=React.useState(0)
    return (
        <div>
            <PaperInfo sendNumberQ={setNumberQ} />
            <InstructionInfo/>
            <Link to={{ pathname: '/Questions', state: { number:numberQ} }}>
                <button style={{width:'60%',margin:'0px 20% 20px 20%'}}>Continue</button>
            </Link>
        </div>
    )
}
