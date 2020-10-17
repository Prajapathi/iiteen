import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from './components/screens/Home'
import About from './components/screens/About'
import Landing from './components/Landing' 
import SubjectWise from './components/screens/sections/Subjectwise'
import AITS from './components/screens/sections/AITS'
import MockTest from './components/screens/sections/MockTest'
import PreviousYear from './components/screens/sections/PreviousYear'

export default function Routing() {
    return (
        <Switch>
            <Route exact path="/">
            <Home/>
            </Route>
            <Route path="/MockTest">
            <MockTest/>
            </Route>
            <Route path="/">
            <SubjectWise/>
            </Route>
            <Route path="/PreviousYear">
            <PreviousYear/>
            </Route>
            <Route path="/AITS">
            <AITS/>
            </Route>
        </Switch>
    )
}
