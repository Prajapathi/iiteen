import React, { useState,useEffect } from 'react';
import '../../../styles/choiceSection.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Badge from '@material-ui/core/Badge';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

export default function ChoiceSection(props) {
    const [palleteSub,setPalleteSub]=React.useState(1);
    const [selectOpt,setSelectOpt]=React.useState([false,false,false,false])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeOptSingle=(ind)=>{
        const opts=[false,false,false,false];
        opts[ind]=!selectOpt[ind];
        setSelectOpt(opts)
    }

    const changeOptMultiple=(ind)=>{
        const opts=[false,false,false,false];
        for(let i=0;i<4;i++){
            if(ind==i)
                opts[i]=!selectOpt[i]
            else
                opts[i]=selectOpt[i]
        }
        setSelectOpt(opts)
    }

    return(
        <>
        <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Row noGutters >
                <Col id="choice-sec">
                     <div id="instruction-ques-box" onClick={handleShow}>
                         Instructions
                         <ZoomOutMapIcon id="instruction-zoom"/>
                     </div>

                     <div className="heading">
                         Multiple Correct Question
                        <div >
                            <ReportProblemOutlinedIcon style={{color:'#A6A5A5'}}/>
                            <BookmarkIcon style={{color:'#A6A5A5',marginLeft:'8px'}}/>
                        </div>
                     </div>

                     <div className="options">
                         {['Pressure', 'Strain', 'Compressibility','Forccn'].map((text, index) => ( 
                            <div className="option"
                                 onClick={()=>changeOptMultiple(index)}
                                 style={{border:selectOpt[index]==true?'2px solid rgb(59, 149, 194)':'1px solid white'}}
                            > 
                                    {index===0?'A':(index===1?'B':(index===2?'C':'D'))}. {"  "+text }
                            </div>
                        ))}
                    </div>

                    <div className="submit">
                        <button style={{background:'rgba(180,180,180)'}} onClick={()=>props.nextQuestion()}>Skip</button>
                        <button style={{background:'#18d618'}} >Submit</button>
                    </div>

                </Col>

                {/* <Col xs={4} id="pallete-sec">

                    <div className="ques-pallete">

                         <div id="ques-pallete-sub">
                             <div className="subject-select" style={{background:palleteSub==1?'blue':'white'}} onClick={()=>setPalleteSub(1)}>Maths</div>
                             <div className="subject-select" style={{background:palleteSub==2?'blue':'white'}} onClick={()=>setPalleteSub(2)}>Chemistry</div>
                             <div className="subject-select" style={{background:palleteSub==3?'blue':'white'}} onClick={()=>setPalleteSub(3)}>Physics</div>
                         </div>

                         {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].map((text, index) => ( 
                            <div className="page-no" >
                                {index+1}
                            </div>
                        ))}

                       <div style={{margin:'5px 20px',fontSize:'14px',fontWeight:'500',color:'#2B5594'}}>
                            The Questions Palette displayed will show the status of each question using one of the following symbols :
                        </div>
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
                </Col> */}
            </Row>
        </Container>

        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Instructions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Section Name</h4>
                <p>
                    This is custom instruction fetched on section number basis.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
    </Modal>
    </>
    )
}
