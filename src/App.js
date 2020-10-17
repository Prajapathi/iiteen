import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routing from './Routing'
import Landing from './components/Landing'
import Footer from './components/Footer'
import LeftMenu from './components/LeftMenu'
import Question from './components/screens/Question'
import HomeCarousel from './components/elements/HomeCarousel'

function App() {
  let login=true;
  return (
    <>
    <BrowserRouter>
    {login?
      <><LeftMenu/><Routing/><Footer/></>
      :<HomeCarousel/>
    }
    </BrowserRouter>
    </>
  );
}

export default App;
