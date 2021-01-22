import React from 'react'
import '../../../../styles/paperInstruction.css'

export default function GeneralInstruction(props) {
    const symbols=[
        {color:"white", data:"Not Visited Questions"},
        {color:"#FF1E1E", data:"Visited Questions but not Answered"},
        {color:"#2AD586", data:"Attempted Questions"},
        {color:"#3B95C2", data:"Marked for review"},
        {color:"#ff9700", data:"Attempted and Marked Questions"},
    ]
    const generalInst=[
        "Number pad can be accessed from left top corner.",
        "Clicking on the question number from the number will navigate to the corresponding question.",
        "The timer of the top corner displays the time remaining for the test.",
        "When the timer reaches zero ,the test will be submitted automatically.",
        "Further instruction should be followed for each part of section as given."
    ]

    const [check,setCheck]=React.useState(false);
    return (
        <div id="inst-body">
            <div id="paper-heading">JEE MAINS </div>
            <div id="top-bar"> 
                GENERAL INSTRUCTION
            </div>
            <p id="inst-p">The Questions Palette displayed will show the status of each
                <br/>question using one of the following symbols :</p>
            <div id="inst-data">
                    {
                        symbols.map((item,index)=>
                            <div className="inst-data-points">
                                <div style={{background:item.color}} className="inst-symbol"></div>
                                : {item.data}
                            </div>
                        )
                    }
            </div>
            <hr className="inst-hr"/>
            <div className="inst-lists">
                {
                    generalInst.map((item,index)=>
                        <div className="inst-list-pt">
                            <div className="bullet-pt"></div>
                            <div className="inst-list-item">{item}</div>
                        </div>
                    )
                }
            </div>
            <div id="inst-bottom">
                <div style={{display:"flex"}}>
                    <label class="inst-checkbox">I have read the instructions
                    <input type="checkbox" checked={check} onClick={()=>setCheck(!check)}/>
                            <span class="checkmark"></span>
                    </label>
                </div>
                <div>
                    Time Remaining: 00:30:00
                    <button id="inst-start"  style={{background:!check?"grey":null}} disabled={!check} onClick={()=>props.start(true)}>
                        Start
                    </button>
                </div>
            </div>
        </div>
        
    )
}
