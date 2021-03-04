import React from 'react'

export default function BarGraphElement(props) {
  return (
        <div className="bargraph-element">
            <div className="bargraph-element-progress" style={{height:props.value+"%",background:props.left?"#FF4A4F":"#2AD586"}}>
            </div>
        </div>
  )
}
