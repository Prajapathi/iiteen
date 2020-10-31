import React from 'react'
import {Link,useLocation} from "react-router-dom";
import './styles/AddPaper.css'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function AddPaper() {
    const location = useLocation();
    const [paperType,setPaperType]=React.useState(0);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if(location.state&&location.state.success==true)
        setOpen(true)
        localStorage.removeItem("paperType")
    }, [])
  
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    };

    const setLocal=()=>{
        localStorage.setItem("paperType",paperType)
    }

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
                                <Link to={{ pathname: '/Paper', state: { subjective:false,paperType:paperType} }} onClick={setLocal}>
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
            
                    {/* <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    severity="success"
                    open={open}
                    autoHideDuration={2000}
                    message="Paper Added Successfully"
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                        }
                    /> */}
        </>
    )
}
