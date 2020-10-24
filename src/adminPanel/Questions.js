import React,{useEffect} from 'react'
import {Link, useLocation } from "react-router-dom";
import Question from './elements/Question'

export default function Questions(props) {

    const location = useLocation();
    const [index,setIndex]=React.useState(0);
    const [questionArray,setQuestionArray]=React.useState([])
    return (
        <>
                    <div>
                    <Question key={index} index={index}/>
                    <button style={{width:'60%',
                    margin:'0px 20% 20px 20%',
                    background:'#388cf2',
                    color:'white',
                    border:'1px solid white',
                    borderRadius:'20px'
                    }}
                    onClick={()=>setIndex(index+1)}>
                        Continue
                    </button>
                    </div>
                    
                
        </>
    )
}
