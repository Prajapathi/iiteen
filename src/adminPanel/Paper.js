import React from 'react'
import firebase from 'firebase'
import {Link,useLocation,useHistory} from "react-router-dom";
import PaperInfo from './elements/PaperInfo'
import Questions from './Questions'
import InstructionInfo from './elements/InstructionInfo'
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Paper() {
    const [numberQ,setNumberQ]=React.useState(0)
    const [paperInfo,setPaperInfo]=React.useState([]);
    const [instructionInfo,setInstructionInfo]=React.useState([]);
    const [subjectiveClass,setSubjectiveClass]=React.useState();
    const [loading,setLoading]=React.useState(false)
    const [showQuestion,setShowQuestion]=React.useState(false)
    const [refid,setRefid]=React.useState()
    const [paperRoute,setpaperRoute]=React.useState()
    const [pSaveName,setpSaveName]=React.useState()
    const location = useLocation();
    let history = useHistory()

    React.useEffect(() => {
        let paperType=localStorage.getItem("paperType");
        if(paperType!="1"&&paperType!="2"&&paperType!="3"){
            history.push('/AddPaper');
        }
        else{
            localStorage.removeItem("paperType")
            setpaperRoute(location.state.subjective?"SUBJECTIVE":(location.state.paperType=="1"?"AITS":(location.state.paperType=="2"?"PREVIOUS":"MOCK")))
        }
    }, [])
    
    const addPaper=()=>{
        const pname=paperInfo.name
        setpSaveName(paperInfo.name)
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        setLoading(true)
        paperInfo.date=new Date(paperInfo.date)
        const paperRef = db.collection(paperRoute).doc(pname).set({
            ...paperInfo,instructionInfo
        }).then((res)=>{
            setLoading(false);
            localStorage.setItem("noOfQuestions",numberQ)
            setShowQuestion(true);
            setRefid(res.id)
            //history.push('/Questions', { number:numberQ,subjective:location.state.subjective,paperType:location.state.paperType,paperRoute:paperRoute,paperRef:res.id})
        }).catch((error)=>{
            setLoading(false);
            console.log("Error saving the document: ",error)
        })  
    }
    return (
        <div>
            {loading==true?<CircularProgress style={{margin:'25% 50%'}}/>:
                (showQuestion==false?
                <>
                <PaperInfo sendNumberQ={setNumberQ} sendInfo={setPaperInfo} subjective={location.state?location.state.subjective:null} sendSubjectiveClass={setSubjectiveClass}/>
                {
                    !(location.state?location.state.subjective:null)?<InstructionInfo sendInfo={setInstructionInfo}/>:null
                }
                    {(paperInfo.name==''||paperInfo.totalDuration==''||paperInfo.totalMarks==''||paperInfo.noOfQuestions=='')?null:<button style={{width:'60%',
                    margin:'0px 20% 20px 20%',
                    background:'#388cf2',
                    color:'white',
                    border:'1px solid white',
                    borderRadius:'20px'
                    }}
                    onClick={addPaper}>
                        Continue
                    </button>
                    }
                </>:<Questions subjective={location.state.subjective} paperType={location.state.paperType} paperRoute={paperRoute} pname={pSaveName} paperRef={refid}/>)
            }
        </div>
    )
}
