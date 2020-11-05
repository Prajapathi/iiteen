import React from 'react'
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function Preview(props) {
    
    return (
        <div style={{border:'1px dashed grey',padding:'40px'}}>
        {/* \(prod x+y\sum q\) */}
        {props.isOption?props.data?props.data.type==0?
                        <br/>:(props.data.type==1
                                    ?<>{props.data.data}</>
                                    :(props.data.type==2
                                                ?<InlineMath>{props.data.data}</InlineMath>
                                                :null
                                     )
                                    ):null
        :
            props.data?props.data.map((item,index)=>
                <div key={index}>
                {item.type==0?<br/>:(item.type==1
                                    ?<>{item.data}</>
                                    :(item.type==2
                                                ?<InlineMath>{item.data}</InlineMath>
                                                :null
                                     )
                                    )
                }
                </div>
            ):null}
        </div>
    )
}
