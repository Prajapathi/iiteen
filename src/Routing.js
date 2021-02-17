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
            <LeftMenu/>
            <Switch>
                <Route exact path="/Home">
                    <Home/>
                </Route>
                <Route exact path="/MockTest">
                    <MockTest/>
                </Route>
                <Route exact path="/Subjectwise">
                    <SubjectWise/>
                </Route>
                <Route exact path="/PreviousYear">
                    <PreviousYear/>
                </Route>
                <Route path="/AITS">
                    <AITS/>
                </Route>
                <Route exact path="/Subjectwise/Papers/:paperName">
                    <SubjectwisePaper/>
                </Route>
                <Route exact path="/:paperType/Papers/:paperName">
                    <Papers/>
                </Route>
                <Route exact path="/:paperType/Papers/Analysis/:paperName">
                    <PaperAnalysis/>
                </Route>
                <Route exact path="/QuestionsError">
                    <NoQuestionsError/>
                </Route>
                <Route exact path="/Signin">
                    <Signin/>
                </Route>
            </Switch>
            <Footer/>
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