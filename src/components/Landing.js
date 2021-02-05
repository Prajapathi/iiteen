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
import motive from '../assets/images/Landing/motive.png'

export default function Landing() {
    const [open,setOpen]=React.useState(true)
    const [openLogin,setOpenLogin]=React.useState(false)

    return (
        <div id="landingpage" >
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
                    <h1 style={{fontSize:'3.5rem',fontWeight:'650'}}>Are you Preparing for <b>JEE</b>?</h1>
                    <h1 style={{fontSize:'2.5rem',fontWeight:'600'}}><b>CRACK</b> IIT JEE with <b>IITeens</b></h1>
                    <p style={{fontSize:'20px'}}>IITeens conducts online Test Series for Concept Building,
                        Learning and Development of Basics of the JEE aspirants. 
                        In depth Technical Analysis accelerates the performance.</p>
                    <div>
                        <button className="landing-button" onClick={()=>setOpenLogin(true)}>Login/Signup</button>
                        <button className="landing-button">Free Trial</button>
                    </div>
                </div>
            </div>

            <div id="section2">
                <h1 style={{fontSize:'3.5rem',fontWeight:'700'}}>Why You should choose us?</h1>
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
                            Step to Step Concept building 
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
                            Lorem Ipsum is simply dummy text of
                            industry. Lorem Ipsum has been the 
                            since the 1500s, when an unknown.
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
                            Dictionary Support 
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
                            Question from Oldest Data 
                            Base from IIT Roorkee(1957),
                            IIT(1960s) Till date in latest form.
                        </p>
                    </div>
                </div>
                <div className="sub-section3">
                    <img src={subSection5}/>
                    <div className="sub-section3-sub-div">
                        <div className="sub-section3-sub-heading">
                            Money Can't Stop You
                        </div>
                        <p>
                            Lorem Ipsum is simply dummy text of
                            industry. Lorem Ipsum has been the 
                            since the 1500s, when an unknown.
                        </p>
                    </div>
                </div>
                <div className="sub-section3">
                    <img src={subSection6}/>
                    <div className="sub-section3-sub-div">
                        <div className="sub-section3-sub-heading">
                            Get Free E-Books
                        </div>
                        <p>
                            Lorem Ipsum is simply dummy text of
                            industry. Lorem Ipsum has been the 
                            since the 1500s, when an unknown.
                        </p>
                    </div>
                </div>
            </div>

            <div id="section4" >
                <h2>Our Preparation Kit</h2>
                <div className="sub-section4 right-sub-div">
                    <h2 className="section4-sub-heading right-sub-div-heading">
                        JEE Mains
                    </h2>
                    <div className="section4-sub-div">
                        <div>
                            <p>
                                Lorem Ipsum is simply dummy text of industry. 
                                has been the since the 1500s, when an unknown.
                                Lorem Ipsum has been the since the 1500s,
                                when an unknoas asassa asrdfbervawn
                            </p>
                            <div className="sub-section4-button-section">
                                <button className="landing-button">Enroll Now</button>
                                <button className="landing-button">View Schedule</button>
                            </div>
                        </div>
                        <img src={mains_pack} className="section4-img"/>
                    </div>
                </div>
                <div className="sub-section4">
                    <h2 className="section4-sub-heading">
                        JEE (Mains + Advance)
                    </h2>
                    <div className="section4-sub-div">
                        <img src={mains_adv_pack} className="section4-img"/>
                        <div>
                            <p>
                                Lorem Ipsum is simply dummy text of industry. 
                                has been the since the 1500s, when an unknown.
                                Lorem Ipsum has been the since the 1500s,
                                when an unknoas asassa asrdfbervawn
                            </p>
                            <div className="sub-section4-button-section">
                                <button className="landing-button">Enroll Now</button>
                                <button className="landing-button">View Schedule</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="section5">
                <h2>Our Motive</h2>
                <div className="sub-section5">
                    <div id="sub-section5">
                        <img src={motive} id="section5-img"/>
                        <p>
                            Lorem Ipsum is simply dummy text of industry. 
                                    has been the since the 1500s, when an unknown.
                                    Lorem Ipsum has been the since the 1500s,
                                    when an unknoas asassa asrdfbervawn
                                Lorem Ipsum is simply dummy text of industry. 
                                    has been the since the 1500s, when an unknown.
                                    Lorem Ipsum has been the since the 1500s,
                                    when an unknoas asassa asrdfbervawn  
                            Lorem Ipsum is simply dummy text of industry. 
                                    has been the since the 1500s, when an unknown.
                                    Lorem Ipsum has been the since the 1500s,
                                    when an unknoas asassa asrdfbervawn 
                        </p>
                    </div>
                </div>
            </div>
            {
                openLogin?<Signin openLogin={openLogin} closeLogin={()=>setOpenLogin(false)}/>:null
            }
        </div>
    )
}
