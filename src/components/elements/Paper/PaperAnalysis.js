import React, {useState} from 'react'
import firebase from 'firebase'
import {useLocation,useParams,useHistory} from "react-router-dom";
import { Pie } from 'react-chartjs-2'
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../../styles/paperAnalysis.css'


const dataPie = {
    labels: ['Physics', 'Chemistry', 'Maths'],
    datasets: [
    {
      label: '# of Votes',
      data: [40, 50, 10],
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

export default function PaperAnalysis(props) {

    const location = useLocation();
    const history=useHistory();
    let {paperType,paperName}=useParams();

    const [loading, setLoading] = useState(true)

    const [data,setData]=useState([])
    const [paperInfo,setPaperInfo]=useState([])

    React.useEffect(() => {
        const db = firebase.firestore();
        db.collection("User").doc(paperName).collection("Leaderboard").doc("Analysis").get()
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
        let paperTypeRoute=paperType=="MockTest"?"MOCK":"User"
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
                                    0
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                    0
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
                                    0
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                    {(data.physicsCorrect/data.totalMarks)*100}%
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
                                    {data.chemistryAttempted}
                                </div>
                        </div>
                        
                        <div className="report-card-sections">
                                <div >
                                    Accuracy
                                </div>
                                <div>
                                    0
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                    {(data.chemistryCorrect/data.totalMarks)*100}%
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
                                    0
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Percentage
                                </div>
                                <div>
                                    {(data.mathsCorrect/data.totalMarks)*100}%
                                </div>
                        </div>
                    </div>
            </div>
            <div className="analysis-head">
                Analysis
            </div>
            <div className="analysis-section">
                <div id="marks-analysis">
                    Subjective Marks
                    <div className="analysis-sub-section">
                        <div id="analysis-chart">
                            <Pie data={dataPie}
                            options= {{legend: {display: false}}} />
                        </div>
                        <div id="analysis-chart-legend">
                            <div>Physics- 25%</div>
                            <div style={{color:'#FF4A4F'}}>Chemistry- 25%</div>
                            <div style={{color:'#2AD586'}}>Maths- 25%</div>
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
                    Time Devoted
                    <div className="analysis-sub-section">
                        <div id="analysis-chart-legend">
                            <div>Physics- 25%</div>
                            <div style={{color:'#FF4A4F'}}>Chemistry- 25%</div>
                            <div style={{color:'#2AD586'}}>Maths- 25%</div>
                        </div>
                        <div id="analysis-chart">
                            <Pie data={dataPie}
                            options= {{legend: {display: false}}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
