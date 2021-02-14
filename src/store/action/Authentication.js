import * as actionTypes from './actionTypes'
import firebase from 'firebase'

export const setAuthentication=(user)=>{
    return{
        type:actionTypes.SET_AUTHENTICATED_USER,
        payload:user
    }
}
export const signOut=()=>{
    return{
        type:actionTypes.SIGN_OUT
    }
}

export const verifyAuth = () => dispatch => {
  firebase
    .auth()
    .onAuthStateChanged(user => {
      if (user !== null) {
        dispatch(setAuthentication(user));
      }
      else dispatch(signOut())
    });
};