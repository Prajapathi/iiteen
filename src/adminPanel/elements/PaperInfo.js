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
          date:props.subjectiwise==true?null:date,
          paperType:props.subjectiwise==true?null:Number(typeValue=="Mains"?1:2),
          totalMarks:props.subjectiwise==true?null:marks==''?0:Number(marks),
          noOfQuestions:props.subjectiwise==true?25:Number(noOfQuestions),
          totalDuration:props.subjectiwise==true?null:duration==''?0:Number(duration),
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
                                                <MenuItem value="Chapter 01">Basic Mathematics in physics</MenuItem>
                                                <MenuItem value="Chapter 02">Vectors, Units, Dimensions and Measurements</MenuItem>
                                                <MenuItem value="Chapter 03">Kinematics</MenuItem>
                                                <MenuItem value="Chapter 04">Laws of Motions and Friction</MenuItem>
                                                <MenuItem value="Chapter 05">Work, Energy and Power</MenuItem>
                                                <MenuItem value="Chapter 06">Centre of mass and collisions</MenuItem>
                                                <MenuItem value="Chapter 07">Rotational Motion</MenuItem>
                                                <MenuItem value="Chapter 08">Thermal Physics</MenuItem>
                                                <MenuItem value="Chapter 09">Gravitation</MenuItem>
                                                <MenuItem value="Chapter 10">Properties of matter</MenuItem>
                                                <MenuItem value="Chapter 11">Fluid Mechanics</MenuItem>
                                                <MenuItem value="Chapter 12">Simple Harmonic Motion</MenuItem>
                                                <MenuItem value="Chapter 13">Waves (String and Sound waves)</MenuItem>
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
                                                  <MenuItem value="Chapter 01">Mole concept</MenuItem>
                                                  <MenuItem value="Chapter 02">Atomic Structure</MenuItem>
                                                  <MenuItem value="Chapter 03">Periodic properties</MenuItem>
                                                  <MenuItem value="Chapter 04">Basic nomenclature</MenuItem>
                                                  <MenuItem value="Chapter 05">Chemical Bonding</MenuItem>
                                                  <MenuItem value="Chapter 06">Redox and equivalent concept</MenuItem>
                                                  <MenuItem value="Chapter 07">chemical Equilibrium</MenuItem>
                                                  <MenuItem value="Chapter 08">Organic nomenclature</MenuItem>
                                                  <MenuItem value="Chapter 09">Basic principles of practical Organic chem</MenuItem>
                                                  <MenuItem value="Chapter 10">Ionic equilibrium</MenuItem>
                                                  <MenuItem value="Chapter 11">s-block elements</MenuItem>
                                                  <MenuItem value="Chapter 12">GOC</MenuItem>
                                                  <MenuItem value="Chapter 13">Isomerism</MenuItem>
                                                  <MenuItem value="Chapter 14">Alkanes, Alkenes and Alkynes</MenuItem>
                                                  <MenuItem value="Chapter 15">Chemical Thermodynamics</MenuItem>
                                                  <MenuItem value="Chapter 16">Aromatic Hydrocarbon</MenuItem>
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
                                                  <MenuItem value="Chapter 01">Logarithms, Trignometric Ratios and identities</MenuItem>
                                                  <MenuItem value="Chapter 02">Quadratic equations and linear inequalities</MenuItem>
                                                  <MenuItem value="Chapter 03">Trignometric equations</MenuItem>
                                                  <MenuItem value="Chapter 04">Height and distance</MenuItem>
                                                  <MenuItem value="Chapter 05">Point and straight line</MenuItem>
                                                  <MenuItem value="Chapter 06">Circle</MenuItem>
                                                  <MenuItem value="Chapter 07">Sequence and series</MenuItem>
                                                  <MenuItem value="Chapter 08">Permutations and combination</MenuItem>
                                                  <MenuItem value="Chapter 09">Binomial Theorem</MenuItem>
                                                  <MenuItem value="Chapter 10">Principles of mathematical induction</MenuItem>
                                                  <MenuItem value="Chapter 11">Parabola, Ellipse and hyperbola</MenuItem>
                                                  <MenuItem value="Chapter 12">Functions, limits and derivatives</MenuItem>
                                                  <MenuItem value="Chapter 13">3-D geometry</MenuItem>
                                                  <MenuItem value="Chapter 14">Probability</MenuItem>
                                                  <MenuItem value="Chapter 15">Sets, realtions, statistics and mathematical reasoning</MenuItem>
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
                                                  <MenuItem value="Chapter 03">Capacitors</MenuItem>
                                                  <MenuItem value="Chapter 04">Magnetic effects of current</MenuItem>
                                                  <MenuItem value="Chapter 05">Magnetism and matter</MenuItem>
                                                  <MenuItem value="Chapter 06">Electromagnetic induction</MenuItem>
                                                  <MenuItem value="Chapter 07">Alternating Curretn(AC)</MenuItem>
                                                  <MenuItem value="Chapter 08">Ray optics and optical instruments</MenuItem>
                                                  <MenuItem value="Chapter 09">Wave optics</MenuItem>
                                                  <MenuItem value="Chapter 10">Electromagnetic Waves</MenuItem>
                                                  <MenuItem value="Chapter 11">Modern Physics</MenuItem>
                                                  <MenuItem value="Chapter 12">Practical Physics</MenuItem>
                                                  <MenuItem value="Chapter 13">Electronics and communication systems</MenuItem>
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
                                                  <MenuItem value="Chapter 01">Basic principles of organic chemistry</MenuItem>
                                                  <MenuItem value="Chapter 02">Chemical Thermodynamics and thermochem</MenuItem>
                                                  <MenuItem value="Chapter 03">GOC</MenuItem>
                                                  <MenuItem value="Chapter 04">Solid state</MenuItem>
                                                  <MenuItem value="Chapter 05">Chemical Kinetics</MenuItem>
                                                  <MenuItem value="Chapter 06">State of matter</MenuItem>
                                                  <MenuItem value="Chapter 07">Redox and equivalent concept</MenuItem>
                                                  <MenuItem value="Chapter 08">Nuclear chemistry</MenuItem>
                                                  <MenuItem value="Chapter 09">Co-ordination compound</MenuItem>
                                                  <MenuItem value="Chapter 10">Haloalkane</MenuItem>
                                                  <MenuItem value="Chapter 11">Aryl Halide(Substitution and Elimination)</MenuItem>
                                                  <MenuItem value="Chapter 12">Electrochemistry</MenuItem>
                                                  <MenuItem value="Chapter 13">Solution</MenuItem>
                                                  <MenuItem value="Chapter 14">Ores and Metallurgy</MenuItem>
                                                  <MenuItem value="Chapter 15">Organic Compounds containing oxygen and nitrogen</MenuItem>
                                                  <MenuItem value="Chapter 16">Qualitative Analysis</MenuItem>
                                                  <MenuItem value="Chapter 17">Biomolecules</MenuItem>
                                                  <MenuItem value="Chapter 18">Polymer</MenuItem>
                                                  <MenuItem value="Chapter 19">Practical Organic Chemistry</MenuItem>
                                                  <MenuItem value="Chapter 20">Chemistry in everyday life</MenuItem>
                                                  <MenuItem value="Chapter 21">Surface Chemistry</MenuItem>
                                                  <MenuItem value="Chapter 22">d and f block elements</MenuItem>
                                                  <MenuItem value="Chapter 23">p-block</MenuItem>
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
                                                  <MenuItem value="Chapter 01">Matrcies and Determinants</MenuItem>
                                                  <MenuItem value="Chapter 02">Functions and Inverse Trignometric Function</MenuItem>
                                                  <MenuItem value="Chapter 03">Differential Calculus</MenuItem>
                                                  <MenuItem value="Chapter 04">Indefinite Integration</MenuItem>
                                                  <MenuItem value="Chapter 05">Definite Integration</MenuItem>
                                                  <MenuItem value="Chapter 06">Application of derivatives</MenuItem>
                                                  <MenuItem value="Chapter 07">Vectors</MenuItem>
                                                  <MenuItem value="Chapter 08">Three Dimensional Geometry</MenuItem>
                                                  <MenuItem value="Chapter 09">Parabola, Ellipse and Hyperbola</MenuItem>
                                                  <MenuItem value="Chapter 10">Area under the curve</MenuItem>
                                                  <MenuItem value="Chapter 11">Differential Equations</MenuItem>
                                                  <MenuItem value="Chapter 12">Probability</MenuItem>
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
                }
            </div>
        </form>
    );
}
