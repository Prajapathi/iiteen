import React from 'react';
import { BrowserRouter } from "react-router-dom";
import {store} from './store/config'
import * as Actions from './store/action/Authentication'
import RoutingWrapper from './RoutingWrapper'
import Landing from './components/signin'
import Footer from './components/Footer'
import LeftMenu from './components/NavigationLeftMenu/LeftMenu'
import AddPaper from './adminPanel/AddPaper'
import QuestionAdmin from './adminPanel/elements/Question'
import RoutingAdmin from './adminPanel/Routing'
import PaperInstruction from './components/elements/Paper/Instructions/PaperInstruction'
import Timer from './components/elements/Paper/Timer'
import Paper from './components/elements/Paper/Subjectwise/Paper'
import Analysis from './components/elements/DetailedAnalysis/Analysis'
import ComingSoon from './components/screens/ComingSoon/ComingSoon'

function App() {
  let login = true;
  store.dispatch(Actions.verifyAuth())
  return (
    <>
      {/* <Timer duration={150}/> */}
      <BrowserRouter>
        {login ?
          <><RoutingWrapper style={{ minHeight: '80vh' }} /></>
          : <RoutingAdmin />
        }
      </BrowserRouter>
      {/* <ComingSoon/> */}
    </>
  );
}

export default App;
