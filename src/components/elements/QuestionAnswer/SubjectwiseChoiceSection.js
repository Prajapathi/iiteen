import React, { useState } from 'react';
import '../../../styles/choiceSection.css'
import Badge from '@material-ui/core/Badge';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

export default function ChoiceSection() {
    const [showSolution, setShowSolution] = useState(false);
    return (
            <div className="ans-sec">
                <div className="option-sec">
                    <div className="heading">
                        Multiple Correct Question
                    </div>
                    <div className="options">
                        {['Pressure', 'Strain', 'Compressibility','Forccn'].map((text, index) => ( 
                            <div className="option"> {index===0?'A':(index===1?'B':(index===2?'C':'D'))}. {"  "+text } </div>
                        ))}
                    </div>
                    <div className="submit">
                        <button style={{background:'rgba(180,180,180)'}}>Skip</button>
                        <button style={{background:'#18d618'}} onClick={()=>{setShowSolution(true)}}>Submit</button>
                    </div>
                </div>
                <div className="ans-sub-sec">
                    <div style={{display:'flex',margin:'5%'}}>
                        <ReportProblemOutlinedIcon style={{color:'#A6A5A5'}}/>
                        <BookmarkIcon style={{color:'#A6A5A5',marginLeft:'8px'}}/>
                        </div>
                    <div className="ques-pallete" style={{height:'200px'}}>
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((text, index) => ( 
                            <div className="page-no" >
                                {/* <Badge color="error" anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }} variant="dot"> {index+1 } 
                                </Badge> */}{index+1}
                            </div>
                        ))}
                    </div>
                    {showSolution===true?
                    <div className="solution">
                        <h5 style={{textAlign:'center',color:'green',marginBottom:'8px'}}>Solution</h5>
                        this is the solution to the given problem. you can check it out here:www.google.com. This is the solution of subject-wise problem;
                    </div>:null}
                </div>
            </div>
    )
}
