import React,{useEffect} from 'react'
import {Form} from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function TextTyper(props) {
    const [array,setArray]=React.useState(props.dataArray?(props.dataArray.length==0?[{type:1,data:''}]:props.dataArray):[{type:1,data:''}]);
    const addArray= (event,str) => {
        if(str=="LB"){
            setArray([...array,{type:0,data:''}])
        }
        else setArray([...array,{type:1,data:''}])
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
    const handleImageAsFile = (index,e) => {
        const values=[...array]
        values[index].data=e.target.files[0];
        setArray(values);
    }
    const setType=(event,index)=>{
        const values=[...array]
        values[index].type=Number(event.target.value);
        setArray(values);
    }
    useEffect(() => {
        if(props.isOption==true && props.dataArray.length!=0){
            let ar=[];
            ar[0]=props.dataArray[props.index]
            setArray(ar)
        }
    }, [])
    
    useEffect(() => {
        if(props.info!=null){
            const data=[...props.info];
            data[props.index]=array[0];
            props.sendInfo(data)
        }
        else
        props.sendInfo(array)
    }, [array])
    return (
        <div>
            {   
                
                array.map((key,index)=>
                    <div style={{display:'flex',alignItems:'center'}} key={index}>
                                <TextField
                                id="standard-select-currency"
                                select
                                label="Type"
                                size="small"
                                value={array[index]?array[index].type:1}
                                style={{minWidth:'60px',marginRight:'30px'}}
                                 onChange={(event) =>setType(event,index)}
                                >
                                    <MenuItem value="0">Line Break</MenuItem>
                                    <MenuItem value="1"> Text</MenuItem>
                                    <MenuItem value="2"> Formula</MenuItem>
                                    <MenuItem value="3"> Image</MenuItem>
                                </TextField>
                                {
                                    array[index].type==1||array[index].type==2?
                                            <TextField
                                            id="standard-number"
                                            multiline
                                            value={array[index].data}
                                            onChange={(event)=>changeArray(index,event)}
                                            style={{minWidth:'300px'}}
                                            /> 
                                        :(array[index].type=='3'?<div>
                                                                     <Form.File id="exampleFormControlFile1" style={{color:"white"}} onChange={(event)=>handleImageAsFile(index,event)} />
                                                                     
                                                                     <p>{array[index]?(array[index].data?array[index].data.name:"No file chosen"):"No file chosen"}</p>
                                                                </div>
                                                                :null)
                                }
                                {props.isOption?null:
                                <>
                                <div onClick={(event)=>addArray(event,null)} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>+</div>
                                <div onClick={array.length!=1?()=>deleteArray(index):null} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>-</div>
                                <div onClick={(event)=>addArray(event,"LB")} style={{marginRight:'10px',fontSize:'24px',cursor:'pointer'}}>LB</div>
                                </>
                                }
                    </div>
                )
            }
        </div>
    )
}
