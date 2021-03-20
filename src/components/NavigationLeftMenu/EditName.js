import React from 'react'
import firebase from 'firebase/app'
import {connect} from 'react-redux'
import {updateUserProfile} from '../../store/action/Authentication'
import '../../styles/leftMenu.css'
import CircularProgress from '@material-ui/core/CircularProgress';

export function EditName(props) {
    const [editedName,setEditedName]=React.useState(props.data?props.data:"Unnamed User")
    const [showError,setShowError]=React.useState(false)
    const [loading,setLoading]=React.useState(false)

    const editName=()=>{
        setLoading(true)
        let user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: editedName
        })
        .then(function() {
            props.updateUserProfile(user)
            setLoading(false)
            props.closeEdit()
        })
        .catch(function(error) {
            setLoading(false)
            setShowError(true)
            console.log("error",error)
        });
    }
    return (
        loading?<CircularProgress/>:
        <div>
            <input value={editedName} onChange={(e)=>setEditedName(e.target.value)} id="edit-name-input"/>
            {
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
                <div className="edit-button-section">
                    <button className="edit-button" onClick={editName}>
                        Save
                    </button>
                    <button className="edit-button" onClick={props.closeEdit}>
                        Cancel
                    </button>
                </div>
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


export default connect(mapStateToProps,mapDispatchToProps)(EditName)