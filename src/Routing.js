import React from 'react'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Home from './components/screens/Home'
import About from './components/screens/About'
import Landing from './components/Landing' 
import SubjectWise from './components/screens/sections/Subjectwise'
import AITS from './components/screens/sections/AITS'
import MockTest from './components/screens/sections/MockTest'
import PreviousYear from './components/screens/sections/PreviousYear'
import Papers from './components/elements/Paper/Paper'
import NoQuestionsError from './components/elements/Paper/NoQuestionsError'
import SubjectwisePaper from './components/elements/Paper/Subjectwise/Paper'
import PaperAnalysis from './components/elements/Paper/PaperAnalysis'
import Footer from './components/Footer'
import LeftMenu from './components/LeftMenu'
import Signin from './components/signin'
import CircularProgress from '@material-ui/core/CircularProgress';

export function Routing(props) {
    const [authenticated,setAuthenticated]=React.useState('')

    React.useEffect(() => {
        console.log("YEAH?")
        setAuthenticated(props.isAuthenticated)
    }, [props.isAuthenticated])

    console.log("Token",props.isAuthenticated,authenticated)
    return (
        authenticated===''?<CircularProgress/>:
        authenticated==false?
            <><LeftMenu/><div style={{height:"60px"}}></div><Landing/><Footer/></>
        :
        <>
        <Switch>
            <Route exact path="/">
               {
                   authenticated?
                    <><LeftMenu/><div style={{height:"70px"}}></div><Home/><Footer/></>
                    :<><LeftMenu/><div style={{height:"60px"}}></div> <Landing/><Footer/></>
               }
            </Route>
            <Route exact path="/Home">
                <LeftMenu/><div style={{height:"70px"}}></div><Home/><Footer/>
            </Route>
            <Route exact path="/MockTest">
                 <LeftMenu/><div style={{height:"70px"}}></div><MockTest/><Footer/>
            </Route>
            <Route exact path="/Subjectwise">
                <LeftMenu/><div style={{height:"70px"}}></div><SubjectWise/><Footer/>
            </Route>
            <Route exact path="/PreviousYear">
                <LeftMenu/><div style={{height:"70px"}}></div><PreviousYear/><Footer/>
            </Route>
            <Route path="/AITS">
                <LeftMenu/><div style={{height:"70px"}}></div><AITS/><Footer/>
            </Route>
            <Route exact path="/Subjectwise/Papers/:paperName">
                <LeftMenu/><div style={{height:"70px"}}></div><SubjectwisePaper/><Footer/>
            </Route>
            <Route exact path="/:paperType/Papers/:paperName">
                <LeftMenu/><div style={{height:"70px"}}></div><Papers/><Footer/>
            </Route>
            <Route exact path="/:paperType/Papers/Analysis/:paperName">
                <LeftMenu/><div style={{height:"70px"}}></div><PaperAnalysis/><Footer/>
            </Route>
            <Route exact path="/QuestionsError">
                <LeftMenu/><div style={{height:"70px"}}></div><NoQuestionsError/><Footer/>
            </Route>
            <Route exact path="/Signin">
                <LeftMenu/><div style={{height:"70px"}}></div><Signin/><Footer/>
            </Route>
        </Switch>
        
        </>
    )
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.AuthReducer.isAuthenticated
    }
}

export default connect(mapStateToProps,null)(Routing)