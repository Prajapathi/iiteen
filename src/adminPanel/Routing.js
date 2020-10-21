import React from 'react'
import {Switch,Route} from 'react-router-dom'
import AddPaper from './AddPaper'
import Paper from './Paper'
import Question from './elements/Question'

export default function Routing() {
    return (
        <Switch>
            <Route path="/AddPaper">
            <AddPaper/>
            </Route>
            <Route path="/Paper">
            <Paper/>
            </Route>
            <Route path="/Question">
            <Question/>
            </Route>
        </Switch>
    )
}