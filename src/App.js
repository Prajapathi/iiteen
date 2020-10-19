import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routing from './Routing'
import Landing from './components/Landing'
import Footer from './components/Footer'
import LeftMenu from './components/LeftMenu'
import Question from './components/screens/Question'
import HomeCarousel from './components/elements/HomeCarousel'
import PaperInfo from './adminPanel/elements/PaperInfo'
import QuestionAdmin from './adminPanel/elements/Question'
function App() {
  let login=false;
  return (
    <>
    <BrowserRouter>
    {login?
      <><LeftMenu/><Routing/><Footer/></>
      :<QuestionAdmin/>
    }
    </BrowserRouter>
    </>
  );
}

export default App;
