import React from 'react'
import PaginationComponent from './Pagination'
import '../../../styles/report.css'

export default function Report() {
    document.title="Report | IITEENS"
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
