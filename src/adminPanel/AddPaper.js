import React from 'react'
import {Link} from "react-router-dom";
import './styles/AddPaper.css'

export default function AddPaper() {
    return (
        <Link to="/Paper">
            <div id="addPaper">
                <div id="addButton">
                +
                </div>
                <h1>Add a paper</h1>
            </div>
        </Link>
    )
}
