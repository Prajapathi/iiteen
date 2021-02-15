import React,{useState,useEffect} from 'react'
import firebase from 'firebase'
import {connect} from 'react-redux'
import CardSection from '../../elements/CardSection'
import icon from '../../../assets/images/mainbanner.png'
import CircularProgress from '@material-ui/core/CircularProgress';


export function PreviousYear(props) {

    const [previousPapers,setPreviousPapers]=useState({})
    const [attemptedPapers,setAttemptedPapers]=useState([])
    const [loading, setLoading] = useState(true)

    document.title="Previous Year | IITEENS"

    useEffect(() => {
        //fetching all the papers from MOCK folder of database and storing it in previousPapers
        setLoading(true)

        const db = firebase.firestore();
        db.collection("PREVIOUS").orderBy("date").get()
        .then(function(querySnapshot) {
            //store papers
            let mainsPapers=[],advancePapers=[];
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                if(doc.data().paperType==1)
                    mainsPapers.push(doc.data())
                else 
                    advancePapers.push(doc.data())
            });
            console.log({mainsPapers,advancePapers})
            setPreviousPapers({mainsPapers,advancePapers})

            //After fetcing papers, fetch attempted papers to check for re-attempts
            db.collection("User").doc(props.user.uid).collection("PREVIOUSPapers").get()
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
         <div  className="screen" id="AITS">
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src={icon} id="aitsicon" alt=""/>
                <div class="section-heading">PREVIOUS YEAR TEST PAPERS</div>
            </div>
            <div>
                <div className="bar">
                    <h2>JEE MAINS</h2>
                </div>
                <CardSection section="PreviousYear" setLoading={setLoading} checkAttempted={checkAttempted} paper={previousPapers.mainsPapers} type="mains"/>
            </div>
            <div>
                <div className="bar">
                    <h2>JEE ADVANCE</h2>
                </div>
                <CardSection section="PreviousYear" setLoading={setLoading} paper={previousPapers.advancePapers} type="advance"/>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.AuthReducer.user
    }
}

export default connect(mapStateToProps,null)(PreviousYear)