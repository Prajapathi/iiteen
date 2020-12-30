import React,{useEffect,useState} from 'react'
import firebase from 'firebase'
import {Link,useHistory} from "react-router-dom";
import '../../../styles/MockTest.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import MockTestCard from '../../elements/Cards/MockTestCard'
import icon from '../../../assets/images/MockTesticon.png'

export default function MockTest() {
    const [mockTestPapers,setMockTestPapers]=useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        //fetching all the papers from MOCK folder of database and storing it in mockTestPapers
        setLoading(true)

        const db = firebase.firestore();
        db.collection("MOCK").get()
        .then(function(querySnapshot) {
            let papers=[];
            setLoading(false)
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                papers.push(doc.data())
            });
            console.log(papers)
            setMockTestPapers(papers)
        })
        .catch(function(error) {
            setLoading(false)
            console.log("Error getting documents: ", error);
        });
}, [])

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
                            <div style={{margin:'20px'}}><MockTestCard  paper={item} setLoading={setLoading}/></div>
                        )}
                </div>
            </div>
        
    )
}
