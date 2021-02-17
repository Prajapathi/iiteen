import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import '../../../styles/subjectCard.css'
import {Link,useLocation,useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import {fetchPaper,fetchPreviousAnswers} from '../../../store/action/Paper'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: 'white'
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#448698',
    
  },
}))(LinearProgress);

export function SubjectCard(props) {
    let history = useHistory()
    const [paper,setPaper]=useState([])
    const [classNumber,setClassNumber]=useState()
    const [subject,setSubject]=useState()
    const [level,setLevel]=useState()
    const [chapter,setChapter]=useState()
    const [answers,setAnswers]=useState(0)
    const [totalAttemped,setTotalAttempted]=useState(0)
    const [progress,setProgress]=useState(0)

    useEffect(() => {
        setClassNumber(props.classNumber)

        let ch=props.number;
        if(props.number<10)
            ch="0"+props.number;
        setChapter(ch)

        let sub;
        if(props.subject=="physics")
            sub="Physics"
        else if(props.subject=="chemistry")
            sub="Chemistry"
        else
            sub="Maths"
        setSubject(sub)

        //fetch attempted answers to show in progress bar
        const db = firebase.firestore();
        db.collection("User").doc(props.user.uid).collection("SUBJECTWISEPapers").doc("Class "+props.classNumber).collection(sub).doc("Chapter "+ch).get()
        .then((doc)=> {
            if(doc.data()==null){
                setTotalAttempted(0)
                setProgress(0)
            }
            else{
                let totalQAttempted=0;
                let lvl1=doc.data()["Level 01"]
                let lvl2=doc.data()["Level 02"]
                let lvl3=doc.data()["Level 03"]
                console.log(lvl1,lvl2,lvl3)
                if(lvl1){
                    for(let i=0;i<lvl1.length;i++){
                        if(lvl1[i].isAnswered===true)
                            totalQAttempted++;
                    }
                }
                if(lvl2){
                    for(let i=0;i<lvl2.length;i++){
                        if(lvl2[i].isAnswered===true)
                            totalQAttempted++;
                    }
                }
                if(lvl3){
                    for(let i=0;i<lvl3.length;i++){
                        if(lvl3[i].isAnswered===true)
                            totalQAttempted++;
                    }
                }
                setAnswers(doc.data())
                setTotalAttempted(totalQAttempted)
                setProgress((totalQAttempted/75)*100)
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
            history.push("/QuestionsError");
        });
        
    }, [])

    const selectLevel=(lev)=>{
        setLevel(lev);
        console.log("ohh","Class "+classNumber,lev,subject,chapter)
        props.loadingStart(true)
        
        //set Previously given answers for this level
        if(answers["Level 0"+lev]){
            console.log("Yaha")
            props.fetchPreviousAnswers(answers["Level 0"+lev])
        }
        //Access question to pass as prop
        const db = firebase.firestore();
        db.collection("SUBJECTWISE").doc("Class "+classNumber).collection(subject).doc("Chapter "+chapter).collection("Level 0"+lev).orderBy("number").get()
        .then(function(querySnapshot) {
            let questions=[];
            querySnapshot.forEach(function(doc) {
                questions.push({...doc.data(),qid:doc.id})
            });
            console.log("k",questions)
            if(questions.length==0){
                history.push("/QuestionsError")
            }
            else{
                setPaper(questions)
                props.loadingStart(false)
                //put into redux store
                props.fetchPaper({questions,noOfQuestions:25,name:props.name, subject,level:lev,classNumber,chapter})

                //to check if user is navigating through SubjectCard
                localStorage.setItem("PaperName","Subjectwise")
                history.push("Subjectwise/Papers/"+chapter)
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
            history.push("/QuestionsError");
        });
    }

    return (
        <div className="flip-card subject-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div id="card-title">
                        <div style={{fontSize:'26px'}}>Chapter {props.number}</div>
                    </div> 
                    <div id="card-content">
                        <div style={{fontSize:'24px',color:'#448698'}}>{props.name}</div>
                        <div style={{width:'80%'}}>
                            <BorderLinearProgress variant="determinate" value={progress} style={{boxShadow:'1px 1px 3px 0px rgba(0,0,0,0.3)'}}/>
                            <div style={{color:'#448698',marginTop:'5px'}}> {totalAttemped}/75</div>
                        </div>
                    </div> 
                </div>
                <div className="flip-card-back">
                    <button onClick={()=>selectLevel(1)}><div style={{fontWeight:'800'}}>Level &nbsp; &nbsp; 1</div></button>
                    <button onClick={()=>selectLevel(2)}><div style={{fontWeight:'800'}}>Level &nbsp; &nbsp; 2</div></button>
                    <button onClick={()=>selectLevel(3)}><div style={{fontWeight:'800'}}>Level &nbsp; &nbsp; 3</div></button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.AuthReducer.user
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        fetchPaper:(paper)=>dispatch(fetchPaper(paper)),
        fetchPreviousAnswers:(answers)=>dispatch(fetchPreviousAnswers(answers))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SubjectCard)