import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  smallTextField:{
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2),
    minWidth: 100,
  }
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
    const [toBeAttempted, setToBeAttempted]=React.useState(0);
    const [data,setData]=React.useState([]);
    const [subjectwiseClass,setSubjectwiseClass]=React.useState(11);
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
          date:props.subjectwise==true?null:date,
          paperType:props.subjectwise==true?null:Number(typeValue=="Mains"?1:2),
          totalMarks:props.subjectwise==true?null:marks==''?0:Number(marks),
          noOfQuestions:props.subjectwise==true?25:Number(noOfQuestions),
          toBeAttempted:props.subjectwise==true?25:Number(toBeAttempted),
          totalDuration:props.subjectwise==true?null:duration==''?0:Number(duration),
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
                                      id="standard-select-currency"
                                      select
                                      label="Select"
                                      value={subjectwiseClass}
                                      onChange={(event) =>setSubjectwiseClass(event.target.value)}
                                      helperText="Select Class"
                                      className={classes.smallTextField}
                                    >
                                        <MenuItem value="11"> 11</MenuItem>
                                        <MenuItem value="12"> 12</MenuItem>
                                    </TextField>
                                     {//For class 11th
                                        subjectwiseClass=="11"?
                                          subjectwiseSubject==1?
                                            <TextField
                                                id="standard-number"
                                                select
                                                label="Chapter Name"
                                                className={classes.textField}
                                                value={name}
                                                onChange={(event) =>setName(event.target.value)}
                                            >
                                                <MenuItem value="Chapter 01">Physics and Measurement</MenuItem>
                                                <MenuItem value="Chapter 02">Kinematics</MenuItem>
                                                <MenuItem value="Chapter 03">Laws of Motions and Friction</MenuItem>
                                                <MenuItem value="Chapter 04">Work, Energy and Power</MenuItem>
                                                <MenuItem value="Chapter 05">Centre of mass and collisions</MenuItem>
                                                <MenuItem value="Chapter 06">Rotational Motion</MenuItem>
                                                <MenuItem value="Chapter 07">Gravitation</MenuItem>
                                                <MenuItem value="Chapter 08">Properties of Solids and Liquids</MenuItem>
                                                <MenuItem value="Chapter 09">Thermodynamics</MenuItem>
                                                <MenuItem value="Chapter 10">Kinetic Theory of Gases</MenuItem>
                                                <MenuItem value="Chapter 11">Simple Harmonic Motion</MenuItem>
                                                <MenuItem value="Chapter 12">Waves (String and Sound waves)</MenuItem>
                                            </TextField>
                                          :subjectwiseSubject==2?
                                              <TextField
                                                  id="standard-number"
                                                  select
                                                  label="Chapter Name"
                                                  className={classes.textField}
                                                  value={name}
                                                  onChange={(event) =>setName(event.target.value)}
                                              >
                                                  <MenuItem value="Chapter 01">Some Basic Concepts of Chemistry</MenuItem>
                                                  <MenuItem value="Chapter 02">Atomic Structure</MenuItem>
                                                  <MenuItem value="Chapter 03">State of matter</MenuItem>
                                                  <MenuItem value="Chapter 04">Chemical Thermodynamics</MenuItem>
                                                  <MenuItem value="Chapter 05">Chemical Equilibrium</MenuItem>
                                                  <MenuItem value="Chapter 06">Ionic Equilibrium</MenuItem>
                                                  <MenuItem value="Chapter 07">Redox Reactions</MenuItem>
                                                  <MenuItem value="Chapter 08">Classification of Elements and Periodicity of Properties</MenuItem>
                                                  <MenuItem value="Chapter 09">Chemical Bonding and Molecular Structure</MenuItem>
                                                  <MenuItem value="Chapter 10">Hydrogen</MenuItem>
                                                  <MenuItem value="Chapter 11">s-block Elements</MenuItem>
                                                  <MenuItem value="Chapter 12">p-block elements (Group 13 and 14)</MenuItem>
                                                  <MenuItem value="Chapter 13">Some Basic Principles of Organic Chemistry</MenuItem>
                                                  <MenuItem value="Chapter 14">Isomerism in Organic Compounds</MenuItem>
                                                  <MenuItem value="Chapter 15">Classification, Purification and Nomenclature of Organic Compounds</MenuItem>
                                                  <MenuItem value="Chapter 16">Hydrocarbons</MenuItem>
                                                  <MenuItem value="Chapter 17">Environmental Chemistry</MenuItem>
                                              </TextField>
                                          :
                                              <TextField
                                                  id="standard-number"
                                                  select
                                                  label="Chapter Name"
                                                  className={classes.textField}
                                                  value={name}
                                                  onChange={(event) =>setName(event.target.value)}
                                              >
                                                  <MenuItem value="Chapter 01">Sets</MenuItem>
                                                  <MenuItem value="Chapter 02">Fundamentals of Relations and Functions</MenuItem>
                                                  <MenuItem value="Chapter 03">Sequence and Series</MenuItem>
                                                  <MenuItem value="Chapter 04">Complex Numbers</MenuItem>
                                                  <MenuItem value="Chapter 05">Inequalities and Quadratic Equation</MenuItem>
                                                  <MenuItem value="Chapter 06">Permutation and Combination</MenuItem>
                                                  <MenuItem value="Chapter 07">Mathematical Reasoning</MenuItem>
                                                  <MenuItem value="Chapter 08">Binomial Theorem</MenuItem>
                                                  <MenuItem value="Chapter 09">Trignometric Functions and Equations</MenuItem>
                                                  <MenuItem value="Chapter 10">Properties of Triangles, Heights and Distances</MenuItem>
                                                  <MenuItem value="Chapter 11">Cartesian System of Rectangular Coordinates</MenuItem>
                                                  <MenuItem value="Chapter 12">Straight line and pair of straight lines</MenuItem>
                                                  <MenuItem value="Chapter 13">Circle</MenuItem>
                                                  <MenuItem value="Chapter 14">Parabola</MenuItem>
                                                  <MenuItem value="Chapter 15">Ellipse</MenuItem>
                                                  <MenuItem value="Chapter 16">Hyperbola</MenuItem>
                                                  <MenuItem value="Chapter 17">Introduction to 3-D Geometry</MenuItem>
                                                  <MenuItem value="Chapter 18">Introduction to Limits and Derivatives</MenuItem>
                                                  <MenuItem value="Chapter 19">Mathematical Induction</MenuItem>
                                                  <MenuItem value="Chapter 20">Statistics</MenuItem>
                                                  <MenuItem value="Chapter 21">Fundamentals of Probability</MenuItem>
                                              </TextField>
                                          
                                        :
                                        (//For class 12th
                                          subjectwiseSubject==1?
                                            <TextField
                                                id="standard-number"
                                                select
                                                label="Chapter Name"
                                                className={classes.textField}
                                                value={name}
                                                onChange={(event) =>setName(event.target.value)}
                                            >
                                                  <MenuItem value="Chapter 01">Electrostatics</MenuItem>
                                                  <MenuItem value="Chapter 02">Current Electricity</MenuItem>
                                                  <MenuItem value="Chapter 03">Magnetic Effects of Current and Magnetism</MenuItem>
                                                  <MenuItem value="Chapter 04">Electromagnetic Induction and Alternating Currents</MenuItem>
                                                  <MenuItem value="Chapter 05">Electromagnetic Waves</MenuItem>
                                                  <MenuItem value="Chapter 06">Optics</MenuItem>
                                                  <MenuItem value="Chapter 07">Dual Nature of Matter and Radiation</MenuItem>
                                                  <MenuItem value="Chapter 08">Atoms and Nuclei</MenuItem>
                                                  <MenuItem value="Chapter 09">Electronic Devices</MenuItem>
                                                  <MenuItem value="Chapter 10">Communication Systems</MenuItem>
                                            </TextField>
                                          :subjectwiseSubject==2?
                                              <TextField
                                                  id="standard-number"
                                                  select
                                                  label="Chapter Name"
                                                  className={classes.textField}
                                                  value={name}
                                                  onChange={(event) =>setName(event.target.value)}
                                              >
                                                  <MenuItem value="Chapter 01">Solid state</MenuItem>
                                                  <MenuItem value="Chapter 02">Solutions</MenuItem>
                                                  <MenuItem value="Chapter 03">Electrochemistry</MenuItem>
                                                  <MenuItem value="Chapter 04">Chemical Kinetics</MenuItem>
                                                  <MenuItem value="Chapter 05">Nuclear Chemistry</MenuItem>
                                                  <MenuItem value="Chapter 06">Surface Chemistry</MenuItem>
                                                  <MenuItem value="Chapter 07">General Principles and Processes of Isolation of Elements</MenuItem>
                                                  <MenuItem value="Chapter 08">p-block Elements (Group 15,16,17,18)</MenuItem>
                                                  <MenuItem value="Chapter 09">d- and f-block elements</MenuItem>
                                                  <MenuItem value="Chapter 10">Coordinate Compounds</MenuItem>
                                                  <MenuItem value="Chapter 11">Organic Compounds containing Halogens</MenuItem>
                                                  <MenuItem value="Chapter 12">Alcohols, Phenols and Ethers</MenuItem>
                                                  <MenuItem value="Chapter 13">Aldehydes, Ketones and Carboxylic Acids</MenuItem>
                                                  <MenuItem value="Chapter 14">Organic Compounds Containing Nitrogen</MenuItem>
                                                  <MenuItem value="Chapter 15">Biomolecules, Polymers and Chemistry in Everyday Life</MenuItem>
                                                  <MenuItem value="Chapter 16">Principles related to Practical Chemistry</MenuItem>
                                              </TextField>
                                          :
                                              <TextField
                                                  id="standard-number"
                                                  select
                                                  label="Chapter Name"
                                                  className={classes.textField}
                                                  value={name}
                                                  onChange={(event) =>setName(event.target.value)}
                                              >
                                                  <MenuItem value="Chapter 01">Matrix</MenuItem>
                                                  <MenuItem value="Chapter 02">Determinants</MenuItem>
                                                  <MenuItem value="Chapter 03">Relations and Functions</MenuItem>
                                                  <MenuItem value="Chapter 04">Inverse Trignometric Functions</MenuItem>
                                                  <MenuItem value="Chapter 05">Continuity</MenuItem>
                                                  <MenuItem value="Chapter 06">Differentiation</MenuItem>
                                                  <MenuItem value="Chapter 07">Application of Derivatives</MenuItem>
                                                  <MenuItem value="Chapter 08">Maxima and Minima</MenuItem>
                                                  <MenuItem value="Chapter 09">Indefinite Integrals</MenuItem>
                                                  <MenuItem value="Chapter 10">Definite Integrals</MenuItem>
                                                  <MenuItem value="Chapter 11">Area bounded by Curves</MenuItem>
                                                  <MenuItem value="Chapter 12">Differential Equations</MenuItem>
                                                  <MenuItem value="Chapter 13">Vector Algebra</MenuItem>
                                                  <MenuItem value="Chapter 14">Three Dimensional Geometry</MenuItem>
                                                  <MenuItem value="Chapter 15">Linear Programming</MenuItem>
                                                  <MenuItem value="Chapter 16">Advanced Probability</MenuItem>
                                              </TextField>
                                        )
                                     }
                                </>
                            
                }
                
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
                                :
                                <>
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
                                 <TextField
                                  id="standard-number"
                                  type="number"
                                  label="Questions to be attempted"
                                  className={classes.textField}
                                  value={toBeAttempted}
                                  InputProps={{
                                                inputProps: { 
                                                min: 1
                                              }
                                  }}
                                  onChange={(event) =>event.target.value>=0?setToBeAttempted(event.target.value):null}
                                />
                                </>
                }
            </div>
        </form>
    );
}
