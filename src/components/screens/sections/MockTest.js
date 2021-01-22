import React,{useEffect,useState} from 'react'
import firebase from 'firebase'
import {Link,useHistory} from "react-router-dom";
import '../../../styles/MockTest.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import MockTestCard from '../../elements/Cards/MockTestCard'
import icon from '../../../assets/images/MockTesticon.png'

export default function MockTest() {
    const [mockTestPapers,setMockTestPapers]=useState([])
    const [attemptedPapers,setAttemptedPapers]=useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        //fetching all the papers from MOCK folder of database and storing it in mockTestPapers
        setLoading(true)

        const db = firebase.firestore();
        db.collection("MOCK").orderBy("date").get()
        .then(function(querySnapshot) {
            //store papers
            let papers=[];
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                papers.push(doc.data())
            });
            console.log(papers)
            setMockTestPapers(papers)

            //After fetcing papers, fetch attempted papers to check for re-attempts
            db.collection("User").get()
            .then(function(querySnapshot) {
                let attempted=[];
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    attempted.push(doc.data())
                });
                console.log(attempted)
                setAttemptedPapers(attempted)
                setLoading(false)
            })
            .catch(function(error) {
                setLoading(false)
                console.log("Error getting documents: ", error);
            });
        })
        .catch(function(error) {
            setLoading(false)
            console.log("Error getting documents: ", error);
        });

        // db.collection("SUBJECTWISE/Class 11/Physics/Chapter 07/Level 01").get()
        //     .then(function(querySnapshot) {
        //         let arr=[]
        //         querySnapshot.forEach(function(doc) {
        //             console.log(doc.id, " => ", doc.data());
        //             db.collection("SUBJECTWISE/Class 11/Physics/Chapter 09/Level 01").add(doc.data())
        //             .then((data)=>{
        //                 console.log("DONE!!!!",data.id())
        //             })
        //             .catch((error)=>{
        //                 console.log(error)
        //             })
        //             arr.push(doc.data())
        //         });
        //         console.log("data is here",arr)
                
        //     })
        //     .catch(function(error) {
        //         setLoading(false)
        //         console.log("Error getting documents: ", error);
        //     });

}, [])
    
    //function to check if particular paper has been attempted
    const checkAttempted=(id)=>{
        for(let i=0; i<attemptedPapers.length; i++){
            if(attemptedPapers[i].uid==id)
                return true;
        }
        return false;
    }

    return (
        loading==true?
            <CircularProgress style={{margin:'25% 50%'}}/>:
            <div className="screen" id="mocktest">
                <div id="mocktest-heading">
                    <img src={icon} id="mocktesticon"/>
                    <div class="section-heading" style={{color:'white'}}>MOCK TEST PAPERS</div>
                </div>
                <div className="mocktestcardsection">
                    {/* rendering each paper in a card and passing the paper info to the individual card */}
                    {
                        mockTestPapers.map((item) =>
                                <div style={{margin:'20px'}}>
                                    <MockTestCard isAttempted={checkAttempted(item.name)} paper={item} setLoading={setLoading}/>
                                </div>
                            )}
                </div>
            </div>
    )
}
