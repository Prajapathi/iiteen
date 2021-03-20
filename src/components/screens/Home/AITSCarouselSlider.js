import React from 'react'
import {Link} from "react-router-dom";
import '../../../styles/AITS-carousel.css'

export default function AITSCarouselSlider() {
    return (
        <div className="test-slider">
            <div className="test-slider-header">
            </div>
            <div className="test-slider-date">
                Dec 10
            </div>
            <div className="test-slider-time-slot">
                <div>Time Slot:</div>
                <div className="test-slider-time-slot-value">
                    10 AM
                </div>
            </div>
            <div className="test-slider-paper-type">
                JEE MAIN
            </div>
            <ul className="test-slider-list">
                <li>Part-Test</li>
                <li>Class-12th</li>
            </ul>
            <div className="test-slider-button">
                View Schedule
            </div>
            <Link to="/AITS" style={{textDecoration:"none"}}>
                <div className="test-slider-button">
                    View Details
                </div>
            </Link>
        </div>
    )
}
