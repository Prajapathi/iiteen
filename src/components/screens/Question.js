import React from 'react'
import QuestionSection from '../elements/QuestionAnswer/QuestionSection'
import SubjectwiseChoiceSection from '../elements/QuestionAnswer/SubjectwiseChoiceSection'
import ChoiceSection from '../elements/QuestionAnswer/ChoiceSection'
import '../../styles/question.css'

export default function Question(props) {
    return (
        <div id="question-screen">
            <div className="ques">
                <QuestionSection/>
            </div>
            <div className="choice">
                {props.type=="subjectwise"?<SubjectwiseChoiceSection/>:<ChoiceSection/>} 
            </div>
        </div>
    )
}
