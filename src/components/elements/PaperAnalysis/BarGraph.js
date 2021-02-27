import React from 'react'
import '../../../styles/paperAnalysis.css'
import BarGraphElement from './BarGraphElement'

export default function BarGraph() {
    return (
        <div className="bargraph-sub-sec">
            <div>
                <BarGraphElement/>
                <BarGraphElement left={true}/>
            </div>
            <hr className="bargraph-sub-sec-hr"/>
            <div className="bargraph-sub-sec-title">
                <div>Chapter Name </div>
            </div>
        </div>
    )
}
