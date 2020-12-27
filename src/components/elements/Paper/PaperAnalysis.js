import React from 'react'
import '../../../styles/paperAnalysis.css'

export default function PaperAnalysis() {
    return (
        <div>
            <div className="analysis-head">
                Report Card
            </div>
            <div className="report-card-section">
                
                {
                    [1,2,3,4].map((item,index)=>
                    <div className="report-card">
                        <div className="report-card-heading">
                            <div>
                                Overall
                            </div>
                            <div>
                                Marks
                            </div>
                        </div>
                        <div className="report-card-sections">
                            
                                <div>
                                    Attempted
                                </div>
                                <div>
                                    37
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Total Question
                                </div>
                                <div>
                                    60
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Attempted
                                </div>
                                <div>
                                    0
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Total Question
                                </div>
                                <div>
                                    0
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div >
                                    Attempted
                                </div>
                                <div>
                                    0
                                </div>
                        </div>
                        <div className="report-card-sections">
                                <div>
                                    Total Question
                                </div>
                                <div>
                                    0
                                </div>
                        </div>
                    </div>
                    )
                }
                
            </div>
            <div className="analysis-head">
                Analysis
            </div>
            <div className="analysis-section">
                <div id="marks-analysis">
                    Subjective Marks
                    <div className="analysis-sub-section">
                        <div>
                            Chart
                        </div>
                        <div>
                            <div>Physics:25%</div>
                            <div>Physics:25%</div>
                            <div>Physics:25%</div>
                        </div>
                    </div>
                </div>

                <div id="legend">
                    <div style={{color:'#3B95C2'}}>
                        <div className="legend-circle" style={{background:'#3B95C2'}}></div>
                        Physics
                    </div>
                    <div style={{color:'#FF4A4F'}}>
                        <div className="legend-circle" style={{background:'#FF4A4F'}}></div>
                        Chemistry
                    </div>
                    <div style={{color:'#2AD586'}}>
                        <div className="legend-circle" style={{background:'#2AD586'}}></div>
                        Maths
                    </div>
                </div>

                <div id="time-analysis">
                    Time Devoted
                    <div className="analysis-sub-section">
                        <div>
                            Chart
                        </div>
                        <div>
                            <div>Physics:25%</div>
                            <div>Physics:25%</div>
                            <div>Physics:25%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
