import React, {useState} from 'react'
import firebase from 'firebase'
import {useLocation,useParams,useHistory} from "react-router-dom";
import { Pie, Bar } from 'react-chartjs-2'
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../../styles/paperAnalysis.css'




export default function PaperAnalysis(props) {

    const location = useLocation();
    const history=useHistory();
    let {paperType,paperName}=useParams();

    const [loading, setLoading] = useState(true)

    const [data,setData]=useState([])
    const [paperInfo,setPaperInfo]=useState([])

    const [percent, setPercent] = useState({physics:0,chemistry:0,maths:0})

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
        data: data?(data.totalAttempted==0?[0,0]:[data.totalCorrect/data.totalAttempted,1-(data.totalCorrect/data.totalAttempted)]):[],
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
    const dataBar = {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
            label: 'Correct',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgb(255, 99, 132)',
            },
            {
            label: 'Incorrect',
            data: [2, 3, 20, 5, 1, 4],
            backgroundColor: 'rgb(54, 162, 235)',
            },
        ],
    }

    
    //data fetching
    React.useEffect(() => {
        const db = firebase.firestore();
        console.log("ppp",paperName)
        db.collection("User").doc(paperName).collection("LeaderBoard").doc("Analysis").get()
            .then(function(querySnapshot) {
                console.log("here's the analysis:",querySnapshot.data())
                setData(querySnapshot.data());
                if(querySnapshot.data()==null){
                    window.alert("Paper Does Not Exist!")
                    history.push('/')
                }
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        let paperTypeRoute=paperType=="MockTest"?"MOCK":"Undefined"
        db.collection(paperTypeRoute).doc(paperName).get()
            .then(function(querySnapshot) {
                console.log("here's the paper:",querySnapshot.data())
                setPaperInfo(querySnapshot.data());
                if(querySnapshot.data()==null){
                    window.alert("Paper Does Not Exist!")
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
        let total=Math.abs(data.mathsMarks)+Math.abs(data.chemistryMarks)+Math.abs(data.physicsMarks);
        let p=0,c=0,m=0;
        if(data.totalMarks!==0){
            if(data.physicsMarks!==0){
                p=(data.physicsMarks/data.totalMarks)
            }
            if(data.chemistryMarks!==0){
                c=(data.chemistryMarks/data.totalMarks)
            }
            if(data.mathsMarks!==0){
                m=(data.mathsMarks/data.totalMarks)
            }
        }
        setPercent({physics:p,chemistry:c,maths:m})

    }, [paperInfo])

    return (
        loading==true?
        <CircularProgress style={{margin:'25% 50%'}}/>:
        <div>
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
                                {data.totalMarks}/{paperInfo.totalMarks}
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
                                    {data.totalAttempted==0?0:<>{(data.totalCorrect/data.totalAttempted)*100}%</>}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                    {paperInfo.totalMarks==0?0:<>{(data.totalMarks/paperInfo.totalMarks)*100}%</>}
                                </div>
                        </div>
                    </div>
                    <div className="report-card">
                        <div className="report-card-heading">
                            <div>
                                Physics
                            </div>
                            <div>
                                {data.physicsMarks}/{paperInfo.totalMarks/3}
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
                                    {data.physicsAttempted==0?0:<>{(data.physicsCorrect/data.physicsAttempted)*100}%</>}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                    {paperInfo.totalMarks==0?0:<>{(data.physicsMarks/(paperInfo.totalMarks/3))*100}%</>}
                                </div>
                        </div>
                    </div>
                    <div className="report-card">
                        <div className="report-card-heading">
                            <div>
                                Chemistry
                            </div>
                            <div>
                                {data.chemistryMarks}/{paperInfo.totalMarks/3}
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
                                    {data.chemistryAttempted==0?0:<>{(data.chemistryCorrect/data.chemistryAttempted)*100}%</>}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                    {paperInfo.totalMarks==0?0:<>{(data.chemistryMarks/(paperInfo.totalMarks/3))*100}%</>}
                                </div>
                        </div>
                    </div>
                    <div className="report-card">
                        <div className="report-card-heading">
                            <div>
                                Maths
                            </div>
                            <div>
                                {data.mathsMarks}/{paperInfo.totalMarks/3}
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
                                    {data.mathsAttempted==0?0:<>{(data.mathsCorrect/data.mathsAttempted)*100}%</>}
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                     {paperInfo.totalMarks==0?0:<>{(data.mathsMarks/(paperInfo.totalMarks/3))*100}%</>}
                                </div>
                        </div>
                    </div>
            </div>
            <div className="analysis-head">
                Analysis
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
                    <div style={{color:'#3B95C2'}}>
                        <div className="legend-circle" style={{background:'#3B95C2'}}></div>
                        Physics
                    </div>
                    <div style={{color:'#FF4A4F'}}>
                        <div className="legend-circle" style={{background:'#FF4A4F'}}></div>
                        Chemistry
                    </div>
                    <div style={{color:'#2AD586'}}>
                        <div className="legend-circle" style={{background:'#2AD586'}}></div>
                        Maths
                    </div>
                </div>

                <div id="time-analysis">
                    Question Distribution
                    <div className="analysis-sub-section">
                        <div id="analysis-chart-legend">
                            <div style={{color:'#2AD586'}}>Correct: {data.totalAttempted==0?0:data.totalCorrect/data.totalAttempted}%</div>
                            <div style={{color:'#FF4A4F'}}>Wrong: {data.totalAttempted==0?0:1-(data.totalCorrect/data.totalAttempted)}%</div>
                        </div>
                        <div id="analysis-chart">
                            <Pie data={data.totalAttempted==0?blankData:quesDataChart}
                                options= {{legend: {display: false}}} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bar-section">
                <div className="subject-bar-card">
                        <Bar data={dataBar}  />
                </div>
                <div className="subject-bar-card">
                        <Bar data={dataBar}  />
                </div>
                <div className="subject-bar-card">
                        <Bar data={dataBar}/>
                </div>
            </div>
        </div>
    )
}
