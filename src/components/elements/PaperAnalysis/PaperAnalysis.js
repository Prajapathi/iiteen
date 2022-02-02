import React, {useState} from 'react'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Link,useLocation,useParams,useHistory} from "react-router-dom";
import { Pie} from 'react-chartjs-2'
import BarGraph from './BarGraph'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../../styles/paperAnalysis.css'

const tagMap={
    physics:{
        0:"Mechanics-1",
        1: "Mechanics-2",
        2: "Magnetism and EMI",
        3: "Waves and Thermodynamics",
        4: "Optics and Modern Physics",
        5: "Electrostatics and current electricity"
    },
    chemistry:{
        0:"Organic Chemistry-11",
        1:"Physical Chemistry-11",
        2:"Inorganic Chemistry-11",
        3:"Organic Chemistry-12",
        4:"Physical Chemistry-12",
        5:"Inorganic Chemistry-12"
    },
    maths:{
        0:"Trignometry",
        1:"Calculus",
        2:"Algebra",
        3:"Coordinate Geometry",
        4:"Vectors and 3D Geometry"
    }
}

export function PaperAnalysis(props) {

    const location = useLocation();
    const history=useHistory();
    const markdistribution=[[3,1,0],[4,2,0],[3,1,0],[3,1,0]]

    let {paperType,paperName,mockpaperType}=useParams();
    let paperTypeCaps=paperType.toUpperCase()
    
    const [loading, setLoading] = useState(true)

    const [data,setData]=useState([])
    const [paperInfo,setPaperInfo]=useState([])
    const [percent, setPercent] = useState({physics:0,chemistry:0,maths:0})
    const [totalmarks,setTotalmarks]=useState(0);

    //function for rounding off numbers
    const roundOff=(num)=>{
        return Math.round( (num+ Number.EPSILON ) * 100 ) / 100
    }
    
    const blankData={
        labels: ['Not attempted'],
        datasets: [
            {
            data: [100],
            backgroundColor: [
                '#dedede',
            ]
            },
        ],
    }

    const marksDataChart = {
        labels: ['Physics', 'Chemistry', 'Maths'],
        datasets: [
            {
            data: [percent.physics,percent.chemistry,percent.maths],
            backgroundColor: [
                '#448498',
                '#FF4A4F',
                '#2AD586',
            ],
            borderColor: [
                'rgba(0, 0, 0, 0.1)',
                'rgba(0, 0, 0, 0.1)',
                'rgba(0, 0, 0, 0.1)',
            ],
            borderWidth: 1,
            },
        ],
    }

    const quesDataChart = {
        labels: ['Correct', 'Wrong'],
        datasets: [
        {
        data: data?
            (data.totalAttempted==0?[0,0]:[data.totalCorrect,(data.totalAttempted-data.totalCorrect)]):[],
            backgroundColor: [
                '#2AD586',
                '#FF4A4F',
            ],
            borderColor: [
                'rgba(0, 0, 0, 0.1)',
                'rgba(0, 0, 0, 0.1)',
                'rgba(0, 0, 0, 0.1)',
            ],
            borderWidth: 1,
            },
        ],
    }
    
    //data fetching
    React.useEffect(() => {

        console.log("props",props)
        let paperTypeRoute;
        switch(paperTypeCaps){
            case "MOCKTEST":
                paperTypeRoute="MOCK"
                break;
            case "PREVIOUSYEAR":
                paperTypeRoute="PREVIOUS"
            default :
                paperTypeRoute="undefined"
        }

        //if the URL does not have correct paper type
        if(paperTypeRoute=="undefined"){
            //404 page
            history.push('/')
        }

        const db = firebase.firestore();

        //Fetch the analysis of the attempted paper
        console.log(paperTypeRoute)
        db.collection("User").doc(props.user.uid).collection(paperTypeRoute+"Papers").doc(mockpaperType).collection("PAPER").doc(paperName).collection("LeaderBoard").doc("Analysis").get()
            .then(function(querySnapshot) {
                console.log("here's the analysis:",querySnapshot.data())
                setData(querySnapshot.data());
                if(querySnapshot.data()==null){
                    window.alert("Paper Does Not Exist!")
                    //404 page
                    history.push('/')
                }
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        
        //Fetch the details of the paper
        db.collection(paperTypeRoute).doc(mockpaperType).collection("PAPER").doc(paperName).get()
            .then(function(querySnapshot) {
                console.log("here's the paper:",querySnapshot.data())
                setPaperInfo(querySnapshot.data());
                if(querySnapshot.data()==null){
                    window.alert("Paper Does Not Exist!")
                    //404 page
                    history.push('/')
                }
                setLoading(false)
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        }, [])

    //Data calculation for pie chart after fetching
    React.useEffect(() => {
        //setting % marks
        console.log(paperInfo.sections,paperInfo.sections ? paperInfo.sections.length:0)
        let tm=0;
        let marksdistributiontype=0;
        for(let i=0;i<paperInfo.sections ? paperInfo.sections.length:0;i++){
            marksdistributiontype=paperInfo.sections[i].type=="singletype"?0:paperInfo.sections[i].type=='multipletype'?1:paperInfo.sections[i].type=='integertype'?2:3;
            console.log(marksdistributiontype)
            tm+=Number(paperInfo.sections[i].noofques)*markdistribution[marksdistributiontype][0];
        }
        console.log(3*tm)
        setTotalmarks(3*tm);
        let total=Math.abs(data.mathsMarks)+Math.abs(data.chemistryMarks)+Math.abs(data.physicsMarks);
        let p=0,c=0,m=0;
        if(total!==0){
            if(data.physicsMarks!==0){
                p=roundOff((data.physicsMarks/total)*100)
            }
            if(data.chemistryMarks!==0){
                c=roundOff((data.chemistryMarks/total)*100)
            }
            if(data.mathsMarks!==0){
                m=roundOff((data.mathsMarks/total)*100)
            }
        }
        setPercent({physics:p,chemistry:c,maths:m})

    }, [paperInfo])

    return (
        loading==true?
        <CircularProgress style={{margin:'25% 50%'}}/>:
        <div className="analysis-page">
            <div className="analysis-head">
                Report Card
            </div>
            <div className="report-card-section">
                    <div className="report-card">
                        <div className="report-card-heading">
                            <div>
                                Overall
                            </div>
                            <div>
                                {data.totalMarks}/{totalmarks}
                            </div>
                        </div>
                        <div className="report-card-sections">
                            
                                <div>
                                    Attempted
                                </div>
                                <div>
                                    {data.totalAttempted}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Total Questions
                                </div>
                                <div>
                                    {paperInfo.noOfQuestions}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Correct
                                </div>
                                <div>
                                    {data.totalCorrect}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Wrong
                                </div>
                                <div>
                                    {data.totalAttempted-data.totalCorrect}
                                </div>
                        </div>
                        
                        <div className="report-card-sections">
                                <div >
                                    Accuracy
                                </div>
                                <div>
                                    {data.totalAttempted==0?0:<>{roundOff((data.totalCorrect/data.totalAttempted)*100)}%</>}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                    {paperInfo.totalMarks==0?0:<>{roundOff((data.totalMarks/paperInfo.totalMarks)*100)}%</>}
                                </div>
                        </div>
                    </div>
                    <div className="report-card">
                        <div className="report-card-heading">
                            <div>
                                Physics
                            </div>
                            <div>
                                {data.physicsMarks}/{roundOff(paperInfo.totalMarks/3)}
                            </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Attempted
                                </div>
                                <div>
                                    {data.physicsAttempted}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Total Questions
                                </div>
                                <div>
                                    {paperInfo.noOfQuestions/3}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Correct
                                </div>
                                <div>
                                    {data.physicsCorrect}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Wrong
                                </div>
                                <div>
                                    {data.physicsAttempted-data.physicsCorrect}
                                </div>
                        </div>
                        
                        <div className="report-card-sections">
                                <div >
                                    Accuracy
                                </div>
                                <div>
                                    {data.physicsAttempted==0?0:<>{roundOff((data.physicsCorrect/data.physicsAttempted)*100)}%</>}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                    {paperInfo.totalMarks==0?0:<>{roundOff((data.physicsMarks/(paperInfo.totalMarks/3))*100)}%</>}
                                </div>
                        </div>
                    </div>
                    <div className="report-card">
                        <div className="report-card-heading">
                            <div>
                                Chemistry
                            </div>
                            <div>
                                {data.chemistryMarks}/{roundOff(paperInfo.totalMarks/3)}
                            </div>
                        </div>
                        <div className="report-card-sections">
                            
                                <div>
                                    Attempted
                                </div>
                                <div>
                                    {data.chemistryAttempted}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Total Questions
                                </div>
                                <div>
                                    {paperInfo.noOfQuestions/3}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Correct
                                </div>
                                <div>
                                    {data.chemistryCorrect}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Wrong
                                </div>
                                <div>
                                    {data.chemistryAttempted-data.chemistryCorrect}
                                </div>
                        </div>
                        
                        <div className="report-card-sections">
                                <div >
                                    Accuracy
                                </div>
                                <div>
                                    {data.chemistryAttempted==0?0:<>{roundOff((data.chemistryCorrect/data.chemistryAttempted)*100)}%</>}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                    {paperInfo.totalMarks==0?0:<>{roundOff((data.chemistryMarks/(paperInfo.totalMarks/3))*100)}%</>}
                                </div>
                        </div>
                    </div>
                    <div className="report-card">
                        <div className="report-card-heading">
                            <div>
                                Maths
                            </div>
                            <div>
                                {data.mathsMarks}/{roundOff(paperInfo.totalMarks/3)}
                            </div>
                        </div>
                        <div className="report-card-sections">
                            
                                <div>
                                    Attempted
                                </div>
                                <div>
                                    {data.mathsAttempted}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Total Questions
                                </div>
                                <div>
                                    {paperInfo.noOfQuestions/3}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Correct
                                </div>
                                <div>
                                    {data.mathsCorrect}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Wrong
                                </div>
                                <div>
                                    {data.mathsAttempted-data.mathsCorrect}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div >
                                    Accuracy
                                </div>
                                <div>
                                    {data.mathsAttempted==0?0:<>{roundOff((data.mathsCorrect/data.mathsAttempted)*100)}%</>}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                     {paperInfo.totalMarks==0?0:<>{roundOff((data.mathsMarks/(paperInfo.totalMarks/3))*100)}%</>}
                                </div>
                        </div>
                    </div>
            </div>
            <div className="analysis-head">
                Analysis
            </div>
            <div className="detailed-analysis-button-sec">
                <DescriptionOutlinedIcon id="detailed-analysis-button-icon"/>
                <br/>
                <Link to={`/${paperType}/Papers/Detailed_Analysis/`+paperName}>
                    <button className="detailed-analysis-button">
                        Detailed Analysis
                    </button>
                </Link>
            </div>

            <div className="analysis-section">

                <div id="marks-analysis">
                    Subjectwise Marks
                    <div className="analysis-sub-section">
                        <div id="analysis-chart">
                            <Pie data={(percent.physics==0&&percent.chemistry==0&&percent.maths==0)?blankData:marksDataChart}
                            options= {{legend: {display: false}}} />
                        </div>
                        <div id="analysis-chart-legend">
                            <div>Physics: {percent.physics}%</div>
                            <div style={{color:'#FF4A4F'}}>Chemistry: {percent.chemistry}%</div>
                            <div style={{color:'#2AD586'}}>Maths: {percent.maths}%</div>
                        </div>
                    </div>
                </div>

                <div id="legend">
                    <div id="legend-sub-sec">
                        <div className="legend-subject" style={{color:'#3B95C2'}}>
                            <div className="legend-circle" style={{background:'#3B95C2'}}></div>
                            Physics
                        </div>
                        <div className="legend-subject" style={{color:'#FF4A4F'}}>
                            <div className="legend-circle" style={{background:'#FF4A4F'}}></div>
                            Chemistry
                        </div>
                        <div className="legend-subject" style={{color:'#2AD586'}}>
                            <div className="legend-circle" style={{background:'#2AD586'}}></div>
                            Maths
                        </div>
                    </div>
                </div>

                <div id="time-analysis">
                    Question Distribution
                    <div className="analysis-sub-section">
                        <div id="analysis-chart-legend">
                            <div style={{color:'#2AD586'}}>
                                Correct: {data.totalAttempted==0?0
                                            :data.totalCorrect}
                            </div>
                            <div style={{color:'#FF4A4F'}}>
                                Wrong: {data.totalAttempted==0?0
                                            :data.totalAttempted-data.totalCorrect}
                            </div>
                        </div>
                        <div id="analysis-chart">
                            <Pie data={data.totalAttempted==0?blankData:quesDataChart}
                                options= {{legend: {display: false}}} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bar-section">
                {/* physics section */}
                <div className="subject-bar-card" style={{background:"#D8F3FD"}}>
                    <div className="subject-bar-card-bar-sec-head">Physics</div>
                    <div className="subject-bar-card-bar-wrapper">
                        <div className="subject-bar-card-bar-sec">
                            {
                                [0,1,2,3,4,5].map((index,i)=>(
                                    (data && data.physicsTags[i+'e'])?
                                        <BarGraph 
                                            correct={data.physicsTags[i+'a']==0?0:roundOff((data.physicsTags[i+'c']/data.physicsTags[i+'a'])*100)}
                                            wrong={data.physicsTags[i+'a']==0?0:100-roundOff((data.physicsTags[i+'c']/data.physicsTags[i+'a'])*100)}
                                            name={tagMap.physics[i]}
                                        />
                                        :null
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="subject-bar-card" style={{background:"#FCFDD8"}}>
                    <div className="subject-bar-card-bar-sec-head">Chemistry</div>
                    <div className="subject-bar-card-bar-wrapper">
                        <div className="subject-bar-card-bar-sec">
                            {
                                [0,1,2,3,4,5].map((index,i)=>(
                                    (data && data.chemistryTags[i+'e'])?
                                        <BarGraph 
                                            correct={data.chemistryTags[i+'a']==0?0:roundOff((data.chemistryTags[i+'c']/data.chemistryTags[i+'a'])*100)}
                                            wrong={data.chemistryTags[i+'a']==0?0:100-roundOff((data.chemistryTags[i+'c']/data.chemistryTags[i+'a'])*100)}
                                            name={tagMap.chemistry[i]}
                                        />
                                        :null
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="subject-bar-card" style={{background:"#FDEDD8"}}>
                    <div className="subject-bar-card-bar-sec-head">Mathematics</div>
                    <div className="subject-bar-card-bar-wrapper">
                        <div className="subject-bar-card-bar-sec">
                            {
                                [0,1,2,3,4,5].map((index,i)=>(
                                    (data && data.mathsTags[i+'e'])?
                                        <BarGraph 
                                            correct={data.mathsTags[i+'a']==0?0:roundOff((data.mathsTags[i+'c']/data.mathsTags[i+'a'])*100)}
                                            wrong={data.mathsTags[i+'a']==0?0:100-roundOff((data.mathsTags[i+'c']/data.mathsTags[i+'a'])*100)}
                                            name={tagMap.maths[i]}
                                        />
                                        :null
                                ))
                            }
                        </div>
                    </div>
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


export default connect(mapStateToProps)(PaperAnalysis)