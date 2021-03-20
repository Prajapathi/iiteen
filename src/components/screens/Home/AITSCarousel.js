import React from 'react'
import '../../../styles/AITS-carousel.css'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AITSCarouselSlider from './AITSCarouselSlider'

export default function AITSCarousel() {
    const [upcomingTests,setUpcomingTests]=React.useState([1,2,3,4,5,6]);
    const [index,setIndex]=React.useState(0)

    const prevTest=()=>{
        if(index==0)
            setIndex(upcomingTests.length%2==0?upcomingTests.length-2:upcomingTests.length-1)
        else setIndex(index-2)
    }
    const nextTest=()=>{
        if((upcomingTests.length%2==0 && index==(upcomingTests.length-2)) ||(upcomingTests.length%2==1 && index==(upcomingTests.length-1)))
            setIndex(0)
        else setIndex(index+2)
    }

    return (
        <div>
            {upcomingTests.length==0?
                <div id="no-upcoming-tests">No upcoming tests to show</div>
                :<div id="aits-carousel-section">
                    <ArrowLeftIcon className="aits-carousel-button" fontSize="large" onClick={prevTest}/>
                    <AITSCarouselSlider/>
                    {index==upcomingTests.length-1?null:
                        <AITSCarouselSlider/>
                    }
                    <ArrowRightIcon className="aits-carousel-button" fontSize="large" onClick={nextTest}/>
                </div>
            }
        </div>
    )
}
