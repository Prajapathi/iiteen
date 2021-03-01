import React from 'react'
import firebase from 'firebase'
import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import '../styles/landingpage.css'
import Signin from './Authentication/Signin'
import googlePlay from '../assets/images/Landing/google-play.png'
import iosStore from '../assets/images/Landing/app-store.png'
import banner from '../assets/images/Landing/landing_main.png'
import second from '../assets/images/Landing/second.png'
import subSection1 from '../assets/images/Landing/sub-section1.png'
import subSection2 from '../assets/images/Landing/sub-section2.png'
import subSection3 from '../assets/images/Landing/sub-section3.png'
import subSection4 from '../assets/images/Landing/sub-section4.png'
import subSection5 from '../assets/images/Landing/sub-section5.png'
import subSection6 from '../assets/images/Landing/sub-section6.png'
import mains_pack from '../assets/images/Landing/mains_pack.png'
import mains_adv_pack from '../assets/images/Landing/mains_adv_pack.png'

export default function Landing() {
    document.title="IITEENS"
    const [open,setOpen]=React.useState(true)
    const [openLogin,setOpenLogin]=React.useState(false)
    const [openSignup,setOpenSignup]=React.useState(false)

    return (
        <div id="landingpage" >
            {
                (openLogin||openSignup)?
                        <Signin openLogin={openLogin || openSignup}
                            login={openLogin} 
                            closeLogin={openLogin?()=>setOpenLogin(false):()=>setOpenSignup(false)}
                        />
                    :null
            }
            <div style={{transform: open ? 'translateX(0)' : 'translateX(180px)', transition: "all 0.5s linear"}}>
                <div  id="app-bar">
                    <div id="app-bar-open" onClick={()=>setOpen(!open)}>
                        {
                            open?<ChevronRightIcon style={{fontSize:"38px"}}/>
                                :<ChevronLeftIcon style={{fontSize:"38px"}}/>
                        }
                    </div>
                    <div id="app-bar-button">
                        <h5>Get Our App</h5>
                        <a href="">
                            <img src={googlePlay} />
                        </a>
                        <a href="">
                            <img src={iosStore}/>
                        </a>
                    </div>
                </div>
            </div>
            <div id="section1">
                <img src={banner}/>
                <div id="section1-text">
                    <h1 id="section1-heading-line1">Are you Preparing for <b>JEE</b>?</h1>
                    <h1 id="section1-heading-line2"><b>CRACK</b> IIT JEE with <b>IITeens</b></h1>
                    <p style={{fontSize:'20px'}}>IITeens conducts online Test Series for Concept Building,
                    Learning and Development of Basics of the JEE aspirants 
                    through in-depth Technical Analysis learned through 
                    Test Series accelerates the performance ​</p>
                    <div id="section1-text-div">
                        <div className="section1-button-sec">
                            <button className="landing-button" id="section1-button1" onClick={()=>setOpenLogin(true)}>Login</button>
                            <div onClick={()=>setOpenSignup(true)}>Not already a user? Sign Up now</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="section2">
                <h1 id="section2-heading">Why You should choose us?</h1>
                <img src={second}/>
            </div>

            <div id="section3">
                <div className="sub-section3">
                    <img src={subSection1}/>
                    <div className="sub-section3-sub-div">
                        <div className="sub-section3-sub-heading">
                            Ask with Experts
                        </div>
                        <p>
                            Coming Soon...
                        </p>
                    </div>
                </div>
                <div className="sub-section3">
                    <img src={subSection2}/>
                    <div className="sub-section3-sub-div">
                        <div className="sub-section3-sub-heading">
                            Get detailed Analysis
                        </div>
                        <p>
                            Graphical Form of Report for 
                            better feedback and also
                            improving performance
                        </p>
                    </div>
                </div>
                <div className="sub-section3">
                    <img src={subSection3}/>
                    <div className="sub-section3-sub-div">
                        <div className="sub-section3-sub-heading">
                            IITeens Corner
                        </div>
                        <p>
                            <a target="_blank" href="https://www.dictionary.com/">www.dictionary.com</a>
                        </p>
                    </div>
                </div>
                <div className="sub-section3">
                    <img src={subSection4}/>
                    <div className="sub-section3-sub-div">
                        <div className="sub-section3-sub-heading">
                            50+ Years Question Bank
                        </div>
                        <p>
                            Coming Soon...
                        </p>
                    </div>
                </div>
            </div>

            <div id="section4" >
                <h2>Our Preparation Kit</h2>
                <div className="sub-section4 right-sub-div">
                    <h2 className="section4-sub-heading right-sub-div-heading">
                        JEE (Mains + Advance)
                    </h2>
                    <div className="section4-sub-div">
                        <div>
                            <div className="sub-section4-list-section">
                                <ul>
                                    <li>Chapterwise Tests for Physics Chemistry & Maths.​</li>
                                    <li>3 Level of Difficulty to enhance step by step concept building</li>
                                    <li>15 Mock Test  for self analysis</li>
                                    <li>48 AITS for performance checking with all India JEE aspirants </li>
                                    <li>New Pattern Followed & Full Analysis of all Tests to know the performance ​</li>​
                                    
                                </ul>
                            </div>
                            <div className="sub-section4-button-section">
                                <button className="landing-button" onClick={()=>setOpenLogin(true)}>Enroll Now</button>
                                <button className="landing-button">View Schedule</button>
                            </div>
                        </div>
                        <img src={mains_adv_pack} className="section4-img"/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
