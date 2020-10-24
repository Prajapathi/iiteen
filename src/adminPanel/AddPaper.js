import React from 'react'
import {Link} from "react-router-dom";
import './styles/AddPaper.css'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function AddPaper() {
    const [paperType,setPaperType]=React.useState(0);
    return (
        <>
            
                <div id="addPaper">
                    <TextField
                    id="standard-select-currency"
                    select
                    label="Select Paper Type"
                    style={{width:'100%'}}
                    value={paperType}
                    onChange={(event) =>setPaperType(event.target.value)}
                    >
                        <MenuItem value="1">AITS</MenuItem>
                        <MenuItem value="2">Previous Year</MenuItem>
                        <MenuItem value="3">Mock Test</MenuItem>
                    </TextField>
                    {paperType!=0?
                                <Link to={{ pathname: '/Paper', state: { subjective:false,paperType:paperType} }}>
                                    <div style={{display:'flex',alignItems:'center',width:'100%',marginTop:'30px'}}>
                                        <div id="addButton" style={{width:'20%'}}>
                                        +
                                        </div>
                                        <h1>Add a paper</h1>
                                    </div>
                                </Link>
                        :null}
                </div>
            <Link to={{ pathname: '/Paper', state: { subjective:true} }}>
                <div id="addPaper">
                    <div id="addButton">
                    +
                    </div>
                    <h1>Add a Subjective paper</h1>
                </div>
            </Link>
        </>
    )
}
