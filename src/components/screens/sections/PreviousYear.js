import React from 'react'
import CardSection from '../../elements/CardSection'
import icon from '../../../assets/images/mainbanner.png'
export default function PreviousYear() {
    return (
         <div  className="screen" id="AITS">
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src={icon} id="aitsicon" alt=""/>
                <div class="section-heading">PREVIOUS YEAR TEST PAPERS</div>
            </div>
            <div>
                <div className="bar">
                    <h2>JEE MAINS</h2>
                </div>
                <CardSection section="PreviousYear" type="mains"/>
            </div>
            <div>
                <div className="bar">
                    <h2>JEE ADVANCE</h2>
                </div>
                <CardSection section="PreviousYear" type="advance"/>
            </div>
        </div>
    )
}
