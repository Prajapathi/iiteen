import React from 'react'
import {Link} from "react-router-dom";
import './styles/AddPaper.css'

export default function AddPaper() {
    return (
        <>
            <Link to={{ pathname: '/Paper', state: { subjective:false} }}>
                <div id="addPaper">
                    <div id="addButton">
                    +
                    </div>
                    <h1>Add a paper</h1>
                </div>
            </Link>
            <Link to={{ pathname: '/Paper', state: { subjective:true} }}>
                <div id="addPaper">
                    <div id="addButton">
                    +
                    </div>
                    <h1>Add a Subjective paper</h1>
                </div>
            </Link>
        </>
    )
}
