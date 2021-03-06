import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'
import aits_banner from '../../../assets/images/aits_banner.png'
import mock_banner from '../../../assets/images/mock_banner.png'
import subjectwise_banner from '../../../assets/images/subjectwise_banner.png'
import iiteens_corner_banner from '../../../assets/images/iiteens_corner_banner.png'

export default function HomeCarousel() {
  const [vpWidth,setvpWidth]=useState(window.innerWidth);
  const [showIndicator, setshowIndicator] = useState(true)

  useEffect(() => {
        window.addEventListener("resize", () => setvpWidth(window.innerWidth));
    },[])

  useEffect(() => {
        if(vpWidth<500){
            setshowIndicator(false);
        }
        else setshowIndicator(true);
    },[vpWidth])

  return (
    <div>
      <Carousel interval="3000" indicators={showIndicator} >
        
        <Carousel.Item>
          <Link to="/AITS">
            <img
              className="d-block w-100"
              src={aits_banner}
              alt="AITS"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/MockTest">
            <img
              className="d-block w-100"
              src={mock_banner}
              alt="Mock Tests"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/Subjectwise">
            <img
              className="d-block w-100"
              src={subjectwise_banner}
              alt="Subjectwise Tests"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to='/'>
            <img
              className="d-block w-100"
              src={iiteens_corner_banner}
              alt="IITeens Corner"
            />
          </Link>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
