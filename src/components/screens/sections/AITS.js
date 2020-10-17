import React from 'react'
import '../../../styles/AITS.css'
import CardSection from '../../elements/CardSection'
import icon from '../../../assets/images/AITSicon.png'
export default function AITS() {
    return (
        <div  className="screen" id="AITS">
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src={icon} id="aitsicon"/>
                <div class="section-heading">ALL INDIA TEST SERIES</div>
            </div>
            <div>
                <div className="bar">
                    <h2>Upcoming Tests</h2>
                </div>
                <CardSection section="AITS" />
            </div>
            <div>
                <div className="bar">
                    <h2>Past Tests</h2>
                </div>
                <CardSection section="AITS"/>
            </div>
        </div>
    )
}
