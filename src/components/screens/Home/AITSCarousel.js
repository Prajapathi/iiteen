import React from 'react'
import '../../../styles/AITS-carousel.css'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AITSCarouselSlider from './AITSCarouselSlider'
import firebase from 'firebase';

export default function AITSCarousel() {
    const [upcomingTests,setUpcomingTests]=React.useState([1,2,3,4,5,6]);
    const [index,setIndex]=React.useState(0)
    const [aitsTestPapersmains, setAitsTestPapersmains] = React.useState([]);
    const [aitsTestPapersadvance, setAitsTestPapersadvance] = React.useState([]);

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

    React.useEffect(()=>{
        const db = firebase.firestore();
        db.collection("AITS")
          .doc("MAINS")
          .collection("PAPER")
          .orderBy("number")
          .get()
          .then(function (querySnapshot) {
            //store papers
            let papers = [];
            querySnapshot.forEach(function (doc) {
              console.log(doc.id, " => ", doc.data());
              papers.push(doc.data());
            });
            console.log(papers);
            setAitsTestPapersmains(papers);
    
            
          })
          .catch(function (error) {
            // setLoading(false);
            console.log("Error getting documents: ", error);
          });
    },[])

    
    React.useEffect(()=>{
        const db = firebase.firestore();
    db.collection("AITS")
      .doc("ADVANCE")
      .collection("PAPER")
      .orderBy("number")
      .get()
      .then(function (querySnapshot) {
        //store papers
        let papers = [];
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          papers.push(doc.data());
        });
        console.log(papers);
        setAitsTestPapersadvance(papers);
      })
      .catch(function (error) {
        // setLoading(false);
        console.log("Error getting documents: ", error);
      });
    },[])

    React.useEffect(() => {
        let arr = [];
        aitsTestPapersmains.map((item, index) => {
          item.papertype = "mains";
          if (
            new Date().toISOString().substring(0, 10) <= item.date2
          ) {
            arr.push(item);
          }
        });
        aitsTestPapersadvance.map((item, index) => {
          item.papertype = "advance";
          if(item.shift=="shift1"){
            if (new Date().getTime() <= new Date(item.date2+"T12:00:00+05:30").getTime()) {
              arr.push(item);
            } 
          }else if(item.shift=="shift2"){
            if (new Date().getTime() <= new Date(item.date2+"T16:00:00+05:30").getTime()) {
              arr.push(item);
            } 
          }
          // if (new Date().toISOString().substring(0, 10) <= item.date && props.heading == "Upcoming Test") {
          //   arr.push(item);
          // } else if (new Date().toISOString().substring(0, 10) > item.date && props.heading == "Past Test") {
          //   arr.push(item);
          // }
        });
        setUpcomingTests(arr);
      }, [aitsTestPapersmains, aitsTestPapersadvance]);


    return (
        <div>
            {upcomingTests.length==0?
                <div id="no-upcoming-tests">No upcoming tests to show</div>
                :<div id="aits-carousel-section">
                    <ArrowLeftIcon className="aits-carousel-button" fontSize="large" onClick={prevTest}/>
                    {/* <AITSCarouselSlider/>
                    {index==upcomingTests.length-1?null:
                        <AITSCarouselSlider/>
                    } */}
                    {upcomingTests && upcomingTests.map((item,index)=>(
                        <AITSCarouselSlider 
                        paper={item}
                        papertype={item.papertype}
                    papernumber={item.number}
                        />
                    ))}
                    <ArrowRightIcon className="aits-carousel-button" fontSize="large" onClick={nextTest}/>
                </div>
            }
        </div>
    )
}
