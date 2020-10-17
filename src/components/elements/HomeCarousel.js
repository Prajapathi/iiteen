import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import banner1 from '../../assets/images/bg.jpg'
import banner2 from '../../assets/images/bg2.jpg'
import banner3 from '../../assets/images/bg3.jpg'
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
