import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextTyper from './TextTyper'
import Preview from './Preview'
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
    const [hint,setHint]=React.useState([]);
    const [solution,setSolution]=React.useState([]);
    const [option,setOption]=React.useState([]);

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
    return (
        <>
        <div style={{padding:'3%',display:'flex'}}>
            <div style={{width:'40%',border:'2px solid black'}}>
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
                    
                    <div style={{border:'1px dashed black',width:'80%',padding:'20px',margin:'30px'}}>
                    <FormLabel component="legend" style={{color:'black'}}>Set Question</FormLabel>
                    <TextTyper sendInfo={setQuestion}/>
                    </div>

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

                    {answerType=="0"?[0,1,2,3].map((key,index)=>
                                        <div style={{border:'1px dashed black',width:'80%',padding:'20px',margin:'30px'}}>
                                        <FormLabel component="legend" style={{color:'black'}}>Option {index+1}</FormLabel>
                                        <TextTyper sendInfo={setOption} index={index} info={option}/>
                                        </div>
                                    )
                                    :(answerType=="1"?[0,1,2,3,4].map((key,index)=>
                                                        <div style={{border:'1px dashed black',width:'80%',padding:'20px',margin:'30px'}}>
                                                        <FormLabel component="legend" style={{color:'black'}}>Option {index+1}</FormLabel>
                                                        <TextTyper sendInfo={setOption} index={index} info={option}/>
                                                        </div>
                                                    )
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
                                                                                            label="Lower Limit"
                                                                                            className={classes.textField}
                                                                                            onChange={(event) =>setAnswerLower(event)}
                                                                                            />
                                                                                            <TextField
                                                                                            id="standard-number"
                                                                                            type="number"
                                                                                            label="Upper Limit"
                                                                                            className={classes.textField}
                                                                                            onChange={(event) =>setAnswerUpper(event)}
                                                                                            />
                                                                                            </>:null
                                                                         )
                                                    )
                                    )
                    }
                    <div style={{border:'1px dashed black',width:'80%',padding:'20px',margin:'30px'}}>
                    <FormLabel component="legend" style={{color:'black'}}>Hint</FormLabel>
                    <TextTyper sendInfo={setHint}/>
                    </div>
                    <div style={{border:'1px dashed black',width:'80%',padding:'20px',margin:'30px'}}>
                    <FormLabel component="legend" style={{color:'black'}}>Solution</FormLabel>
                    <TextTyper sendInfo={setSolution}/>
                    </div>
                </form>
            </div>
            <div style={{width:'40%',marginLeft:'25px'}}>
                <h3>Question</h3>
                <Preview data={question}/>
                {answerType=="0"?[1,2,3,4].map((item,index)=><>
                                                                <h6>Option {index+1}</h6>
                                                                <Preview data={option[index]}/>
                                                            </>):(answerType=="1"?[1,2,3,4,5].map((item,index)=><>
                                                                                                            <h6>Option {index+1}</h6>
                                                                                                            <Preview data={option[index]}/>
                                                                                                        </>):null)
                }
                <h3>Solution</h3>
                <Preview data={solution}/>
            </div>
        </div>
        <button>Continue</button>
        </>
    )
}
