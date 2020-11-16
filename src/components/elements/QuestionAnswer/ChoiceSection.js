import React, { useState,useEffect } from 'react';
import '../../../styles/choiceSection.css'
import Badge from '@material-ui/core/Badge';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

export default function ChoiceSection() {
    const [palleteSub,setPalleteSub]=React.useState(1);
    const [selectOpt,setSelectOpt]=React.useState([false,false,false,false])
    

    const changeOptSingle=(ind)=>{
        const opts=[false,false,false,false];
        opts[ind]=true;
        setSelectOpt(opts)
        console.log(opts)
    }
    useEffect(() => {
        
    }, [palleteSub])
    return (
            <div className="ans-sec">
                
                <div className="option-sec">
                    <div style={{boxShadow:'1px 1px 4px 1px gray',width:'177.5%',padding:'5px 10px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        Instructions
                        <ArrowDropDownIcon style={{fontSize:'42px'}}/>
                    </div>
                    <div className="heading">
                        Multiple Correct Question
                    </div>
                    <div className="options">
                        {['Pressure', 'Strain', 'Compressibility','Forccn'].map((text, index) => ( 
                            <div className="option" onClick={()=>console.log(index)} style={{border:selectOpt[index]?'blue':'white'}}> 
                                    {index===0?'A':(index===1?'B':(index===2?'C':'D'))}. {"  "+text }
                            </div>
                        ))}
                    </div>
                    <div className="submit">
                        <button style={{background:'rgba(180,180,180)'}}>Skip</button>
                        <button style={{background:'#18d618'}} >Submit</button>
                    </div>
                </div>
                <div className="ans-sub-sec">
                    <div style={{display:'flex',margin:'6.5% 5%'}}>
                        <ReportProblemOutlinedIcon style={{color:'#A6A5A5'}}/>
                        <BookmarkIcon style={{color:'#A6A5A5',marginLeft:'8px'}}/>
                        </div>
                    <div className="ques-pallete">
                        <div style={{display:'flex',width:'90%',justifyContent:'space-evenly',margin:'5px 0px'}}>
                            <div className="subject-select" style={{background:palleteSub==1?'blue':'white'}} onClick={()=>setPalleteSub(1)}>Maths</div>
                            <div className="subject-select" style={{background:palleteSub==2?'blue':'white'}} onClick={()=>setPalleteSub(2)}>Chemistry</div>
                            <div className="subject-select" style={{background:palleteSub==3?'blue':'white'}} onClick={()=>setPalleteSub(3)}>Physics</div>
                        </div>
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].map((text, index) => ( 
                            <div className="page-no" >
                                {/* <Badge color="error" anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }} variant="dot"> {index+1 } 
                                </Badge> */}{index+1}
                            </div>
                        ))}
                       <div style={{margin:'5px 20px',fontSize:'14px',fontWeight:'500',color:'#2B5594'}}> The Questions Palette displayed will show the status of each question using one of the following symbols :</div>
                       <div>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <div style={{height:'20px',width:'20px',borderRadius:'3px',background:'white'}}></div>
                                <div style={{margin:'5px',fontSize:'14px',fontWeight:'450',color:'#2B5594'}}>: Not Visited Questions</div>
                            </div>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <div style={{height:'20px',width:'20px',borderRadius:'3px',background:'#FF1E1E'}}></div>
                                <div style={{margin:'5px',fontSize:'14px',fontWeight:'450',color:'#2B5594'}}>: Visited Questions but not Answered</div>
                            </div>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <div style={{height:'20px',width:'20px',borderRadius:'3px',background:'#2AD586'}}></div>
                                <div style={{margin:'5px',fontSize:'14px',fontWeight:'450',color:'#2B5594'}}>: Attempted Questions</div>
                            </div>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <div style={{height:'20px',width:'20px',borderRadius:'3px',background:'#3B95C2'}}></div>
                                <div style={{margin:'5px',fontSize:'14px',fontWeight:'450',color:'#2B5594'}}>: Marked for Review</div>
                            </div>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <Badge color="error" anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }} variant="dot" overlap="circle">
                                    <div style={{height:'20px',width:'20px',borderRadius:'3px',background:'#3B95C2'}}></div>
                                </Badge>
                                <div style={{margin:'5px',fontSize:'14px',fontWeight:'450',color:'#2B5594'}}>: Attempted and Marked Questions</div>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
    )
}
