import React from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import {useParams, useHistory} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import PaperAnalysis from './PaperAnalysis'

export function Analysis(props) {
    const [loading,setLoading]=React.useState(false)
    
    const history=useHistory();

    let {paperType,paperName,mockpaperType}=useParams();
    paperType=paperType.toUpperCase()

    const [data,setData]=React.useState(0)
    const [paper,setPaper]=React.useState(0)
    const [questions,setQuestions]=React.useState(0)

    React.useEffect(() => {
        setLoading(true);

        //set the paper route for path
        let paperTypeRoute;
        switch(paperType){
            case "MOCKTEST":
                paperTypeRoute="MOCK"
                break;
            case "PREVIOUSYEAR":
                paperTypeRoute="PREVIOUS"
        }

        const db = firebase.firestore();

        //fetch answers given by user
        db.collection("User").doc(props.user.uid).collection(paperTypeRoute+"Papers").doc(mockpaperType).collection("PAPER").doc(paperName).get()
            .then(function(querySnapshot) {
                console.log("here's the questionPaper:",querySnapshot.data())
                if(querySnapshot.data()==null){
                    window.alert("Paper Does Not Exist!")
                    history.push('/')
                }
                else setData(querySnapshot.data());
                
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
                history.push("/QuestionsError")
            });

        //fetch paper details
        db.collection(paperTypeRoute).doc(mockpaperType).collection("PAPER").doc(paperName).get()
            .then(function(querySnapshot) {
                console.log("here's the questionPaper:",querySnapshot.data())
                if(querySnapshot.data()==null){
                    window.alert("Paper Does Not Exist!")
                    history.push('/')
                }
                else setPaper(querySnapshot.data())
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
                history.push("/QuestionsError")
            });

        //fetch questions
        db.collection(paperTypeRoute).doc(mockpaperType).collection("PAPER").doc(paperName).collection("question").get()
            .then(function(querySnapshot) {
                let qs=[];
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    qs.push(doc.data())
                });
                // if(!qs || qs.length){
                //     window.alert("Paper Does Not Exist!")
                //     history.push('/')
                // }
                // else{
                    qs.sort(function(a,b){return a.number-b.number});
                    setQuestions(qs)
                // }
                setLoading(false)
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
                history.push("/QuestionsError")
            });
    }, [])

    return (
        loading?
        <CircularProgress style={{margin:'25% 48%'}}/>:
        (
            (data===0 || paper===0 || questions===0)? <CircularProgress style={{margin:'25% 50%'}}/>:
            <PaperAnalysis paper={{...paper,questions:questions}} answers={data.answers}/>
        )
    )
}


const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.AuthReducer.isAuthenticated,
        user:state.AuthReducer.user
    }
}
export default connect(mapStateToProps)(Analysis)