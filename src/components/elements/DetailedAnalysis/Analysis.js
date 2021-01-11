import React from 'react'
import firebase from 'firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import PaperAnalysis from './PaperAnalysis'

export default function Analysis() {
    const [loading,setLoading]=React.useState(false)
    const [data,setData]=React.useState(0)
    const [paper,setPaper]=React.useState(0)
    const [questions,setQuestions]=React.useState(0)

    React.useEffect(() => {
        setLoading(true);
        
        const db = firebase.firestore();
        db.collection("User").doc("MT2").get()
            .then(function(querySnapshot) {
                console.log("here's the analysis:",querySnapshot.data())
                setData(querySnapshot.data());
                
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        db.collection("MOCK").doc("MT2").get()
            .then(function(querySnapshot) {
                console.log("here's the analysis:",querySnapshot.data())
                setPaper(querySnapshot.data())
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        db.collection("MOCK").doc("MT2").collection("Questions").get()
            .then(function(querySnapshot) {
                let qs=[];
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    qs.push(doc.data())
                });
                qs.sort(function(a,b){return a.number-b.number});
                setQuestions(qs)
                setLoading(false)
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
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
