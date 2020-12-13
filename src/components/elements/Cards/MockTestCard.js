import React from 'react'
import firebase from 'firebase'
import {Link,useLocation,useHistory} from "react-router-dom";
import '../../../styles/MockTestCard.css'

export default function MockTestCard(props) {
    let history = useHistory()

    //put this is redux
    const getPaper=()=>{
        const db = firebase.firestore();
        db.collection("Trash").doc(props.paper.name).collection("Questions").get()
        .then(function(querySnapshot) {
            let questions=[];
            
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                questions.push(doc.data())
            });
            console.log(questions)
            history.push("MockTest/Papers/"+props.paper.name,{questions:questions,instructions:props.paper.instructions})
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
