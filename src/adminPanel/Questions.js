import React,{useEffect} from 'react'
import firebase from 'firebase'
import {Link, useLocation } from "react-router-dom";
import Question from './elements/Question'

export default function Questions(props) {

    const location = useLocation();
    const [index,setIndex]=React.useState(0);
    const [questionArray,setQuestionArray]=React.useState([])
    
    const savePaper=()=>{
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection("Trash/questionPaper/Questions").add({
        questionArray
        });  
    }
    return (
        <>
                    <div>
                    <Question key={index} index={index} infoArray={questionArray} sendInfo={setQuestionArray}/>
                    {index<=(location.state.number-2)?
                                                    <button style={{width:'60%',
                                                    margin:'0px 20% 20px 20%',
                                                    background:'#388cf2',
                                                    color:'white',
                                                    border:'1px solid white',
                                                    borderRadius:'20px'
                                                    }}
                                                    onClick={()=>setIndex(index+1)}>
                                                        Continue
                                                    </button>
                                                    
                                                    :<button style={{width:'60%',
                                                    height:'40px',
                                                    margin:'0px 20% 20px 20%',
                                                    background:'#388cf2',
                                                    color:'white',
                                                    border:'1px solid white',
                                                    borderRadius:'20px'
                                                    }}
                                                    onClick={savePaper}>
                                                        SAVE PAPER
                                                    </button>
                    }
                    </div>
                    
                
        </>
    )
}
