import React from 'react'
import LockIcon from '@material-ui/icons/Lock';

export default function AITSCard(props) {

    return (
        <div className="flip-card-mock">
            <div className="flip-card-inner-mock">
                <div className="flip-card-front-mock">
                    <div id="card-title-mock">
                        <div style={{fontSize:'26px'}}>JEE Mains</div>
                    </div> 
                    <div id="card-content-mock">
                        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                            <div style={{fontSize:'14px',color:'#448698'}}>Date: </div>
                            <div style={{fontSize:'14px',color:'#448698'}}>18 Oct </div>
                        </div>
                        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                            <div style={{fontSize:'14px',color:'#448698'}}>Time: </div>
                            <div style={{fontSize:'14px',color:'#448698'}}>9:00 am </div>
                        </div>
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
                        :<button><LockIcon/></button>
                    }
                </div>
            </div>
        </div>
    )
}
