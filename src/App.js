import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routing from './Routing'
import Landing from './components/Landing'
import Footer from './components/Footer'
import LeftMenu from './components/LeftMenu'
import HomeCarousel from './components/elements/HomeCarousel'
import Paper from './adminPanel/Paper'
import AddPaper from './adminPanel/AddPaper'
import QuestionAdmin from './adminPanel/elements/Question'
import RoutingAdmin from './adminPanel/Routing'
import PaperInstruction from './components/elements/Paper/PaperInstruction'
import MockTest from './components/screens/sections/MockTest'

function App() {
  let login=false;
  return (
    <>
    <BrowserRouter>
    {login?
      <><Routing/></>
      :<RoutingAdmin/>
    }
      {/* <Routing/>
      <RoutingAdmin/> */}
    </BrowserRouter>
     {/* <LeftMenu/>
     <PaperInstruction/> */}
    </>
  );
}

export default App;
