import React from 'react'

export default function PreviousYear(props) {
    return (
         <div className="flip-card-mock">
            <div className="flip-card-inner-mock">
                <div className="flip-card-front-mock">
                    <div id="card-title-mock">
                        <div style={{fontSize:'26px'}}>JEE Advance</div>
                    </div> 
                    <div id="card-content-mock">
                        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                            <div style={{fontSize:'14px',color:'#448698'}}>Year: </div>
                            <div style={{fontSize:'14px',color:'#448698'}}>2007 </div>
                        </div>
                        {props.type=="advance"?
                        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                            <div style={{fontSize:'14px',color:'#448698'}}>Paper: </div>
                            <div style={{fontSize:'14px',color:'#448698'}}>1 </div>
                        </div>:null}
                        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                            <div style={{fontSize:'14px',color:'#448698'}}>Duration: </div>
                            <div style={{fontSize:'14px',color:'#448698'}}>3 hours </div>
                        </div>
                        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                            <div style={{fontSize:'14px',color:'#448698'}}>Max Marks </div>
                            <div style={{fontSize:'14px',color:'#448698'}}>300</div>
                        </div>
                    </div> 
                    {!true?
                        <>
                        <button style={{marginRight:'5px'}}>Re-Attempt</button>
                        <button>Analysis</button></>
                        :<button>Attempt</button>
                    }
                </div>
            </div>
        </div>
    )
}
