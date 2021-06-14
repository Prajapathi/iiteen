import React from 'react'
import firebase from 'firebase'
import { Link } from "react-router-dom";
import '../../../styles/homeStyle.css'
import HomeCard from './HomeCard'
import UserInfo from "../../Authentication/UserInfo"
import HomeCarousel from './HomeCarousel'
import AITSCarousel from './AITSCarousel'
import banner from '../../../assets/images/mainbanner.png'


export default function Home() {
    document.title = "IITEENS | Home"

    const [timeElapsed, setTimeElapsed] = React.useState({})
    const [creationTime, setCreationTime] = React.useState()
    const [seconds, setSeconds] = React.useState(0)
    const [openUserInfo, setOpenUserInfo] = React.useState(false)

    React.useEffect(() => {
        const user = firebase.auth().currentUser
        if ((user.creationTime == user.lastSignInTime && (user.displayName == null && user.email == null)) || (user.displayName == null && user.email == null)) {
            setOpenUserInfo(true)
        }
        const userCreationTime = new Date(user.metadata.creationTime);
        // const userCreationTime= new Date("February 17, 2021 11:13:00");

        setCreationTime(userCreationTime)

        let elapsed = ((new Date()) - userCreationTime) / 1000;
        const diff = {};
        diff.days = Math.floor(elapsed / 86400);
        diff.hours = Math.floor(elapsed / 3600 % 24);
        diff.minutes = Math.floor(elapsed / 60 % 60);
        diff.seconds = Math.floor(elapsed % 60);
        console.log("Time elapsed from account creation:", diff.days, diff.hours, diff.minutes, diff.seconds)

        setTimeElapsed(diff)

        //if 10 days have passed since user creation, cancel free trial
        if (diff >= 10) {
            //do something to remove free trial
        }
        //else set interval to check every second
        else {
            let interval = setInterval(() => tick(), 1000);
            return () => {
                clearInterval(interval);
            }
        }

    }, [])

    const tick = () => {
        setSeconds(seconds + 1);
        if (!creationTime) {
            return
        }

        let elapsed = ((new Date()) - creationTime) / 1000;
        const diff = {};
        diff.days = Math.floor(elapsed / 86400);
        diff.hours = Math.floor(elapsed / 3600 % 24);
        diff.minutes = Math.floor(elapsed / 60 % 60);
        diff.seconds = Math.floor(elapsed % 60);
        if (diff.days >= 10) {
            //do something to remove free trial
        }
        setTimeElapsed(diff)
    }

    return (
        <div className="screen">
            {openUserInfo ? <UserInfo closeDialog={() => setOpenUserInfo(false)} /> : null}
            <div id="time-left-strip">
                <h5>This is beta version of IITEENS</h5>
                <div>
                    {timeElapsed.days >= 10 ?
                        "Your free trial has expired" :
                        (timeElapsed.days == 9 ?
                            (
                                timeElapsed.minutes == 1 ?
                                    "Your free trial expires in " + (60 - timeElapsed.seconds) + " seconds"
                                    : "Your free trial expires in " + (60 - timeElapsed.minutes) + " minutes"
                            )
                            : "Your free trial expires in " + (10 - timeElapsed.days) + " days"
                        )
                    }
                </div>
            </div>
            <div id="home-carousel">
                <HomeCarousel />
            </div>
            <div id="upcoming-tests-heading">
                <div>Upcoming Tests</div>
            </div>
            <div id="home-section">
                <div id="aits-carousel">
                    <AITSCarousel />
                </div>
                <div id="home">
                    <img src={banner} id="home-image" alt="" />
                    <div id="homeContent">
                        <Link to="/MockTest"><HomeCard title="Mock Test" icon="mock" /></Link>
                        <Link to="/Subjectwise"><HomeCard title="Subject-wise Test" icon="subject-wise" /></Link>
                        <Link to="/AITS"><HomeCard title="AITS" icon="AITS" /></Link>
                        <Link to="/PreviousYear"><HomeCard title="Previous Year Questions" /></Link>
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