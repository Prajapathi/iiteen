import React from 'react'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {fetchPaper} from '../../../store/action/Paper'
import {Link,useLocation,useHistory} from "react-router-dom";
import '../../../styles/MockTestCard.css'

export function MockTestCard(props) {
    let history = useHistory()

    //fetch paper and put it into redux store
    const getPaper=()=>{
        const db = firebase.firestore();
        props.setLoading(true)
        db.collection("MOCK").doc(props.paper.name).collection("Questions").get()
        .then(function(querySnapshot) {
            let questions=[];
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                questions.push({...doc.data(),qid:doc.id})
            });

            console.log(questions)
            //sort questions based on number
            questions.sort(function(a,b){return a.number-b.number});

            const obj={...props.paper, questions:questions}
            //put into redux store
            props.fetchPaper(obj)
            //to check if user is navigating through MockTestCard
            localStorage.setItem("PaperName",props.paper.name)
            props.setLoading(false)
            history.push("MockTest/Papers/"+props.paper.name)
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    return (
        <div className="flip-card-mock">
            <div className="flip-card-inner-mock">
                <div className="flip-card-front-mock">
                    <div id="card-title-mock">
                        <div style={{fontSize:'26px'}}>{props.paper.name}</div>
                    </div> 
                    <div id="card-content-mock">
                        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                            <div style={{fontSize:'14px',color:'#448698'}}>Pattern: </div>
                            <div style={{fontSize:'14px',color:'#448698'}}>{props.paper.paperType==1?"Mains":"Advance"} </div>
                        </div>
                        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                            <div style={{fontSize:'14px',color:'#448698'}}>Duration: </div>
                            <div style={{fontSize:'14px',color:'#448698'}}>{props.paper.totalDuration} minutes</div>
                        </div>
                        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                            <div style={{fontSize:'14px',color:'#448698'}}>Max Marks </div>
                            <div style={{fontSize:'14px',color:'#448698'}}>{props.paper.totalMarks}</div>
                        </div>
                    </div> 
                    {/* <Link to={"MockTest/Papers/"+props.paper.name}> */}
                    {/* if this paper is selected, fetch the questions it consists */}
                        <button onClick={getPaper}>Attempt</button>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps=dispatch=>{
    return{
        fetchPaper:(paper)=>dispatch(fetchPaper(paper))
    }
}

export default connect(null,mapDispatchToProps)(MockTestCard)