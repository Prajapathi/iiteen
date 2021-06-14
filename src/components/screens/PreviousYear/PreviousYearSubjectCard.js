import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import '../../../styles/PreviousYearSubjectCard.css'
import { Link, useLocation, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { fetchPaper, fetchPreviousSubjectwiseAnswers } from '../../../store/action/Paper'


export function PreviousYearSubjectCard(props) {
    let history = useHistory()
    const [paper, setPaper] = useState([])
    const [classNumber, setClassNumber] = useState()
    const [level, setLevel] = useState()
    const [subject, setSubject] = useState()
    const [chapter, setChapter] = useState()
    const [answers, setAnswers] = useState(0)
    const [lastIndex, setLastIndex] = useState([0, 0, 0])


    return (
        <div className="prev-subj-card subject-card">

            <div className="prev-card-front">
                <div className="prev-card-title">
                    <div style={{ fontSize: '26px' }}>Chapter {props.number}</div>
                </div>
                <div className="prev-card-content">
                    <div style={{ fontSize: '24px', color: '#448698' }}>{props.name}</div>
                    <div style={{ width: '80%' }}>
                        <button onClick={() => setLevel(1)} className="prev-card-button">Attempt</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.AuthReducer.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchPaper: (paper) => dispatch(fetchPaper(paper)),
        fetchPreviousSubjectwiseAnswers: (answers) => dispatch(fetchPreviousSubjectwiseAnswers(answers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviousYearSubjectCard)