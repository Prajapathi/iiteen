import React from 'react'
import firebase from 'firebase/app'
import {connect} from 'react-redux'
import {updateUserProfile} from '../../store/action/Authentication'
import CircularProgress from '@material-ui/core/CircularProgress';

export function EditImage(props) {
    const [showError,setShowError]=React.useState(false)
    const [loading,setLoading]=React.useState(false)

    const uploadImage=(e)=>{
        const image = e.target.files[0]
        setLoading(true)
        let user = firebase.auth().currentUser;
        const storage=firebase.storage();
        const uploadTask = storage.ref(`/UserProfileImages/${user.uid}/photoURL`).put(image)
            let t=uploadTask.on('state_changed', 
            (snapShot) => {
            }, (err) => {
            //catches the errors
            setShowError(true)
            console.log("upload error",err)
            }, () => {
            storage.ref(`/UserProfileImages/${user.uid}`).child("photoURL").getDownloadURL()
            .then(fireBaseUrl => {
                const imgURL=fireBaseUrl
                user.updateProfile({
                    photoURL:fireBaseUrl
                })
                .then(function() {
                    props.updateUserProfile(user)
                    setLoading(false)
                    props.closeEdit()
                })
                .catch(function(error) {
                    setShowError(true)
                    console.log("error",error)
                });
            })
        })
    }
    const removeImage=()=>{
        setLoading(true)
        let user = firebase.auth().currentUser;
        user.updateProfile({
            photoURL:null
        })
        .then(function() {
            props.updateUserProfile(user)
            setLoading(false)
            props.closeEdit()
        })
        .catch(function(error) {
            setShowError(true)
            console.log("error",error)
        });
    }

    return (
            <div>
                {loading?<CircularProgress style={{margin:'15px 45%'}}/>:
                    showError?
                            <>
                                <div className="edit-name-error">
                                    <div>An error occured. <br/>Please Try again later.</div>
                                    <button className="edit-button" onClick={props.closeEdit}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                    :
                <>
                    <div className="edit-option-button-section">
                        <div className="edit-option-button">
                            <input type="file" onChange={(e)=>uploadImage(e)} id="upload-user-image" hidden/>
                            <label htmlFor="upload-user-image" style={{margin:"0px",cursor:"pointer"}}>Upload Image</label>
                        </div>
                        <button className="edit-option-button" style={{background:"#FF1E1E",color:"white"}} onClick={removeImage}>
                            Remove Image
                        </button>
                    </div>
                    <button className="edit-option-button" style={{width:"80%",margin:"0px 10% 5px 10%"}} onClick={props.closeEdit}>
                        Cancel
                    </button>
                </>
                }
            </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.AuthReducer.isAuthenticated,
        user:state.AuthReducer.user
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        updateUserProfile:(user)=>dispatch(updateUserProfile(user))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(EditImage)