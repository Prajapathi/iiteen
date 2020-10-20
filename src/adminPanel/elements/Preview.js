import React from 'react'
import Latex from './Latex'

export default function Preview(props) {
    
    const start=`$\\`;
    const end=`\\$`
    return (
        <div style={{border:'1px dashed grey',padding:'40px'}}>
        {/* \(prod x+y\sum q\) */}
            { props.data?props.data.map((item)=>
                <>
                {item.type==0?<br/>:(item.type==1
                                    ?<>{item.data}</>
                                    :(item.type==2
                                                ?<p> <Latex/> </p>
                                                :null
                                     )
                                    )
                }
                </>
            ):null}
        </div>
    )
}
