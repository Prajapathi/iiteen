import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InstructionPreview from './InstructionPreview'
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap:'wrap',
  },
  textField: {
    minWidth: '400px',
    marginTop:'5px',
    marginBottom:'15px'
  },
}));

export default function InstructionField(props) {
    
    const classes = useStyles();
    const [heading,setHeading]=React.useState('')
    const [data,setData]=React.useState('')
    const [section,setSection]=React.useState('')
    const [subpoints,setSubpoints]=React.useState(['']);
    const [linebreak,setLinebreak]=React.useState("false")
    const [Info,setInfo]=React.useState([''])

     const handleChange = (event) => {
        setLinebreak(event.target.value);
    };

    const addSubpoint = (event) => {
        setSubpoints([...subpoints,''])
    };
    const deleteSubpoint = (index) => {
        const values=[...subpoints];
        values.splice(index, 1);
        setSubpoints(values)
    };
    const changeSubPoint=(index,event)=>{
        const values=[...subpoints]
        values[index]=event.target.value;
        setSubpoints(values);
    }

    useEffect(() => {
        setInfo({heading:heading,
        data:data,
        section:section,
        subpoints:subpoints,
        linebreak:linebreak})
    }, [heading,data,section,subpoints,linebreak])

    useEffect(() => {
        let newInfo=[...props.array];
        newInfo[props.number]=Info;
        props.sendInfo(newInfo)
        console.log("iugniung")
    },[Info])
    
    return (
            <div style={{padding:'30px 50px'}}>
                <form className={classes.container} noValidate >
                    <TextField
                    id="standard-number"
                    label="Heading"
                    multiline
                    className={classes.textField}
                    value={heading}
                    onChange={(event) =>setHeading(event.target.value)}
                    />
                    <TextField
                    id="standard-number"
                    label="Data"
                    multiline
                    className={classes.textField}
                    value={data}
                    onChange={(event) =>setData(event.target.value)}
                    />
                    <TextField
                    id="standard-select-currency"
                    select
                    label="Select section"
                    className={classes.textField}
                    value={section}
                    onChange={(event) =>setSection(event.target.value)}
                    >
                        <MenuItem value="1"> 1</MenuItem>
                        <MenuItem value="2"> 2</MenuItem>
                        <MenuItem value="3"> 3</MenuItem>
                    </TextField>

                    <FormLabel component="legend" style={{color:'black',marginTop:'15px',marginBottom:'-0px'}}>Sub-points</FormLabel>
                    {subpoints.map((key,index)=>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <TextField
                                id="standard-number"
                                label={ index+1 +". Sub-point"}
                                multiline
                                className={classes.textField}
                                value={subpoints[index]}
                                onChange={(event)=>changeSubPoint(index,event)}
                                size="small"
                                /> 
                                <div onClick={(event)=>addSubpoint(event)} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>+</div>
                                <div onClick={subpoints.length!=1?()=>deleteSubpoint(index):null} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>-</div>
                            </div>
                    )}
                    <RadioGroup aria-label="gender" name="gender1" value={linebreak} onChange={(e)=>setLinebreak(e.target.value)}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <FormLabel component="legend" style={{color:'black',marginRight:'25px'}}>Give line-break</FormLabel>
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </div> 
                </RadioGroup>
                </form>
            </div>
    )
}