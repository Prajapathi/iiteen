import React from 'react'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Landing from './components/Landing' 
import Home from './components/screens/Home/Home'
import Footer from './components/Footer'
import LeftMenu from './components/LeftMenu'
import Routing from './Routing'
import CircularProgress from '@material-ui/core/CircularProgress';

export function RoutingWrapper(props) {
    return (
        props.isCheckingAuth?
            <CircularProgress/>
        :
        <Switch>
            <Route exact path="/">
                {
                    props.isAuthenticated?
                        <><LeftMenu/><div style={{height:"70px"}}></div><Home/><Footer/></>:
                        <><LeftMenu/><div style={{height:"70px"}}></div><Landing/><Footer/></>
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