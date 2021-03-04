import React from 'react'
import '../../../styles/paperAnalysis.css'
import BarGraphElement from './BarGraphElement'

export default function BarGraph(props) {
    console.log(props.correct,props.wrong)
    return (
        <div className="bargraph-sub-sec">
            <div>
                <BarGraphElement value={props.correct}/>
                <BarGraphElement value={props.wrong} left={true}/>
            </div>
            <hr className="bargraph-sub-sec-hr"/>
            <div className="bargraph-sub-sec-title">
                <div>{props.name}</div>
            </div>
        </div>
    )
}
