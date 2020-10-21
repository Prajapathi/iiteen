import React from 'react'
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

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
                                                ?<InlineMath>{item.data}</InlineMath>
                                                :null
                                     )
                                    )
                }
                </>
            ):null}
        </div>
    )
}
