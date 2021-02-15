import React from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Home from './components/screens/Home/Home'
import About from './components/screens/About'
import Landing from './components/Landing' 
import SubjectWise from './components/screens/Subjectwise/Subjectwise'
import AITS from './components/screens/AITS/AITS'
import MockTest from './components/screens/MockTest/MockTest'
import PreviousYear from './components/screens/PreviousYear/PreviousYear'
import Papers from './components/elements/Paper/Paper'
import NoQuestionsError from './components/elements/Paper/NoQuestionsError'
import SubjectwisePaper from './components/elements/Paper/Subjectwise/Paper'
import PaperAnalysis from './components/elements/Paper/PaperAnalysis'
import Footer from './components/Footer'
import LeftMenu from './components/LeftMenu'
import Signin from './components/signin'
import CircularProgress from '@material-ui/core/CircularProgress';



export function Routing(props) {
    const [authenticated,setAuthenticated]=React.useState(false)
    const [isChecking,setIsChecking]=React.useState(true)

    React.useEffect(() => {
        setAuthenticated(props.isAuthenticated)
        setIsChecking(props.isCheckingAuth)
    }, [props.isAuthenticated,props.isCheckingAuth])

    return (
        isChecking?<CircularProgress/>:
        ( !props.isAuthenticated )?
           <Redirect to='/'/>:
        <>
        <Switch>
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
        isAuthenticated:state.AuthReducer.isAuthenticated,
        isCheckingAuth:state.AuthReducer.isChecking
    }
}

export default connect(mapStateToProps,null)(Routing)