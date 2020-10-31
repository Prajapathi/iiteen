import React,{useEffect} from 'react'
import firebase from 'firebase'
import {Link, useLocation,useHistory } from "react-router-dom";
import Question from './elements/Question'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Questions(props) {

    const location = useLocation();
    const history=useHistory();
    const [index,setIndex]=React.useState(0);
    const [questionArray,setQuestionArray]=React.useState([])
    const [loading,setLoading]=React.useState(false)
    
    const savePaper=()=>{
        const db = firebase.firestore();
        setLoading(true)
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection(`${props.paperRoute}/${props.paperRef}/Questions`).add({
                questionArray
        }).then((res)=>{
            setLoading(false);
            history.push('/AddPaper',{success:true})
        }).catch((error)=>{
            console.log("Error saving the document: ",error);
        })  
    }
    return (
        <>
            {loading==true?<CircularProgress style={{margin:'25% 50%'}}/>:
                    <div>
                    <Question key={index} index={index} infoArray={questionArray} sendInfo={setQuestionArray}/>
                    {index>0?<button style={{width:'60%',
                                                    height:'40px',
                                                    margin:'0px 20% 20px 20%',
                                                    background:'#388cf2',
                                                    color:'white',
                                                    border:'1px solid white',
                                                    borderRadius:'20px'
                                                    }}
                                                    onClick={()=>setIndex(index-1)}>
                                                        BACK
                                                    </button>:null}
                    {index<=(props.number-2)?
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
                                                    
                                                    :
                                                    <button style={{width:'60%',
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
            }
        </>
    )
}
