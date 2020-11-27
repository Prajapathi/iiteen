import React from 'react'
import firebase from 'firebase'
import {Link,useLocation,useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import PaperInfo from './elements/PaperInfo'
import Questions from './Questions'
import InstructionInfo from './elements/InstructionInfo'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap:'wrap',
    margin:'50px auto',
    justifyContent:'flex-start',
    border:'2px solid black',
    width:'80%'
  },
  textField: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2),
    maxWidth: 150,
    minWidth:150
  },
}));


export default function Paper() {
    const classes = useStyles();
    const [numberQ,setNumberQ]=React.useState(0)
    const [paperInfo,setPaperInfo]=React.useState([]);
    const [instructionInfo,setInstructionInfo]=React.useState([]);
    const [subjectiveClass,setSubjectiveClass]=React.useState();
    const [loading,setLoading]=React.useState(false)
    const [showQuestion,setShowQuestion]=React.useState(false)
    const [refid,setRefid]=React.useState()
    const [paperRoute,setpaperRoute]=React.useState()
    const [pSaveName,setpSaveName]=React.useState()
    const [sectionNo,setSectionNo]=React.useState(0)
    const [secQNo,setSecQNo]=React.useState(0)
    const [allowSec,setAllowSec]=React.useState(false)
    const [sections,setSections]=React.useState(['','','']);
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
    
    React.useEffect(()=>{
        let arr=[];
        for(let i=0;i<Number(sectionNo);i++){
            arr.push({section:"",numberOfQuestions:0,marks:0,negative:0});
        }
        setSections(arr)
    },[sectionNo])

    React.useEffect(()=>{
        let num=0;
        let allow=true;
        for(let i=0;i<Number(sectionNo);i++){
            num+=Number(sections[i].numberOfQuestions)
            if(sections[i].numberOfQuestions==0||sections[i].section==""||sections[i].marks==0){
                allow=false;
            }
        }
        setAllowSec(allow)
        setSecQNo(num);
    },[sections])

    const setSectionInfo=(index,data,type)=>{
        let secTemp=[...sections]
        secTemp[index][type]=data;
        setSections(secTemp)
    }
    
    const addPaper=()=>{
        if((3*secQNo)!=paperInfo.noOfQuestions){
            window.alert("Please enter number of questions in respective sections correctly.")
            return;
        }
        if(allowSec==false){
            window.alert("Please fill all details about sections correctly.")
            return;
        }
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
                
                <div style={{width:"80%",margin:"100px 10%",padding:"20px",border:"2px dashed black",background:"#EEEFED"}}>
                    <TextField
                        id="standard-select-currency"
                        type="number"
                        label="Select"
                        value={sectionNo}
                        onChange={(event) =>event.target.value>=0?setSectionNo(event.target.value):null}
                        helperText="Number of Sections"
                        InputProps={{
                                            inputProps: { 
                                                min: 1
                                            }
                                    }}
                     />
                                
                    {   
                        //sectionNo==1?
                            sections.map((item,index)=>
                                <div style={{width:"80%",padding:"20px",margin:"20px 10%"}}>
                                    {index+1}
                                    <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select section"
                                    className={classes.textField}
                                    value={sections[index]?sections[index].section:null}
                                    onChange={(event) =>setSectionInfo(index,event.target.value,"section")}
                                    >
                                        <MenuItem value="1"> Integer</MenuItem>
                                        <MenuItem value="2"> Numerical</MenuItem>
                                        <MenuItem value="3"> Single Correct</MenuItem>
                                        <MenuItem value="4"> Multiple Correct</MenuItem>
                                        <MenuItem value="5"> Paragraph</MenuItem>
                                    </TextField>

                                    <TextField
                                        id="standard-number"
                                        type="number"
                                        label="No. of Questions"
                                        className={classes.textField}
                                        value={sections[index]?sections[index].numberOfQuestions:null}
                                        InputProps={{
                                            inputProps: { 
                                                min: 1
                                            }
                                        }}
                                        onChange={(event) =>event.target.value>=0?setSectionInfo(index,event.target.value,"numberOfQuestions"):null}
                                    />

                                    <TextField
                                        id="standard-number"
                                        type="number"
                                        label="Marks"
                                        className={classes.textField}
                                        value={sections[index]?sections[index].marks:null}
                                        InputProps={{
                                            inputProps: { 
                                                min: 1
                                            }
                                        }}
                                        onChange={(event) =>event.target.value>=0?setSectionInfo(index,event.target.value,"marks"):null}
                                    />

                                    <TextField
                                    id="standard-number"
                                    type="number"
                                    label="Negative Marking"
                                    className={classes.textField}
                                    value={sections[index]?sections[index].negative:null}
                                    InputProps={{
                                        inputProps: { 
                                            min: 1
                                        }
                                    }}
                                    onChange={(event) =>event.target.value>=0?setSectionInfo(index,event.target.value,"negative"):null}
                                    />
                                    <br/>
                                </div>
                            )
                        // :sectionNo==2?
                        //             [1,2].map((item,index)=>
                        //                 "op"
                        //             )
                        //             :sectionNo==3?
                        //                 [1,2,3].map((item,index)=>
                        //                     "op"
                        //                 )
                        //                 :null
                    }
                </div>

                {
                    !(location.state?location.state.subjective:null)?<InstructionInfo paperType={paperInfo.paperType} sendInfo={setInstructionInfo}/>:null
                }
                    {(paperInfo.name==''||paperInfo.totalDuration==''||paperInfo.totalMarks==''||paperInfo.noOfQuestions==''||(Number(paperInfo.noOfQuestions)%3)!=0)?
                        null:
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
                    }
                </>:<Questions subjective={location.state.subjective} sectionInfo={sections} paperType={location.state.paperType} paperRoute={paperRoute} pname={pSaveName} paperRef={refid}/>)
            }
        </div>
    )
}
