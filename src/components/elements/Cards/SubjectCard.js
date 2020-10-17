import React from 'react'
import '../../../styles/subjectCard.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: 'white'
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#448698',
    
  },
}))(LinearProgress);

export default function SubjectCard(props) {
    return (
        
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div id="card-title">
                        <div style={{fontSize:'26px'}}>Chapter {props.number}</div>
                    </div> 
                    <div id="card-content">
                        <div style={{fontSize:'24px',color:'#448698'}}>{props.name}</div>
                        <div style={{width:'80%'}}>
                            <BorderLinearProgress variant="determinate" value={70} style={{boxShadow:'1px 1px 3px 0px rgba(0,0,0,0.3)'}}/>
                            <div style={{color:'#448698',marginTop:'5px'}}> 25/30</div>
                        </div>
                    </div> 
                </div>
                <div className="flip-card-back">
                    <button><div style={{fontWeight:'800'}}>Level &nbsp; &nbsp; 1</div></button>
                    <button><div style={{fontWeight:'800'}}>Level &nbsp; &nbsp; 2</div></button>
                    <button><div style={{fontWeight:'800'}}>Level &nbsp; &nbsp; 3</div></button>
                </div>
            </div>
        </div>
    )
}
