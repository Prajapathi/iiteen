import React from 'react'
import {Link,useLocation,useHistory,useParams} from "react-router-dom";
import firebase from 'firebase'
import {connect} from 'react-redux'
import {setNewAttemptTime} from '../../../store/action/Paper'
import '../../../styles/choiceSection.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CloseIcon from '@material-ui/icons/Close';
import Question from '../QuestionAnswer/Question'
import PaperInstruction from './Instructions/PaperInstruction'
import GeneralInstruction from './Instructions/GeneralInstruction'
import Timer from './Timer'
import PaperSummary from './PaperSummary'




export function Paper(props) {
    const location = useLocation();
    const history= useHistory();
    let {paperType,paperName,mockpaperType}=useParams();
    paperType=paperType.toUpperCase()
    const [palleteSub,setPalleteSub]=React.useState(1);
    const [palleteArray,setPalleteArray]=React.useState({phy:[],maths:[],chem:[]})
    const [questions,setQuestions]=React.useState()
    const [index,setIndex]=React.useState(0)
    const [showPaperInst,setShowPaperInst]=React.useState(false);
    const [start,setStart]=React.useState(false)
    const [showSummary,setShowSummary]=React.useState(false)
    const [timeOver,setTimeOver]=React.useState(false)
    const markdistributionbyanswertype=[[4,0,0],[2,0,0],[],[3,1,0],[4,2,0]]

    React.useEffect(() => {
        console.log("Yaha aaya",props)
        //if user is not navigating through Cards then redirect to home
        let verifyPaper=localStorage.getItem("PaperName")
        console.log(localStorage.getItem("PaperName"),verifyPaper,props.paper,`PAPER${props.paper.number}`)
        if(verifyPaper==null|| verifyPaper!=`PAPER${props.paper.number}`){
            console.log("Because of this")
            history.push('/mocktest')
        }
        localStorage.removeItem("PaperName")

        setQuestions(props.paper.questions)
        const a=[];
        for(let i=0;i<(props.paper.noOfQuestions)/3;i++){
            a.push(0)
        }
        const t={
            maths:a,
            chem:a,
            phy:a
        }
        setPalleteArray(t);

        if(props.storeAnswers==true && props.time==null)
            props.setNewAttemptTime()

    }, [])

    //function to change subject if the user enters next subject using "Submit and next" button
    React.useEffect(() => {
        if(index==0||index==(props.paper.noOfQuestions/3)-1)
            setPalleteSub(1)
        else if(index==(props.paper.noOfQuestions)/3||index==(2*props.paper.noOfQuestions/3)-1)
            setPalleteSub(2)
        else if (index==(2*props.paper.noOfQuestions)/3||index==(props.paper.noOfQuestions-1))
            setPalleteSub(3)
    }, [index])


    //Auto-submit on time over
    React.useEffect(() => {
        if(timeOver){
            submitPaperFinal()
        }
    }, [timeOver])

    const navigateQuestion=(ind)=>{
        if(palleteSub==1){
            setIndex(ind)
        }
        else if(palleteSub==2){
            setIndex((props.paper.noOfQuestions/3)+ind)
        }
        else
            setIndex((2*props.paper.noOfQuestions/3)+ind)
    }

    const submitPaperFinal=()=>{
        console.log("props.answers",props.answers)
        const UserQuestionModel={
            answers:props.answers,
            quid:`PAPER${props.paper.number}`,
            attempted:true
        }
        let paperTypeRoute;
        switch(paperType){
            case "MOCKTEST":
                paperTypeRoute="MOCKPapers"
                break;
            case "PREVIOUSYEAR":
                paperTypeRoute="PREVIOUSPapers"
                break;
            case "AITSTEST":
                paperTypeRoute="AITSPapers"
                break;
                default:
        paperTypeRoute = "undefined";
        }
        const db = firebase.firestore();
        const paperRef = db.collection("User").doc(props.user.uid).collection(paperTypeRoute).doc(`${props.paper.sections?"ADVANCE":"MAINS"}`).collection("PAPER").doc(`PAPER${props.paper.number}`)
            .set(UserQuestionModel)
            .then((res)=>{
                let marks = 0;
                let chemistryMarks = 0;
                let physicsMarks = 0;
                let mathsMarks = 0;
                let totalAttempted = 0;
                let totalCorrect = 0;
                let physicsAttempted = 0;
                let physicsCorrect = 0;
                let chemistryAttempted = 0;
                let chemistryCorrect = 0;
                let mathsAttempted = 0;
                let mathsCorrect = 0;
                let physicsTags = {
                    '1c': 0,
                    '1a': 0,
                    '1e':false,
                    '0c': 0,
                    '0a': 0,
                    '0e':false,
                    '2c': 0,
                    '2a': 0,
                    '2e':false,
                    '3c': 0,
                    '3a': 0,
                    '3e':false,
                    '4c': 0,
                    '4a': 0,
                    '4e':false,
                    '5c': 0,
                    '5a': 0,
                    '5e':false
                };
                let chemistryTags = {
                    '1c': 0,
                    '1a': 0,
                    '1e':false,
                    '0c': 0,
                    '0a': 0,
                    '0e':false,
                    '2c': 0,
                    '2a': 0,
                    '2e':false,
                    '3c': 0,
                    '3a': 0,
                    '3e':false,
                    '4c': 0,
                    '4a': 0,
                    '4e':false,
                    '5c': 0,
                    '5a': 0,
                    '5e':false
                };
                let mathsTags = {
                    '1c': 0,
                    '1a': 0,
                    '1e':false,
                    '0c': 0,
                    '0a': 0,
                    '0e':false,
                    '2c': 0,
                    '2a': 0,
                    '2e':false,
                    '3c': 0,
                    '3a': 0,
                    '3e':false,
                    '4c': 0,
                    '4a': 0,
                    '4e':false,
                };
                console.log(props.answers,props)
                props.answers.map((item,i)=>{
                    console.log(props.paper.questions[i])

                    //set tag exists to true
                    switch(props.paper.questions[i].subject){
                        case 1:
                            physicsTags[props.paper.questions[i].tag+'e']=true;
                            break;
                        case 2:
                            chemistryTags[props.paper.questions[i].tag+'e']=true;
                            break;
                        case 3:
                            mathsTags[props.paper.questions[i].tag+'e']=true;
                            break;
                    }

                    //if attempted then calculate marks and increment attempted values
                    if(item.isAnswered){
                        totalAttempted++;
                        console.log(props.paper.questions[i].subject)
                        switch (Number(props.paper.questions[i].subject)) {
                            case 1:
                                console.log("got in 1")
                                physicsAttempted++;
                                physicsTags[props.paper.questions[i].tag+'a']++;

                                if(props.paper.questions[i].answerType=='5'){
                                    if(!item.isAnsweredWrong){
                                        physicsCorrect++;
                                        totalCorrect++;
                                        physicsMarks+=4;
                                        marks+=4;
                                        break;
                                    }
                                    let mar=0;
                                    for(let i=0;i<item.answerGiven.length;i++){
                                        if(item.answer.includes(item.answerGiven[i])){
                                            mar++;
                                        }else{
                                            mar=-2;
                                            break;
                                        }
                                    }
                                    physicsMarks+=mar;
                                        marks+=mar;
                                    break;
                                }

                                if(!item.isAnsweredWrong){
                                    physicsCorrect++;
                                    totalCorrect++;
                                    physicsMarks+=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][0] ;
                                    marks+=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][0] ;
                                    physicsTags[props.paper.questions[i].tag+'c']++;
                                }
                                else{
                                    physicsMarks-=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][1] ;
                                    marks-=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][1] ;
                                }
                                break;
                            case 2:
                                console.log("got in 2")
                                chemistryAttempted++;
                                chemistryTags[props.paper.questions[i].tag+'a']++;
                                if(props.paper.questions[i].answerType=='5'){
                                    if(!item.isAnsweredWrong){
                                        chemistryCorrect++;
                                        totalCorrect++;
                                        chemistryMarks+=4;
                                        marks+=4;
                                        break;
                                    }
                                    let mar=0;
                                    for(let i=0;i<item.answerGiven.length;i++){
                                        if(item.answer.includes(item.answerGiven[i])){
                                            mar++;
                                        }else{
                                            mar=-2;
                                            break;
                                        }
                                    }
                                    chemistryMarks+=mar;
                                        marks+=mar;
                                    break;
                                }
                                if(!item.isAnsweredWrong){
                                    totalCorrect++;
                                    chemistryCorrect++;
                                    chemistryMarks+=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][0] ;
                                    marks+=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][0] ;
                                    chemistryTags[props.paper.questions[i].tag+'c']++;
                                }
                                else{
                                    console.log(Number(props.paper.questions[i].answerType),markdistributionbyanswertype[Number(props.paper.questions[i].answerType)])
                                    chemistryMarks-=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][1] ;
                                    marks-=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][1] ;
                                }
                                break;
                            case 3:
                                console.log("got in 3")
                                mathsAttempted++;
                                mathsTags[props.paper.questions[i].tag+'a']++;
                                if(props.paper.questions[i].answerType=='5'){
                                    if(!item.isAnsweredWrong){
                                        mathsCorrect++;
                                        totalCorrect++;
                                        mathsMarks+=4;
                                        marks+=4;
                                        break;
                                    }
                                    let mar=0;
                                    for(let i=0;i<item.answerGiven.length;i++){
                                        if(item.answer.includes(item.answerGiven[i])){
                                            mar++;
                                        }else{
                                            mar=-2;
                                            break;
                                        }
                                    }
                                    mathsMarks+=mar;
                                        marks+=mar;
                                    break;
                                }
                                if(!item.isAnsweredWrong){
                                    totalCorrect++;
                                    mathsCorrect++;
                                    mathsMarks+=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][0] ;
                                    marks+=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][0] ;
                                    mathsTags[props.paper.questions[i].tag+'c']++;
                                }
                                else{
                                    mathsMarks-=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][1] ;
                                    marks-=markdistributionbyanswertype[Number(props.paper.questions[i].answerType)-1][1] ;
                                }
                                break;
                            default:
                        }
                    }
                })
                let Analysis={
                    totalMarks: marks,
                    totalAttempted: totalAttempted,
                    totalCorrect: totalCorrect,

                    ///tags
                    physicsTags: physicsTags,
                    chemistryTags: chemistryTags,
                    mathsTags: mathsTags,

                    ///physics
                    physicsCorrect: physicsCorrect,
                    physicsAttempted: physicsAttempted,
                    physicsMarks: physicsMarks,

                    ///chemistry
                    chemistryCorrect: chemistryCorrect,
                    chemistryAttempted: chemistryAttempted,
                    chemistryMarks: chemistryMarks,

                    ///maths
                    mathsCorrect: mathsCorrect,
                    mathsAttempted: mathsAttempted,
                    mathsMarks: mathsMarks,
                }

                //Send leaderboard and Analysis to User model
                console.log(Analysis)
                db.collection("User").doc(props.user.uid).collection(paperTypeRoute).doc(`${props.paper.sections?"ADVANCE":"MAINS"}`).collection("PAPER").doc(`PAPER${props.paper.number}`).collection("LeaderBoard").doc("Analysis")
                .set({...Analysis})
                .then((res)=>{
                    // window.alert("yo");
                    history.push({pathname:"Analysis/"+`PAPER${props.paper.number}`})
                })
                .catch((err)=>{
                    console.log("Error saving Leaderboard Analysis",err)
                })

            }).catch((error)=>{
                console.log("Error saving the document: ",error)
            }) 
    }

    return (
        !start?
        // //if start is false then display Marking scheme and General Instructions one by one
        (
            !showPaperInst?
            <>
            <GeneralInstruction setContinue={setShowPaperInst} mockpaperType={mockpaperType}/>
            {/* <Timer duration={1}/> */}
            </>
            :<PaperInstruction start={setStart} goToGeneralInst={()=>setShowPaperInst(false)} details={props.paper} inst={props.paper.sections}/>
        )
        :
        //after start is set to true, display individual questions
        <>
                <div className="timer-bar" style={{justifyContent:showSummary?"center":"space-between"}}>
                    <div>
                        <div style={{marginRight:'10px'}}>Time Remaining: </div>
                        <Timer duration={180} timeOver={setTimeOver}/>
                    </div>
                    {showSummary?
                        null:
                        <CloseIcon id="close-paper" onClick={()=>setShowSummary(true)}/>
                    }
                </div>
      
       { !showSummary?
        
                
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0,marginLeft: 0, marginRight: 0}}>
                <div  noGutters style={{marginLeft: 0, marginRight: 0, display:'flex'}} >

                        <div style={{width:'80%'}} >
                            <Question key={index} 
                                question={questions?questions[index]:[]}
                                noOfQuestions={props.paper.noOfQuestions}
                                number={questions && questions[index]?questions[index].number:0}
                                goToPrevQuestion={()=>setIndex(index-1)} 
                                goToNextQuestion={()=>setIndex(index+1)}
                                showSummary={()=>setShowSummary(true)}
                            />
                        </div>

                        <div style={{width:'20%'}}>
                            <div className="ques-pallete">
                                <div id="ques-pallete-sub">
                                    <div className="subject-select" style={{background:palleteSub==1?'#448698':'white',color:palleteSub==1?'white':'black'}} onClick={()=>setPalleteSub(1)}>Physics</div>
                                    <div className="subject-select" style={{background:palleteSub==2?'#448698':'white',color:palleteSub==2?'white':'black'}} onClick={()=>setPalleteSub(2)}>Chemistry</div>
                                    <div className="subject-select" style={{background:palleteSub==3?'#448698':'white',color:palleteSub==3?'white':'black'}} onClick={()=>setPalleteSub(3)}>Maths</div>
                                </div>
                                
                                {
                                    palleteSub==1?
                                     palleteArray.phy.map((text, ind) => ( 
                                            <div className="page-no" 
                                                style={{background:props.answers[ind].isAnswered?(props.answers[ind].isBookmarked?'#ff9700':'#2AD586')
                                                    :props.answers[ind].isBookmarked?'#3B95C2'
                                                    :props.answers[ind].isSeen?'#FF1E1E':'white',
                                                    border:index==ind?'1px solid black':null}} 
                                                onClick={()=>navigateQuestion(ind)}>
                                                {ind+1}
                                            </div>
                                        ))
                                        :palleteSub==2?
                                            palleteArray.phy.map((text, ind) => ( 
                                                <div className="page-no" 
                                                    style={{background:props.answers[(props.paper.noOfQuestions/3)+ind].isAnswered?(props.answers[(props.paper.noOfQuestions/3)+ind].isBookmarked?'#ff9700':'#2AD586')
                                                        :props.answers[(props.paper.noOfQuestions/3)+ind].isBookmarked?'#3B95C2'
                                                        :props.answers[(props.paper.noOfQuestions/3)+ind].isSeen?'#FF1E1E':'white',
                                                        border:index==(props.paper.noOfQuestions/3)+ind?'1px solid black':null}} 
                                                    onClick={()=>navigateQuestion(ind)}>
                                                    {ind+1}
                                                </div>
                                            ))
                                        :palleteArray.phy.map((text, ind) => ( 
                                                <div className="page-no" 
                                                    style={{background:props.answers[(2*props.paper.noOfQuestions/3)+ind].isAnswered?(props.answers[(2*props.paper.noOfQuestions/3)+ind].isBookmarked?'#ff9700':'#2AD586')
                                                        :props.answers[(2*props.paper.noOfQuestions/3)+ind].isBookmarked?'#3B95C2'
                                                        :props.answers[(2*props.paper.noOfQuestions/3)+ind].isSeen?'#FF1E1E':'white',
                                                        border:index==(2*props.paper.noOfQuestions/3)+ind?'1px solid black':null}} 
                                                    onClick={()=>navigateQuestion(ind)}>
                                                    {ind+1}
                                                </div>
                                        ))
                                }
                                

                            <div style={{margin:'5px 20px',fontSize:'14px',fontWeight:'500',color:'#2B5594'}}>
                                    The Questions Palette displayed will show the status of each question using one of the following symbols :
                            </div>
                            <div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <div className="color-code-box" style={{background:'white'}}></div>
                                        <div className="color-code-text">: Not Visited Questions</div>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <div className="color-code-box" style={{background:'#FF1E1E'}}></div>
                                        <div className="color-code-text">: Visited Questions but not Answered</div>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <div className="color-code-box" style={{background:'#2AD586'}}></div>
                                        <div className="color-code-text">: Attempted Questions</div>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <div className="color-code-box" style={{background:'#3B95C2'}}></div>
                                        <div className="color-code-text">: Marked for Review</div>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <div className="color-code-box" style={{background:'#ff9700'}}></div>
                                        <div className="color-code-text">: Attempted and Marked Questions</div>
                                    </div>
                            </div>
                            </div>
                        </div>
                </div>
            </Container>
            :<PaperSummary resume={setShowSummary} submit={submitPaperFinal} totalQ={props.paper.toBeAttempted} name={`PAPER${props.paper.number}`} answers={props.answers}/>}
        </>
    )
}
const mapStateToProps=(state)=>{
    return{
        paper:state.MockTestReducer.paper,
        answers:state.MockTestReducer.answers,
        time:state.MockTestReducer.time,
        storeAnswers:state.MockTestReducer.storeAnswers,
        user:state.AuthReducer.user
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        setNewAttemptTime:()=>dispatch(setNewAttemptTime())
    }
}   


export default connect(mapStateToProps,mapDispatchToProps)(Paper)