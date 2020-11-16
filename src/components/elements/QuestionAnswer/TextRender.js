import React from 'react'

export default function TextRender(props) {
    return (
        <div>
            {
                props.data?
                    props.data.map((item,index)=>
                        <>
                        {item.type==0?<br/>:(item.type==1
                                            ?item.data
                                            :(item.type==2
                                                        ?<InlineMath>{item.data}</InlineMath>
                                                        :null
                                            )
                                            )
                        }
                        </>
                    ):null}
            }
        </div>
    )
}
