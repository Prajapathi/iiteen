import React,{useState} from "react";
import { Link } from "react-router-dom";
import "../../../styles/AITS-carousel.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, IconButton } from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
import '../../../styles/AITSCarouselSlider.css'

export default function AITSCarouselSlider(props) {
  console.log(props);
  const [open,setOpen]=useState(false)

  function findMonthandDay(date) {
    return new Date(date).toDateString().substring(4, 10);
  }
  return (
    <div className="test-slider">
      {open && (
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
        //   id="class-select-dialog"  
            id="upcoming-test-dialog"
        >
            <IconButton
              onClick={()=>{setOpen(false)}}
            //   className="dialog-close-icon"
            id="upcoming-test-dialog-close"
            >
              <CloseIcon />
            </IconButton>
          <DialogTitle>
            {"Syllabus"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
            {props.paper.syllabustype == "class 11" ? (
          <>
            <li>It is a Part-Test</li>
            <li>Covering Class-11th Syllabus</li>
          </>
        ) : props.paper.syllabustype == "class 12" ? (
          <>
            <li>It is a Part-Test</li>
            <li>Covering Class-12th Syllabus</li>
          </>
        ) : props.paper.syllabustype == "partsyllabus" ? (
          <>
            <li>It is a Part-Test</li>
            <li>Physics: {props.paper.phy.map((item)=>(
                <span className="dialog-syllabus-chapters">{item}</span>
            ))}</li>
            <li>Chemistry: {props.paper.che.map((item)=>(
                <span className="dialog-syllabus-chapters">{item}</span>
            ))}</li>
            <li>Maths: {props.paper.math.map((item)=>(
                <span className="dialog-syllabus-chapters">{item}</span>
            ))}</li>
          </>
        ) : (
          <>
            <li>It is a Full-Test</li>
            <li>Covering both the syllabus of Class-11th and Class-12th</li>
          </>
        )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}

      <div className="test-slider-header"></div>
      <div className="test-slider-date">
        {/* Dec 10 */}
        {findMonthandDay(props.paper.date)}
      </div>
      <div className="test-slider-time-slot">
        <div>Time Slot:</div>
        <div className="test-slider-time-slot-value">
          {/* 10 AM */}
          {props.paper.shift == "shift1" ? "9 AM" : "1 PM"}
        </div>
      </div>
      <div className="test-slider-paper-type">
        {/* JEE MAIN */}
        {props.papertype == "mains" ? "JEE MAIN" : "JEE ADVANCE"}
      </div>
      <ul className="test-slider-list">
        {/* <li>Part-Test</li>
                <li>Class-12th</li> */}
        {props.paper.syllabustype == "class 11" ? (
          <>
            <li>Part-Test</li>
            <li>Class-11th</li>
          </>
        ) : props.paper.syllabustype == "class 12" ? (
          <>
            <li>Part-Test</li>
            <li>Class-12th</li>
          </>
        ) : props.paper.syllabustype == "partsyllabus" ? (
          <>
            <li>Part-Test</li>
          </>
        ) : (
          <>
            <li>Full-Test</li>
          </>
        )}
      </ul>
      <div className="test-slider-button" onClick={()=>setOpen(true)}>View Schedule</div>
      <Link to="/AITS" style={{ textDecoration: "none" }}>
        <div className="test-slider-button">View Details</div>
      </Link>
    </div>
  );
}
