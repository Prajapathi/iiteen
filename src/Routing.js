import React from 'react'
import {Switch,Route} from 'react-router-dom'
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

export default function Routing() {
    return (
        <Switch>
            <Route exact path="/">
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
        </Switch>
    )
}
