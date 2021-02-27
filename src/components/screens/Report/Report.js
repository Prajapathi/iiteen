import React from 'react'
import PaginationComponent from './Pagination'
import '../../../styles/report.css'

document.title="Report | IITEENS"

export default function Report() {
    return (
        <div  className="screen report-screen" id="AITS">
           <div id="mocktest-heading">
                <div class="section-heading" style={{color:'white'}}>REPORT</div>
            </div>
            <div>
                <PaginationComponent/>
            </div>
        </div>
        
    )
}
