import React from 'react'
import firebase from 'firebase'
import {Link,useLocation,useHistory} from "react-router-dom";
import PaperInfo from './elements/PaperInfo'
import InstructionInfo from './elements/InstructionInfo'
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Paper() {
    const [numberQ,setNumberQ]=React.useState(0)
    const [paperInfo,setPaperInfo]=React.useState([]);
    const [instructionInfo,setInstructionInfo]=React.useState([]);
    const [subjectiveClass,setSubjectiveClass]=React.useState();
    const [loading,setLoading]=React.useState(false)
    const location = useLocation();
    let history = useHistory()

    const addPaper=()=>{
        const data={...paperInfo,instructions:instructionInfo}
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        setLoading(true)
        const paperRef = db.collection("AITS").add({
            data
        }).then((res)=>{
            setLoading(false);
            history.push('/Questions', { number:numberQ,subjective:location.state.subjective,paperType:location.state.paperType,paperRef:res.id})
        }).catch((error)=>{
            console.log("Error saving the document: ",error)
        })  
    }
    return (
        <div>
            {loading==true?<CircularProgress style={{margin:'25% 50%'}}/>:
                <>
                <PaperInfo sendNumberQ={setNumberQ} sendInfo={setPaperInfo} subjective={location.state.subjective} sendSubjectiveClass={setSubjectiveClass}/>
                {
                    !(location.state.subjective)?<InstructionInfo sendInfo={setInstructionInfo}/>:null
                }
                    <button style={{width:'60%',
                    margin:'0px 20% 20px 20%',
                    background:'#388cf2',
                    color:'white',
                    border:'1px solid white',
                    borderRadius:'20px'
                    }}
                    onClick={addPaper}>
                        Continue
                    </button>
                </>
            }
        </div>
    )
}
