import React,{useState,useEffect} from 'react'
import '../../../styles/paperSummary.css'

export default function PaperSummary(props) {

    const [attempted, setAttempted] = useState(0)
    const [skipped,setSkipped]=useState(0)
    const [bookmarked, setBookmarked] = useState(0)

    useEffect(() => {
        let a=0,s=0,b=0;
        for(let i=0;i<props.answers.length;i++){
            if(props.answers[i].isAnswered==true)
                a++;
            else if(props.answers[i].isSeen==true)
                s++;
            if(props.answers[i].isBookmarked==true)
                b++;
        }
        setAttempted(a);
        setSkipped(s);
        setBookmarked(b);
    }, [props.answers])
    return (
        <div id="paper-summary">
            <div id="summary-name">{props.name}</div>
            <hr/>
            <div id="time">Time Remaining:</div>
            <div id="paper-summary-detail">
                <div className="summary-detail">
                    <div className="summary-detail-head">
                        Attempted
                    </div>
                    <div className="summary-detail-info">
                        {attempted}
                    </div>
                </div>
                <hr/>
                <div className="summary-detail">
                    <div className="summary-detail-head">
                        Not-Attempted
                    </div>
                    <div className="summary-detail-info">
                        {props.answers.length-attempted}
                    </div>
                </div>
                <hr/>
                <div className="summary-detail">
                    <div className="summary-detail-head">
                        Skipped
                    </div>
                   <div className="summary-detail-info">
                        {skipped}
                    </div>
                </div>
                <hr/>
                <div className="summary-detail">
                    <div className="summary-detail-head">
                        Bookmarks
                    </div>
                    <div className="summary-detail-info">
                        {bookmarked}
                    </div>
                </div>
                <hr/>
            </div>
            <div id="summary-button">
                <button onClick={()=>props.resume(false)} style={{background:'#2CD0AE'}}>Resume</button>
                <button onClick={props.submit} style={{background:'#0998B9'}}>Submit</button>
            </div>
        </div>
    )
}
