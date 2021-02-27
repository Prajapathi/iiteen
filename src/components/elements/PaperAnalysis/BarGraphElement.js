import React from 'react'
import '../../../styles/paperAnalysis.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    borderRadius: 10,
  },
  colorPrimary: {
    backgroundColor: "white"
  },
  bar: {
    borderRadius: 10,
    backgroundColor: '#2AD586'
  },
}))(LinearProgress);

const BorderLinearProgressLeft = withStyles((theme) => ({
  root: {
    borderRadius: 10,
  },
  colorPrimary: {
    backgroundColor: "white"
  },
  bar: {
    borderRadius: 10,
    backgroundColor: '#FF4A4F'
  },
}))(LinearProgress);

export default function BarGraphElement(props) {
    return (
        <div>
            {
              props.left?
                <BorderLinearProgressLeft 
                    className="graph-bar" 
                    variant="determinate" 
                    value={60} 
                    style={{boxShadow:'1px 1px 3px 0px rgba(0,0,0,0.3)',left:"-90px"}}
                /> 
                : 
                <BorderLinearProgress  
                    className="graph-bar" 
                    variant="determinate" 
                    value={60} 
                    style={{boxShadow:'1px 1px 3px 0px rgba(0,0,0,0.3)'}}
                /> 
            }
            
        </div>
    )
}
