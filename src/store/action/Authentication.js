import * as actionTypes from './actionTypes'
import firebase from 'firebase'

export const setAuthentication=(user)=>{
    return{
        type:actionTypes.SET_AUTHENTICATED_USER,
        payload:user
    }
}

//To set isChecking in state, to render loading component while authentication is being checked
export const checkingAuthenticatedUser=(isChecking)=>{
    return{
        type:actionTypes.CHECKING_AUTHENTICATED_USER,
        payload:isChecking
    }
}
export const signOut=()=>{
    return{
        type:actionTypes.SIGN_OUT
    }
}

export const verifyAuth = () => dispatch => {
    dispatch(checkingAuthenticatedUser(true))
  firebase
    .auth()
    .onAuthStateChanged(user => {
      if (user !== null) {
        dispatch(setAuthentication(user));
        dispatch(checkingAuthenticatedUser(false))
      }
      else{
          dispatch(signOut())
          dispatch(checkingAuthenticatedUser(false))
      }
    });
};

export const updateUserProfile=(user)=>{
    return{
        type:actionTypes.UPDATE_USER_PROFILE,
        payload:user
    }
}