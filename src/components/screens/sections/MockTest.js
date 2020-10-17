import React from 'react'
import {Link,useHistory} from "react-router-dom";
import '../../../styles/MockTest.css'
import MockTestCard from '../../elements/Cards/MockTestCard'
import icon from '../../../assets/images/MockTesticon.png'

export default function MockTest() {
    return (
        <div className="screen" id="mocktest">
            <div id="mocktest-heading">
                <img src={icon} id="mocktesticon"/>
                <div class="section-heading" style={{color:'white'}}>MOCK TEST PAPERS</div>
            </div>
            <div className="mocktestcardsection">
            {
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((number) =>
                        <div style={{margin:'20px'}}><MockTestCard/></div>
                    )}
            </div>
        </div>
    )
}
