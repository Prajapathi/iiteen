import React from 'react'
import '../../../styles/subjectwise.css'
import SubjectSection from '../../elements/SubjectSection'
export default function Subjectwise() {
    return (
        <div className="screen" id="subjectwise">
            <h1 style={{textAlign:'center',fontWeight:'800',letterSpacing:'5px',wordSpacing:'15px',color:'#3F7B94',padding:'15px 0px'}}>SUBJECT-WISE QUESTIONS</h1>
            <div id="phy"><SubjectSection subject="physics" class="11"/></div>
            <div id="chem"><SubjectSection subject="chemistry" class="11"/></div>
            <div id="mat"><SubjectSection subject="maths" class="11"/></div>
        </div>
    )
}
