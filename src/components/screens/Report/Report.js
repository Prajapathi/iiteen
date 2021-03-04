import React from 'react'
import PaginationComponent from './Pagination'
import '../../../styles/report.css'
import icon from '../../../assets/images/AITSicon.png'

export default function Report() {
    document.title="Report | IITEENS"
    return (
        <div  className="screen report-screen" id="AITS">
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src={icon} id="aitsicon" alt=""/>
                <div class="section-heading">ALL INDIA TEST SERIES</div>
            </div>
           <div id="mocktest-heading">
                <div class="section-heading" style={{color:'white'}}>AITS REPORT</div>
            </div>
            <div>
                <PaginationComponent/>
            </div>
        </div>
        
    )
}
