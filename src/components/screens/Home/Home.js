import React from 'react'
import firebase from 'firebase'
import {Link} from "react-router-dom";
import '../../../styles/homeStyle.css'
import HomeCard from './HomeCard'
import HomeCarousel from './HomeCarousel'
import banner from '../../../assets/images/mainbanner.png'

export default function Home() {
    document.title="IITEENS | Home"
    const [timeElapsed,setTimeElapsed]=React.useState({})

    React.useEffect(() => {
        let elapsed=((new Date())-new Date(firebase.auth().currentUser.metadata.creationTime))/1000;
        const diff = {};

        diff.days    = Math.floor(elapsed / 86400);
        diff.hours   = Math.floor(elapsed / 3600 % 24);
        diff.minutes = Math.floor(elapsed / 60 % 60);
        diff.seconds = Math.floor(elapsed % 60);
        console.log("yo?",diff.days,diff.hours,diff.minutes,diff.seconds)
        setTimeElapsed(diff)
    }, [])
    return (
        <div className="screen">
            <div>
                Time Elapsed:{timeElapsed.days}
            </div>
            <div style={{height:'auto',width:'80%',margin:'auto'}}>
                <HomeCarousel/>
            </div>
            <div id="home-section">
                <div id="home">
                    <div id="home-img-div">
                        <img src={banner} id="home-image" alt=""/>
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

// const mapStateToProps=(state)=>{
//     return{
//         isAuthenticated:state.AuthReducer.isAuthenticated,
//         user:state.AuthReducer.user
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Home)