import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap:'wrap',
    margin:'50px auto',
    justifyContent:'flex-start',
    border:'2px solid black',
    width:'80%'
  },
  textField: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2),
    minWidth: 200,
  },
}));

export default function PaperInfo(props) {
    const classes = useStyles();
    const [name,setName]=React.useState('');
    const [typeValue, settypeValue] = React.useState('Mains');
    const [date,setDate]=React.useState('2020-10-24T10:30');
    const [level,setLevel]=React.useState('');
    const [marks,setMarks]=React.useState('');
    const [duration,setDuration]=React.useState('');
    const [noOfQuestions,setNoOfQuestions]=React.useState(0);
    const [data,setData]=React.useState([]);
    const [subjectwiseClass,setSubjectwiseClass]=React.useState([]);
    const [subjectwiseSubject,setSubjectwiseSubject]=React.useState(1);

    const handleChange = (event) => {
        settypeValue(event.target.value);
    };

    useEffect(() => {
      props.sendNumberQ(noOfQuestions)
    }, [noOfQuestions])

    useEffect(() => {
      props.sendSubjectwiseClass(subjectwiseClass);
    }, [subjectwiseClass])

    useEffect(() => {
      props.sendSubjectwiseSub(subjectwiseSubject);
    }, [subjectwiseSubject])

    useEffect(() => {
        let data={
          name:name,
          date:date,
          paperType:Number(typeValue=="Mains"?1:2),
          totalMarks:marks==''?0:Number(marks),
          noOfQuestions:Number(noOfQuestions),
          totalDuration:duration==''?0:Number(duration),
          level:level!=''?Number(level):(props.subjectwise==true?'':null)
        }
        setData(data);
    }, [name,date,typeValue,marks,noOfQuestions,duration,level])
    
    useEffect(() => {
      props.sendInfo(data)
    }, [data])
    

    return (
        <form className={classes.container} noValidate >
            {!props.subjectwise?
                              <div style={{display:'flex',alignItems:'center',margin:'20px auto'}}>
                                  <TextField
                                    id="standard-number"
                                    label="Paper Name"
                                    className={classes.textField}
                                    value={name}
                                    onChange={(event) =>setName(event.target.value)}
                                  />
                                  <TextField
                                    id="datetime-local"
                                    label="Date and time"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    className={classes.textField}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    value={date}
                                    onChange={(e)=>setDate(e.target.value)}
                                  />
                                  <FormLabel component="legend" style={{marginRight:'15px'}}>Paper Type</FormLabel>
                                  <RadioGroup aria-label="gender" name="gender1" value={typeValue} onChange={handleChange}>
                                      <div style={{display:'flex'}}>
                                          <FormControlLabel value="Mains" control={<Radio />} label="Mains" />
                                          <FormControlLabel value="Advance" control={<Radio />} label="Advance" />
                                      </div> 
                                  </RadioGroup>
                                  <TextField
                                    id="standard-number"
                                    type="number"
                                    label="Total Duration (in mins)"
                                    className={classes.textField}
                                    value={duration}
                                    InputProps={{
                                        inputProps: { 
                                          min: 1
                                        }
                                    }}
                                    onChange={(event) =>event.target.value>=0?setDuration(event.target.value):null}
                                  />
                              </div>
                              :
                                null
            }
            <div style={{display:'flex',margin:'20px auto'}}>
                {!props.subjectwise?
                                  <TextField
                                  id="standard-number"
                                  type="number"
                                  label="Total Marks"
                                  className={classes.textField}
                                  value={marks}
                                  InputProps={{
                                        inputProps: { 
                                          min: 1
                                        }
                                  }}
                                  onChange={(event) =>event.target.value>=0?setMarks(event.target.value):null}
                                />
                                :
                                <>
                                    <TextField
                                      id="standard-select-currency"
                                      select
                                      label="Select Subject"
                                      className={classes.textField}
                                      value={subjectwiseSubject}
                                      onChange={(event) =>setSubjectwiseSubject(event.target.value)}
                                    >
                                        <MenuItem value="1"> Physics</MenuItem>
                                        <MenuItem value="2"> Chemistry</MenuItem>
                                        <MenuItem value="3"> Mathematics</MenuItem>
                                    </TextField>
                                    <TextField
                                        id="standard-number"
                                        label="Chapter Name"
                                        className={classes.textField}
                                        value={name}
                                        onChange={(event) =>setName(event.target.value)}
                                    />
                                </>
                }
                <TextField
                  id="standard-number"
                  type="number"
                  label="Number of questions"
                  className={classes.textField}
                  value={noOfQuestions}
                  InputProps={{
                                inputProps: { 
                                min: 1
                              }
                  }}
                  onChange={(event) =>event.target.value>=0?setNoOfQuestions(event.target.value):null}
                />
                {props.subjectwise?
                                <TextField
                                  id="standard-select-currency"
                                  select
                                  label="Select"
                                  value={level}
                                  onChange={(event) =>setLevel(event.target.value)}
                                  helperText="Level for subjectwise Paper"
                                  className={classes.textField}
                                >
                                    <MenuItem value="1"> 1</MenuItem>
                                    <MenuItem value="2"> 2</MenuItem>
                                    <MenuItem value="3"> 3</MenuItem>
                                </TextField>
                                :null
                }
            </div>
        </form>
    );
}
