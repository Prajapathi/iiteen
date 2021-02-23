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
import Loading from './components/elements/Loading'



export function Routing(props) {
    const [authenticated,setAuthenticated]=React.useState(false)
    const [isChecking,setIsChecking]=React.useState(true)

    React.useEffect(() => {
        setAuthenticated(props.isAuthenticated)
        setIsChecking(props.isCheckingAuth)
    }, [props.isAuthenticated,props.isCheckingAuth])

    return (
        isChecking?<Loading/>:
        ( !props.isAuthenticated )?
           <Redirect to='/'/>:
        <>
        
        <Switch>
            <Route exact path="/About">
                <LeftMenu/><About/><Footer/>
            </Route>
            <Route exact path="/Home">
                <LeftMenu/><Home/><Footer/>
            </Route>
            <Route exact path="/MockTest">
                 <LeftMenu/><MockTest/><Footer/>
            </Route>
            <Route exact path="/Subjectwise">
                <LeftMenu/><SubjectWise/><Footer/>
            </Route>
            <Route exact path="/PreviousYear">
                <LeftMenu/><PreviousYear/><Footer/>
            </Route>
            <Route path="/AITS">
                <LeftMenu/><AITS/><Footer/>
            </Route>
            <Route exact path="/Subjectwise/Papers/:paperName">
                <LeftMenu/><SubjectwisePaper/><Footer/>
            </Route>
            <Route exact path="/:paperType/Papers/:paperName">
                <LeftMenu/><Papers/><Footer/>
            </Route>
            <Route exact path="/:paperType/Papers/Analysis/:paperName">
                <LeftMenu/><PaperAnalysis/><Footer/>
            </Route>
            <Route exact path="/QuestionsError">
                <LeftMenu/><NoQuestionsError/><Footer/>
            </Route>
            <Route exact path="/Signin">
                <LeftMenu/><Signin/><Footer/>
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