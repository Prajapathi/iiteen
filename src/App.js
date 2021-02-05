import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routing from './Routing'
import Landing from './components/signin'
import Footer from './components/Footer'
import LeftMenu from './components/LeftMenu'
import HomeCarousel from './components/elements/HomeCarousel'
import AddPaper from './adminPanel/AddPaper'
import QuestionAdmin from './adminPanel/elements/Question'
import RoutingAdmin from './adminPanel/Routing'
import PaperInstruction from './components/elements/Paper/Instructions/PaperInstruction'
import PaperAnalysis from './components/elements/Paper/PaperAnalysis'
import Timer from './components/elements/Paper/Timer'
import Paper from './components/elements/Paper/Subjectwise/Paper'
import MockTest from './components/screens/sections/MockTest'
import Analysis from './components/elements/DetailedAnalysis/Analysis'

function App() {
  let login=true;
  return (
    <>
    {/* <Landing/> */}
    {/* <Timer duration={150}/> */}
    <BrowserRouter>
     {login?
      <><LeftMenu/><div style={{height:"70px"}}></div><Routing style={{minHeight:'80vh'}}/><Footer/></>
      :<RoutingAdmin/>
    }
     </BrowserRouter> 
      {/* 
     <PaperInstruction/> */}
     {/* <Landing/> */}
    </>
  );
}

export default App;
