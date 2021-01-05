import React, {useEffect, useState} from 'react'

export default function InstructionDropdown(props) {
    const [instruction, setInstruction] = useState(['','','','',''])

    useEffect(() => {
        //creating instruction array for individual sections
        const i=[...instruction]
        props.inst.map((item,index)=>
            i[item.section]=item
        )
        setInstruction(i)
    }, [props.inst])

    return (
        <div>
             <>
                <div className="paper-inst">
                    <div className="inst-point-box"></div>
                    <div className="inst-point-data">
                        {instruction[props.section].data}
                         
                        <ul>
                        { instruction[props.section].points?instruction[props.section].points.map((key,ind)=>
                            instruction[props.section].points[ind]==""?null:
                                                                        <li key={ind} style={{listStyleType:'none'}}>
                                                                            <div className="inst-sub-points">
                                                                                {instruction[props.section].points[ind].color==''?null:
                                                                                    <div style={{background:instruction[props.section].points[ind].color==1?'#F6391B':instruction[props.section].points[ind].color==2?'#2BC559':'#878585'}}></div>
                                                                                }
                                                                                {instruction[props.section].points[ind].data}
                                                                            </div>
                                                                        </li>
                            ):null
                            }
                        </ul>
                    </div>
                    
                </div>
               
                {instruction[props.section].isLine==true?<hr/>:null}
                </>
        </div>
    )
}
