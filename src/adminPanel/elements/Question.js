import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import QuestionPreview from './QuestionPreview'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';

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

export default function QuestionInfo() {
    // const [instructions,setInstructions]=React.useState(['']);
    // const deleteInstruction = (index) => {
    //     const values=[...instructions];
    //     values.splice(index, 1);
    //     setInstructions(values)
    // };
    // const addInstruction = () => {
    //     setInstructions([...instructions,''])
    // };
    
    const classes = useStyles();
    const [number,setNumber]=React.useState();
    const [subject,setSubject]=React.useState();
    const [tag,setTag]=React.useState();
    const [section,setSection]=React.useState('');
    const [marks,setMarks]=React.useState();
    const [negative,setNegative]=React.useState();
    const [question,setQuestion]=React.useState(['']);
    const [answerType,setAnswerType]=React.useState();
    const [answer,setAnswer]=React.useState([]);

    const setAnswerLower=(event)=>{
        const ans=[];
        ans[0]=event.target.value;
        setAnswer(ans);
    }
    const setAnswerUpper=(event)=>{
        const ans=[...answer];
        ans[1]=event.target.value;
        setAnswer(ans);
    }

    console.log(answer)
    return (
        <>
        <div style={{padding:'3%',display:'flex'}}>
            <div style={{width:'40%'}}>
                <form>
                    <TextField
                    id="standard-number"
                    type="number"
                    label="Question No."
                    className={classes.textField}
                    value={number}
                    onChange={(event) =>setNumber(event.target.value)}
                    />

                    <TextField
                    id="standard-select-currency"
                    select
                    label="Select Subject"
                    className={classes.textField}
                    value={subject}
                    onChange={(event) =>setSubject(event.target.value)}
                    >
                        <MenuItem value="physics"> Physics</MenuItem>
                        <MenuItem value="chemistry"> Chemistry</MenuItem>
                        <MenuItem value="maths"> Mathematics</MenuItem>
                    </TextField>

                    <TextField
                    id="standard-select-currency"
                    select
                    label="Select Tag"
                    className={classes.textField}
                    value={tag}
                    onChange={(event) =>setTag(event.target.value)}
                    >
                        <MenuItem value="1"> Physics</MenuItem>
                        <MenuItem value="2"> Chemistry</MenuItem>
                        <MenuItem value="3"> Mathematics</MenuItem>
                    </TextField>

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
                    
                    <TextField
                    id="standard-number"
                    type="number"
                    label="Marks"
                    className={classes.textField}
                    value={marks}
                    onChange={(event) =>setMarks(event.target.value)}
                    />

                    <TextField
                    id="standard-number"
                    type="number"
                    label="Negative Marking"
                    className={classes.textField}
                    value={negative}
                    onChange={(event) =>setNegative(event.target.value)}
                    />

                    {/* <FormLabel component="legend" style={{color:'black',marginTop:'15px',marginBottom:'-0px'}}>Question</FormLabel> */}
                    {/*question.map((key,index)=>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <TextField
                                id="standard-select-currency"
                                select
                                label="Type"
                                size="small"
                                // value={section}
                                // onChange={(event) =>setSection(event.target.value)}
                                >
                                    <MenuItem value="0"> 0</MenuItem>
                                    <MenuItem value="1"> 1</MenuItem>
                                    <MenuItem value="2"> 2</MenuItem>
                                    <MenuItem value="3"> 3</MenuItem>
                                </TextField>
                                <TextField
                                id="standard-number"
                                //label={ index+1 +". Sub-point"}
                                multiline
                                className={classes.textField}
                                //value={subpoints[index]}
                                //onChange={(event)=>changeSubPoint(index,event)}
                                size="small"
                                /> 
                                <div onClick={(event)=>addSubpoint(event)} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>+</div>
                                <div onClick={subpoints.length!=1?()=>deleteSubpoint(index):null} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>-</div>
                             </div>
                    )*/}
                    <TextField
                    id="standard-select-currency"
                    select
                    label="Question Type"
                    className={classes.textField}
                    value={answerType}
                    onChange={(event) =>setAnswerType(event.target.value)}
                    >
                        <MenuItem value="0"> Single correct</MenuItem>
                        <MenuItem value="1"> Multiple correct</MenuItem>
                        <MenuItem value="2"> Integer</MenuItem>
                        <MenuItem value="3"> Numerical</MenuItem>
                    </TextField>

                    {answerType=="0"?<h1>4 options</h1>
                                    :(answerType=="1"?<h1>5options</h1>
                                                    :null)
                    }

                    {answerType=="0"?<TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select answer"
                                    className={classes.textField}
                                    value={answer}
                                    onChange={(event) =>setAnswer(event.target.value)}
                                    >
                                        <MenuItem value="1"> 1</MenuItem>
                                        <MenuItem value="2"> 2</MenuItem>
                                        <MenuItem value="3"> 3</MenuItem>
                                        <MenuItem value="4"> 4</MenuItem>
                                    </TextField>
                                    :(answerType=="1"?<h1>5options</h1>
                                                    :(answerType=="2"?<TextField
                                                                        id="standard-number"
                                                                        type="number"
                                                                        label="Enter Answer"
                                                                        className={classes.textField}
                                                                        value={answer}
                                                                        onChange={(event) =>setAnswer(event.target.value)}
                                                                        />
                                                                     :(answerType=="3"?<>
                                                                                        <TextField
                                                                                            id="standard-number"
                                                                                            type="number"
                                                                                            label="Enter Answer"
                                                                                            className={classes.textField}
                                                                                            onChange={(event) =>setAnswerLower(event)}
                                                                                            />
                                                                                            <TextField
                                                                                            id="standard-number"
                                                                                            type="number"
                                                                                            label="Enter Answer"
                                                                                            className={classes.textField}
                                                                                            onChange={(event) =>setAnswerUpper(event)}
                                                                                            />
                                                                                            </>:null
                                                                         )
                                                    )
                                    )
                    }
                </form>
            </div>
            <QuestionPreview/>
        </div>
        <button>Continue</button>
        </>
    )
}
