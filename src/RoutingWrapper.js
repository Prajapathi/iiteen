import React from 'react'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Landing from './components/Landing' 
import Home from './components/screens/Home/Home'
import Footer from './components/Footer'
import LeftMenu from './components/LeftMenu'
import Routing from './Routing'
import Loading from './components/elements/Loading'
import AddPaper from './adminPanel/AddPaper'
import Paper from './adminPanel/Paper'
import ComingSoon from './components/screens/ComingSoon/ComingSoon'

export function RoutingWrapper(props) {
    return (
        props.isCheckingAuth?
            <Loading/>
        :
        <Switch>
            <Route path="/AddPaper">
                <AddPaper/>
            </Route>
            <Route path="/Paper">
                <Paper/>
            </Route>
            <Route exact path="/">
                <ComingSoon/>
            </Route>
            <Route exact path="/mjki@123U">
                {
                    props.isAuthenticated?
                        <><LeftMenu/><Home/><Footer/></>:
                        <><LeftMenu/><Landing/><Footer/></>
                }
            </Route>
            <Route path="/">
                <Routing/>
            </Route>
        </Switch>   
    )
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.AuthReducer.isAuthenticated,
        isCheckingAuth:state.AuthReducer.isChecking
    }
}

export default connect(mapStateToProps,null)(RoutingWrapper)