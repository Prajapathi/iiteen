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
    const [data,setData]=React.useState(props.array.length!=0?props.array[props.number].data:'')
    const [section,setSection]=React.useState(props.array.length!=0?props.array[props.number].section:0)
    const [subpoints,setSubpoints]=React.useState(props.array.length!=0?props.array[props.number].points:[]);
    const [linebreak,setLinebreak]=React.useState(props.array.length!=0?(props.array[props.number].isLine==true?"true":"false"):"false")
    const [Info,setInfo]=React.useState(props.array.length!=0?props.array[props.number]:[''])
    
    useEffect(() => {
        if(localStorage.getItem("savingPaper")==true){
            return
        }
            setData(props.array.length!=0?props.array[props.number].data:'')
            setSection(props.array.length!=0?props.array[props.number].section:0)
            setSubpoints(props.array.length!=0?props.array[props.number].points:[]);
            setLinebreak(props.array.length!=0?(props.array[props.number].isLine==true?"true":"false"):"false")
    }, [props.changeType])

    const handleChange = (event) => {
        setLinebreak(event.target.value);
    };

    const addSubpoint = (event) => {
        setSubpoints([...subpoints,{data:'',color:1}])
    };
    const deleteSubpoint = (index) => {
        const values=[...subpoints];
        values.splice(index, 1);
        setSubpoints(values)
    };
    const changeSubPointData=(index,event)=>{
        const values=[...subpoints]
        values[index].data=event.target.value;
        setSubpoints(values);
    }
    const changeSubPointColor=(index,event)=>{
        
        const values=[...subpoints]
        if(event.target.value==4){
            values[index].color='';
        }
        else values[index].color=Number(event.target.value);
        setSubpoints(values);
    }

    useEffect(() => {
        setInfo({
            heading:"",
            data:data,
            section:Number(section),
            points:subpoints,
            isLine:linebreak=="true"?true:false
        })
    }, [data,section,subpoints,linebreak])

    useEffect(() => {
        let newInfo=[...props.array];
        newInfo[props.number]=Info;
        props.sendInfo(newInfo)
    },[Info])
    
    return (
            <div style={{padding:'30px 50px'}}>
                <form className={classes.container} noValidate >
                    
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
                        <MenuItem value="0"> Main</MenuItem>
                        <MenuItem value="1"> Integer</MenuItem>
                        <MenuItem value="2"> Numerical</MenuItem>
                        <MenuItem value="3"> Single Correct</MenuItem>
                        <MenuItem value="4"> Multiple Correct</MenuItem>
                        <MenuItem value="5"> Paragraph</MenuItem>
                    </TextField>

                    <FormLabel component="legend" style={{color:'black',marginTop:'15px',marginBottom:'-0px'}}>Sub-points</FormLabel>
                    {props.array?(props.array[props.number].points?props.array[props.number].points.length==0?
                                    <div onClick={(event)=>addSubpoint(event)} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer',border:'1px solid gray'}}>+</div>
                            :
                            props.array[props.number].points.map((key,index)=>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <TextField
                                id="standard-select-currency"
                                select
                                style={{width:'100px',marginRight:'20px'}}
                                label="Colour"
                                value={subpoints[index]?subpoints[index].color:0}
                                onChange={(event)=>changeSubPointColor(index,event)}
                                >
                                    <MenuItem value="1"> Red</MenuItem>
                                    <MenuItem value="2"> Green</MenuItem>
                                    <MenuItem value="3"> Neutral</MenuItem>
                                    <MenuItem value="4"> None</MenuItem>
                                </TextField>
                                <TextField
                                id="standard-number"
                                label={ index+1 +". Sub-point"}
                                multiline
                                className={classes.textField}
                                value={subpoints[index]?subpoints[index].data:''}
                                onChange={(event)=>changeSubPointData(index,event)}
                                size="small"
                                /> 
                                <div onClick={(event)=>addSubpoint(event)} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>+</div>
                                <div onClick={subpoints.length!=0?()=>deleteSubpoint(index):null} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>-</div>
                            </div>
                    ):null):null}
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