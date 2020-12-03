import React from 'react'
import '../../../styles/questionSection.css'
import { InlineMath, BlockMath } from 'react-katex';

export default function QuestionSection() {
    const str= "x=\int_{0}^{1}ydx"
    return (
            <div className="question-sec">
                <div id="question-no">Q.3</div>
                <div id="question-text">
                    Youngs modulus of a material has the same unit as adsvs adfadvaf d ad a afd a a ad ad xc efvfdvda adfva fdav<br/>
                    <InlineMath>{str}</InlineMath>
                </div>
            </div>
    )
}
