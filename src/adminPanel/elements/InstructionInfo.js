import React,{useEffect} from 'react'
import InstructionPreview from './InstructionPreview'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const MainsDefaultInst=[
    {   data:"25 questions each for Physics, Chemistry & Maths",
        isLine: false,
        section:0,
        points:[]
    },
    {   data:"20 Objective Multiple Choice type Questions(MCQs) per subject",
        isLine: true,
        section:3,
        points:[
            {color:2,data:"4 Marks for correct Answer"},
            {color:1,data:"1 Negative mark for Incorrect Answer"},
            {color:3,data:"No Negative mark for Skipped Questions"}
            ]
    },
    {   data:"5 Numerical Type Questions per subject",
        isLine: false,
        section:2,
        points:[
            {color:2,data:"4 Marks for correct Answer"},
            {color:1,data:"No Negative marks for Incorrect answer or Skipped Questions"},
            {color:3,data:"Round off the answer to 2(two) decimal places;e.g. 3.45,-4.00,-156.10,0.12"}
            ]

    }
]
const AdvDefaultInst=[
    {   data:"18 questions each for Physics, Chemistry & Maths",
        isLine: false,
        section:0,
        points:[]
    },
    {   data:"Each Subject contains Three Parts: Part-A, Part-B, Part-C",
        isLine: true,
        section:0,
        points:[]
    },
    {   data:"Part-A contains 6 multiple choice questions. Each Question has 4 choices (A),(B),(C),(D) out of which only ONE is correct.",
        isLine: false,
        section:3,
        points:[
            {color:2,data:"3 Marks for correct Answer"},
            {color:1,data:"1 Negative mark for Incorrect Answer"},
            {color:3,data:"No Negative mark for Skipped Questions"}
            ]
    },
    {   data:"Part-B contains 6 multiple choice questions. Each Question has 4 choices (A),(B),(C),(D) out of which one or more is/are correct.",
        isLine: false,
        section:4,
        points:[
            {color:2,data:"4 Marks if all correct options are marked correct"},
            {color:2,data:"4 Marks if all correct options are marked correct"},
            {color:1,data:"-2 Negative mark for Incorrect combination of Answer marked"},
            {color:3,data:"No Negative mark for Skipped Questions"}
            ]
    },
    {   data:"Part-C contains 6 integer type questions. The answer to each question is a single digit integer ranging from 0 to 9.",
        isLine: false,
        section:1,
        points:[
            {color:2,data:"3 Marks for correct Answer"},
            {color:1,data:"-1 Negative mark for Incorrect Answer"},
            {color:3,data:"No Negative mark for Skipped Questions"}
            ]
    },
]

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

export default function InstructionInfo(props){
    const classes = useStyles();
    const [instructions,setInstructions]=React.useState(props.paperType?props.paperType==2?AdvDefaultInst:MainsDefaultInst:[]);
    const [changeType,setChangeType]=React.useState(false)

    useEffect(() => {
        setInstructions(props.paperType==2?AdvDefaultInst:MainsDefaultInst)
        setChangeType(!changeType)
    }, [props.paperType])

    const deleteInstruction = (index) => {
        const values=[...instructions];
        values.splice(index, 1);
        setInstructions(values)
    };

    const addInstruction = () => {
        setInstructions([...instructions,{
            heading:"",
            data:"",
            section:"",
            points:"",
            isLine:false
        }])
    };

    const setData=(d,index)=>{
        const inst=[...instructions]
        inst[index].data=d
        setInstructions(inst)
    }

    const setSection=(sec,index)=>{
        const inst=[...instructions]
        inst[index].section=sec
        setInstructions(inst)
    }

    const setLinebreak=(val,index)=>{
        const inst=[...instructions]
        inst[index].isLine=val=="true"?true:false
        setInstructions(inst)
    }

    const addSubpoint = (index) => {
        const inst=[...instructions]
        inst[index].points=[...inst[index].points,{data:'',color:1}]
        setInstructions(inst)
    };

    const deleteSubpoint = (index,number) => {
        const inst=[...instructions]
        const subp=[...instructions[index].points]
        subp.splice(number, 1);
        inst[index].points=subp
        setInstructions(inst)
    };

    const changeSubPointData=(index,number,event)=>{
        const inst=[...instructions]
        const subp=[...instructions[index].points]
        subp[number].data=event.target.value;
        inst[index].points=subp
        setInstructions(inst)
    }

    const changeSubPointColor=(index,number,event)=>{
        const inst=[...instructions]
        const subp=[...instructions[index].points]
        subp[number].color=event.target.value;
        inst[index].points=subp
        setInstructions(inst)
    }

    useEffect(() => {
        props.sendInfo(instructions)
    }, [instructions])

    return (
        <>
        <div style={{padding:'0px 3% 3%',display:'flex',width:'90%',margin:'auto'}}>
            <div style={{width:'50%'}}>
                {instructions.map((key,index)=>
                    <div style={{border:'1px dashed grey'}} key={index}>
                        <div style={{margin:'5px 20px'}}>{index+1}</div>
                        <div style={{padding:'30px 50px'}}>
                            <form className={classes.container} noValidate >
                                <TextField
                                id="standard-number"
                                label="Data"
                                multiline
                                className={classes.textField}
                                value={instructions[index]?instructions[index].data:''}
                                onChange={(event) =>setData(event.target.value,index)}
                                />
                                <TextField
                                id="standard-select-currency"
                                select
                                label="Select section"
                                className={classes.textField}
                                value={instructions[index]?instructions[index].section:0}
                                onChange={(event) =>setSection(Number(event.target.value),index)}
                                >
                                    <MenuItem value="0"> Main</MenuItem>
                                    <MenuItem value="1"> Integer</MenuItem>
                                    <MenuItem value="2"> Numerical</MenuItem>
                                    <MenuItem value="3"> Single Correct</MenuItem>
                                    <MenuItem value="4"> Multiple Correct</MenuItem>
                                    <MenuItem value="5"> Paragraph</MenuItem>
                                </TextField>

                                <FormLabel component="legend" style={{color:'black',marginTop:'15px',marginBottom:'-0px'}}>Sub-points</FormLabel>
                                
                                {instructions?(instructions[index].points?instructions[index].points.length==0?
                                            <div onClick={()=>addSubpoint(index)} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer',border:'1px solid gray'}}>+</div>
                                        :
                                        instructions[index].points.map((key,number)=>
                                            <div style={{display:'flex',alignItems:'center'}}>
                                                <TextField
                                                id="standard-select-currency"
                                                select
                                                style={{width:'100px',marginRight:'20px'}}
                                                label="Colour"
                                                value={instructions[index].points[number]?instructions[index].points[number].color:0}
                                                onChange={(event)=>changeSubPointColor(index,number,event)}
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
                                                value={instructions[index].points?instructions[index].points[number].data:''}
                                                onChange={(event)=>changeSubPointData(index,number,event)}
                                                size="small"
                                                /> 

                                                <div onClick={()=>addSubpoint(index)} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>+</div>
                                                
                                                <div onClick={instructions[index].points.length!=0?()=>deleteSubpoint(index,number):null} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>-</div>
                                            
                                            </div>
                                        )
                                            :null):null}
                                
                                <RadioGroup aria-label="gender" name="gender1" value={instructions[index].isLine==true?"true":"false"} onChange={(e)=>setLinebreak(e.target.value,index)}>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <FormLabel component="legend" style={{color:'black',marginRight:'25px'}}>Give line-break</FormLabel>
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </div> 
                                </RadioGroup>
                            </form>
                        </div>
                        <div onClick={instructions.length!=1?()=>deleteInstruction(index):null} 
                                    style={{margin:'-30px 14% 4% 14%',
                                    background:'#f23b38',
                                    width:'70%',
                                    cursor:'pointer',
                                    textAlign:'center',
                                    color:'white',
                                    border:'1px solid white',
                                    borderRadius:'20px'}}>
                                        Delete Instruction
                        </div>
                    </div>
                )}
                <div onClick={addInstruction} style={{margin:'3% 14%',
                    width:'70%',
                    cursor:'pointer',
                    textAlign:'center',
                    background:'#0fcf0c',
                    color:'white',
                    border:'1px solid white',
                    borderRadius:'20px'}}>
                    Add Instruction
                </div>
            </div>
            <InstructionPreview instructions={instructions}/>
        </div>
        </>
    )
}
