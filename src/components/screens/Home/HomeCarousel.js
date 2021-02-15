import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import banner1 from '../../../assets/images/bg.png'
import banner2 from '../../../assets/images/bg2.png'
import banner3 from '../../../assets/images/bg3.png'
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
      <Carousel interval="3000" indicators={showIndicator}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner3}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner2}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
