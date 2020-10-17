import React from 'react'
import {Link} from "react-router-dom";
import '../../styles/homeStyle.css'
import HomeCard from '../elements/HomeCard'
import HomeCarousel from '../elements/HomeCarousel'
import SubjectWise from './sections/Subjectwise'
import AITS from './sections/AITS'
import MockTest from './sections/MockTest'
import PreviousYear from './sections/PreviousYear'
import bg from '../../assets/images/bg.jpg'
import banner from '../../assets/images/mainbanner.png'

export default function Home() {
    return (
        <div class="screen">
        {/* <img src={bg} id="homeBanner"/> */}
        <div style={{height:'auto',width:'80%',margin:'auto'}}>
            <HomeCarousel/>
        </div>
        <div id="home-section">
        <div id="home">
            <div id="home-img-div">
                <img src={banner} id="home-image"/>
            </div>
            <div id="homeContent">
                    <Link to="/MockTest"><HomeCard title="Mock Test" icon="mock"/></Link>
                    <Link to="/Subjectwise"><HomeCard title="Subject-wise Test" icon="subject-wise"/></Link>
                    <Link to="/AITS"><HomeCard title="AITS" icon="AITS"/></Link>
                    <Link to="/PreviousYear"><HomeCard title="Previous Year"/></Link>
            </div>
        </div>
        </div>
        </div>
    )
}
