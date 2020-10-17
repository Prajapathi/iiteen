import React from 'react'
import '../styles/landingpage.css'
import banner from '../assets/images/Landing/landing_main.png'
import second from '../assets/images/Landing/second.png'

export default function Landing() {
    return (
        <div id="landingpage">
            <div id="section1">
                <img src={banner}/>
                <div id="section1-text">
                    <h1 style={{fontSize:'60px',fontWeight:'650'}}>Are you Preparing for <b>JEE</b>?</h1>
                    <h1 style={{fontSize:'38px',fontWeight:'600'}}><b>CRACK</b> IIT JEE with <b>IITeens</b></h1>
                    <p style={{fontSize:'20px'}}>IITeens conducts online Test Series for Concept Building,
                        Learning and Development of Basics of the JEE aspirants. 
                        In depth Technical Analysis accelerates the performance.</p>
                    <div>
                        <button>Login/Signup</button>
                        <button>Free Trial</button>
                    </div>
                </div>
            </div>
            <div id="section2">
                <h1 style={{fontSize:'54px',fontWeight:'700'}}>Why You should choose us?</h1>
                <img src={second}/>
            </div>
        </div>
    )
}
