import React from 'react'
import '../../../styles/coming-soon.css'
import icon from '../../../assets/images/iiteenslogo.png'

export default function ComingSoon() {
    return (
        <div className="coming-soon-sec">
            <img src={icon} className="coming-soon-logo"/>
            <br/>
            COMING SOON
        </div>
    )
}
