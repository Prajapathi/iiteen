import React,{useEffect} from 'react'
import {Link, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextTyper from './TextTyper'
import Preview from './Preview'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
export default function QuestionInfo(props) {
    
    const qArray=props.index==0?null:{...props.infoArray[props.index-1]}
    const classes = useStyles();
    const [number,setNumber]=React.useState(props.index+1);
    // const [subject,setSubject]=React.useState(props.index==0?1:(((props.noOfQuestions)/3)>=(props.index+1)?1:
    //                                     (2*(props.noOfQuestions/3))>=(props.index+1)?2:3));
    
    //const [section,setSection]=React.useState(qArray?qArray.section:'');
    //const [marks,setMarks]=React.useState(qArray?qArray.marks:'');
    //const [negative,setNegative]=React.useState(qArray?qArray.negativeMarks:'');
    const [subject,setSubject]=React.useState('')
    const [section,setSection]=React.useState('')
    const [marks,setMarks]=React.useState('')
    const [negative,setNegative]=React.useState('')
    const [tag,setTag]=React.useState(0);
    const [question,setQuestion]=React.useState([]);
    const [answerType,setAnswerType]=React.useState(0);
    const [answer,setAnswer]=React.useState([]);
    const [hint,setHint]=React.useState([]);
    const [solution,setSolution]=React.useState([]);
    const [option,setOption]=React.useState([{},{},{},{}]);
    const [multiOption,setMultiOption]=React.useState([false,false,false,false]);
    const [data,setData]=React.useState([]);

    console.log("pp",qArray)

    useEffect(()=>{
        let sub;
        if(props.index==0||((props.index+1)<=(props.noOfQuestions)/3)){
            sub=1;
        }
        else if((2*(props.noOfQuestions/3))>=(props.index+1)){
            sub=2;
        }
        else sub=3;

        let ind=props.index+1;

        if(sub==2){
            ind-=props.noOfQuestions/3;
        }
        else if(sub==3){
            ind-=2*(props.noOfQuestions/3);
        }

        let subQ=0;
        for(let i=0;i<props.sectionInfo.length;i++){
            subQ+=Number(props.sectionInfo[i].numberOfQuestions);
            if(ind<=subQ){
                setSection(props.sectionInfo[i].section)
                setMarks(props.sectionInfo[i].marks)
                setNegative(props.sectionInfo[i].negative)
                break;
            }
        }
        setSubject(sub)
    },[props.sectionInfo])
    const setAnswerLower=(event)=>{
        const ans=[];
        ans[0]=Number(event.target.value);
        setAnswer(ans);
    }
    const setAnswerUpper=(event)=>{
        const ans=[...answer];
        ans[1]=Number(event.target.value);
        setAnswer(ans);
    }
    const handleCheck=(index)=>{
        const ans=[...multiOption];
        ans[index]=!ans[index];
        setMultiOption(ans);
    }

    useEffect(() => {
        const newAns=[];
        multiOption.map((item,index)=>
            item==true?newAns.push(index):null
        )
        setAnswer(newAns)
    }, [multiOption])

    useEffect(() => {
        const newData={
            number:Number(number),
            subject:subject,
            tag:Number(tag),
            section:Number(section),
            marks:Number(marks),
            negativeMarks:Number(negative),
            question:question,
            option:option,
            answerType:answerType==0?4:(answerType==1?5:(answerType==2?1:2)),
            answer:answer,
            hint:hint,
            solution:solution
        }
        setData(newData)
    }, [number,subject,tag,section,marks,negative,question,answerType,answer,hint,solution,option,multiOption,])

    useEffect(() => {
        const arr=props.infoArray?[...props.infoArray]:null;
        arr[props.index]=data;
        props.sendInfo(arr)
    }, [data])
    return (<>
        <h1 style={{margin:'20px 0px -20px 50px',fontSize:"24px"}}>
                        Question {props.index+1}
                        {subject==1?" PHYSICS":subject==2?" CHEMISTRY":" MATHS"}
                        {section==1?" Integer":(section==2?" Numerical":(section==3?" Single Correct":(section==4?" Multiple Correct":" Paragraph"):null):null)}
        </h1>
        <div style={{padding:'3%',display:'flex'}}>
        
            <div style={{width:'40%',border:'2px solid black'}}>
                <form>
                    {/* <TextField
                    id="standard-number"
                    type="number"
                    label="Question No."
                    className={classes.textField}
                    value={number}
                    onChange={(event) =>setNumber(event.target.value)}
                    /> */}

                    {/* <TextField
                    id="standard-select-currency"
                    select
                    label="Select Subject"
                    className={classes.textField}
                    value={subject}
                    onChange={(event) =>setSubject(event.target.value)}
                    >
                        <MenuItem value="1"> Physics</MenuItem>
                        <MenuItem value="2"> Chemistry</MenuItem>
                        <MenuItem value="3"> Mathematics</MenuItem>
                    </TextField> */}

                    {subject==1?
                    <TextField
                    id="standard-select-currency"
                    select
                    label="Select Tag"
                    className={classes.textField}
                    value={tag}
                    onChange={(event) =>setTag(event.target.value)}
                    >
                                <MenuItem value="0"> Mechanics-1</MenuItem>
                                <MenuItem value="1"> Mechanics-2</MenuItem>
                                <MenuItem value="2"> Waves and Thermodynamics</MenuItem>
                                <MenuItem value="3"> Magnetism and EMI</MenuItem>
                                <MenuItem value="4"> Optics and Modern Phy</MenuItem>
                                <MenuItem value="5"> Electrostatics and current electricity</MenuItem>
                    </TextField>
                    :(subject=="2"?
                    <TextField
                    id="standard-select-currency"
                    select
                    label="Select Tag"
                    className={classes.textField}
                    value={tag}
                    onChange={(event) =>setTag(event.target.value)}
                    >
                                <MenuItem value="0"> Organic Chemistry-11</MenuItem>
                                <MenuItem value="1"> Physical Chemistry-11</MenuItem>
                                <MenuItem value="2"> Inorganic Chemistry-11</MenuItem>
                                <MenuItem value="3"> Organic Chemistry-12</MenuItem>
                                <MenuItem value="4"> Physical Chemistry-12</MenuItem>
                                <MenuItem value="5"> Inorganic Chemistry-12</MenuItem>
                    </TextField>
                    :
                    <TextField
                    id="standard-select-currency"
                    select
                    label="Select Tag"
                    className={classes.textField}
                    value={tag}
                    onChange={(event) =>setTag(event.target.value)}
                    >
                                <MenuItem value="0"> Trignometry</MenuItem>
                                <MenuItem value="1"> Calculus</MenuItem>
                                <MenuItem value="2"> Algebra</MenuItem>
                                <MenuItem value="3"> Coordinate Geometry</MenuItem>
                                <MenuItem value="4"> Vectors and 3D Geometry</MenuItem>
                    </TextField>)
                    }

                    {/* <TextField
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
                    </TextField> */}
                    
                    {/* <TextField
                    id="standard-number"
                    type="number"
                    label="Marks"
                    className={classes.textField}
                    value={marks}
                    InputProps={{
                         inputProps: { 
                            min: 1
                         }
                    }}
                    onChange={(event) =>event.target.value>=0?setMarks(event.target.value):null}
                    /> */}

                    {/* <TextField
                    id="standard-number"
                    type="number"
                    label="Negative Marking"
                    className={classes.textField}
                    value={negative}
                    InputProps={{
                         inputProps: { 
                            min: 1
                         }
                    }}
                    onChange={(event) =>event.target.value>=0?setNegative(event.target.value):null}
                    /> */}
                    
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

                    {answerType=="0"||answerType=="1"?[0,1,2,3].map((key,index)=>
                                        <div style={{border:'1px dashed black',width:'80%',padding:'20px',margin:'30px'}}>
                                        <FormLabel component="legend" style={{color:'black'}}>Option {index+1}</FormLabel>
                                        <TextTyper sendInfo={setOption} index={index} info={option} isOption={true}/>
                                        </div>
                                    )
                                    :null
                    }

                    {answerType=="0"?<TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select answer"
                                    className={classes.textField}
                                    value={answer}
                                    onChange={(event) =>setAnswer(Number(event.target.value))}
                                    >
                                        <MenuItem value="1"> 1</MenuItem>
                                        <MenuItem value="2"> 2</MenuItem>
                                        <MenuItem value="3"> 3</MenuItem>
                                        <MenuItem value="4"> 4</MenuItem>
                                    </TextField>
                                    :(answerType=="1"?<div style={{marginLeft:'30px'}}>
                                                    <FormLabel component="legend" style={{color:'black'}}>Correct Options</FormLabel>
                                                       <FormControlLabel checked={multiOption[0]} onChange={()=>handleCheck(0)} control={<Checkbox />} label="1" />
                                                       <FormControlLabel checked={multiOption[1]} onChange={()=>handleCheck(1)} control={<Checkbox />} label="2" />
                                                       <FormControlLabel checked={multiOption[2]} onChange={()=>handleCheck(2)} control={<Checkbox />} label="3" />
                                                       <FormControlLabel checked={multiOption[3]} onChange={()=>handleCheck(3)} control={<Checkbox />} label="4" />
                                                     </div>
                                                    :(answerType=="2"?<TextField
                                                                        id="standard-number"
                                                                        type="number"
                                                                        label="Enter Answer"
                                                                        className={classes.textField}
                                                                        value={answer}
                                                                        onChange={(event) =>setAnswer(Number(event.target.value))}
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
                    {/* <div style={{border:'1px dashed black',width:'80%',padding:'20px',margin:'30px'}}>
                    <FormLabel component="legend" style={{color:'black'}}>Hint</FormLabel>
                    <TextTyper sendInfo={setHint}/>
                    </div> */}
                    <div style={{border:'1px dashed black',width:'80%',padding:'20px',margin:'30px'}}>
                    <FormLabel component="legend" style={{color:'black'}}>Solution</FormLabel>
                    <TextTyper sendInfo={setSolution}/>
                    </div>
                </form>
            </div>
            <div style={{width:'40%',marginLeft:'25px'}}>
                <h3>Question</h3>
                <Preview data={question}/>
                {answerType=="0"||answerType=="1"?[1,2,3,4].map((item,index)=><>
                                                                 <h6>Option {index+1}</h6>
                                                                <Preview isOption={true} data={option[index]}/>
                                                           </>):null
                }
                <h3>Solution</h3>
                <Preview data={solution}/>
            </div>
        </div>
           
        </>
    )
}
