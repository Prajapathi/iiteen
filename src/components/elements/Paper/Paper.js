import React from 'react'
import {Link,useLocation,useParams} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from '@material-ui/core/Badge';
import Question from './Question'



export default function Paper(props) {
    const location = useLocation();
    let {mol}=useParams()
    const [palleteSub,setPalleteSub]=React.useState(1);
    const [questions,setQuestions]=React.useState([])
    const [index,setIndex]=React.useState(0)
    
    React.useEffect(() => {
        console.log("Here",location.state.questions)
        setQuestions(location.state.questions)
    }, [])

    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0,marginLeft: 0, marginRight: 0}}>
            <div  noGutters style={{marginLeft: 0, marginRight: 0, display:'flex'}} >
                    <div style={{width:'80%'}} >
                        <Question key={index} question={questions[index]} number={questions[index]?questions[index].number:0} nextQuestion={()=>setIndex(index+1)}/>
                    </div>
                    <div style={{width:'20%'}}>

                        <div className="ques-pallete">

                            <div id="ques-pallete-sub">
                                <div className="subject-select" style={{background:palleteSub==1?'blue':'white'}} onClick={()=>setPalleteSub(1)}>Maths</div>
                                <div className="subject-select" style={{background:palleteSub==2?'blue':'white'}} onClick={()=>setPalleteSub(2)}>Chemistry</div>
                                <div className="subject-select" style={{background:palleteSub==3?'blue':'white'}} onClick={()=>setPalleteSub(3)}>Physics</div>
                            </div>

                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].map((text, index) => ( 
                                <div className="page-no" onClick={()=>setIndex(index)}>
                                    {index+1}
                                </div>
                            ))}

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
                                    <div className="color-code-box" style={{background:'#3B95C2'}}></div>
                                    <div className="color-code-text">: Attempted and Marked Questions</div>
                                </div>
                        </div>
                        </div>
                    </div>
            </div>
        </Container>
    )
}
