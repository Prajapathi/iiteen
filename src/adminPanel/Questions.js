import React,{useEffect} from 'react'
import firebase from 'firebase'
import {Link, useLocation,useHistory } from "react-router-dom";
import Question from './elements/Question'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Questions(props) {

    const location = useLocation();
    const history=useHistory();
    const [index,setIndex]=React.useState(0);
    const [questionArray,setQuestionArray]=React.useState([])
    const [loading,setLoading]=React.useState(false)
    
    const uploadImg=()=>{
        for(let i=0;i<questionArray.length;i++){
            for(let j=0;j<questionArray[i].question.length;j++){
                if(questionArray[i].question[j].type=="3"){
                    const url=HandleImageUpload(questionArray[i].question[j].data)
                    console.log("URL",url)
                     console.log(questionArray[i].question[j].data)
                     questionArray[i].question[j].data="URL";
                }
            }
            for(let j=0;j<questionArray[i].solution.length;j++){
                if(questionArray[i].solution[j].type=="3"){
                     console.log(questionArray[i].solution[j].data)
                     questionArray[i].solution[j].data="URL";
                }
            }
            for(let j=0;j<questionArray[i].hint.length;j++){
                if(questionArray[i].hint[j].type=="3"){
                    console.log(questionArray[i].hint[j].data)
                    questionArray[i].hint[j].data="URL";
                }
            }
            for(let j=0;j<questionArray[i].option.length;j++){
                for(let k=0;k<questionArray[i].option[j].length;k++){
                    if(questionArray[i].option[j][k].type=="3"){
                       console.log(questionArray[i].option[j][k].data) 
                       questionArray[i].option[j][k].data="URL";
                    }
                }
            }
        }
        savePaperFB();
    }
    const HandleImageUpload=(img)=>{
        const storage=firebase.storage();
        const uploadTask = storage.ref(`/images/${img.name}`).put(img)
        uploadTask.on('state_changed', 
            (snapShot) => {
            //takes a snap shot of the process as it is happening
            console.log(snapShot)
            }, (err) => {
            //catches the errors
            console.log(err)
            }, () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            storage.ref('images').child(img.name).getDownloadURL()
            .then(fireBaseUrl => {
                const imgURL=fireBaseUrl
                console.log("nice",imgURL)
                return imgURL
            })
        })
    }
    const savePaper=()=>{
        setLoading(true)
        uploadImg();
    }
    const savePaperFB=()=>{
        const db = firebase.firestore();
        
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection(`${props.paperRoute}/${props.paperRef}/Questions`).add({
                questionArray
        }).then((res)=>{
            setLoading(false);
            history.push('/AddPaper')
        }).catch((error)=>{
            console.log("Error saving the document: ",error);
        }) 
    }
    return (
        <>
            {loading==true?<CircularProgress style={{margin:'25% 50%'}}/>:
                    <div>
                    <Question key={index} index={index} infoArray={questionArray} sendInfo={setQuestionArray}/>
                    {index>0?<button style={{width:'60%',
                                                    height:'40px',
                                                    margin:'0px 20% 20px 20%',
                                                    background:'#388cf2',
                                                    color:'white',
                                                    border:'1px solid white',
                                                    borderRadius:'20px'
                                                    }}
                                                    onClick={()=>setIndex(index-1)}>
                                                        BACK
                                                    </button>:null}
                    {index<=(props.number-2)?
                                                    <button style={{width:'60%',
                                                    margin:'0px 20% 20px 20%',
                                                    background:'#388cf2',
                                                    color:'white',
                                                    border:'1px solid white',
                                                    borderRadius:'20px'
                                                    }}
                                                    onClick={()=>setIndex(index+1)}>
                                                        Continue
                                                    </button>
                                                    
                                                    :
                                                    <button style={{width:'60%',
                                                    height:'40px',
                                                    margin:'0px 20% 20px 20%',
                                                    background:'#388cf2',
                                                    color:'white',
                                                    border:'1px solid white',
                                                    borderRadius:'20px'
                                                    }}
                                                    onClick={savePaper}>
                                                        SAVE PAPER
                                                    </button>
                    }
                    </div>
            }
        </>
    )
}
