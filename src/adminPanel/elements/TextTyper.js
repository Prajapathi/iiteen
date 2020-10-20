import React,{useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function TextTyper(props) {
    const [array,setArray]=React.useState([{type:'',data:''}]);

    const addArray= (event) => {
        setArray([...array,{type:'',data:''}])
    };
    const deleteArray= (index) => {
        const values=[...array];
        values.splice(index, 1);
        setArray(values)
    };
    const changeArray=(index,event)=>{
        const values=[...array]
        values[index].data=event.target.value;
        setArray(values);
    }
    const setType=(event,index)=>{
        const values=[...array]
        values[index].type=event.target.value;
        setArray(values);
    }

    useEffect(() => {
        if(props.info!=null){
            const data=[...props.info];
            data[props.index]=array;
            props.sendInfo(data)
        }
        else
        props.sendInfo(array)
    }, [array])

    return (
        <div>
            {
                array.map((key,index)=>
                    <div style={{display:'flex',alignItems:'center'}}>
                                <TextField
                                id="standard-select-currency"
                                select
                                label="Type"
                                size="small"
                                style={{minWidth:'60px',marginRight:'30px'}}
                                 onChange={(event) =>setType(event,index)}
                                >
                                    <MenuItem value="0"> 0</MenuItem>
                                    <MenuItem value="1"> 1</MenuItem>
                                    <MenuItem value="2"> 2</MenuItem>
                                    <MenuItem value="3"> 3</MenuItem>
                                </TextField>
                                <TextField
                                id="standard-number"
                                multiline
                                value={array[index].data}
                                onChange={(event)=>changeArray(index,event)}
                                style={{minWidth:'300px'}}
                                /> 
                                <div onClick={(event)=>addArray(event)} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>+</div>
                                <div onClick={array.length!=1?()=>deleteArray(index):null} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>-</div>
                    </div>
                )
            }
        </div>
    )
}
