import React,{useEffect,useState} from 'react'

export default function Timer(props) {
    const [hours, sethours] = useState(Math.floor(props.duration/60));
    const [mins, setMins] = useState(props.duration%60)
    const [secs, setSecs] = useState(0)
    const [clear,setClear]=useState(false)
    const [counter, setCounter] = useState(props.duration);

    useEffect(() => {
       let IntervalId= setInterval(() => {
            if (secs > 0) {
                setSecs(secs - 1)
            }
            
            if (secs === 0) {
                if (mins === 0 && hours==0) {
                    setClear(true)
                } 
                else {
                    if(mins>0)
                        setMins(mins-1);
                    setSecs(59);
                }
            }
            if(mins==0){
                if(secs==0 && hours==0){
                    setClear(true)
                }
                if(hours>0)
                    sethours(hours-1)
                if(hours!=0)
                    setMins(59)
            }
            if(hours==0){
                if(secs==0 && mins==0){
                    setClear(true)
                }
            }
            setCounter(counter-1)
        }, 1000)
        return () => clearInterval(IntervalId);
    }, [counter])

    useEffect(() => {
        if(clear==true)
            props.timeOver(true)
    }, [clear])
    
    return (
        <div>
        {Date()}
            {hours<10?"0"+hours:hours}:{mins<10?"0"+mins:mins}:{secs<10?"0"+secs:secs}
        </div>
    )
}
