import * as actionTypes from '../action/actionTypes'
import firebase from 'firebase'


//initial state
const initValues={
    isAuthenticated:false,
    isChecking:true,
    user:{},
}

const setAuthenticatedUser=(state,action)=>{
    console.log("YES,Authenticated",action.payload)
    return{
        ...state,
        isAuthenticated:true,
        user:action.payload
    }
}

const checkingAuthenticatedUser=(state,action)=>{
    return{
        ...state,
        isChecking:action.payload
    }
}

const updateUserProfile=(state,action)=>{
    console.log("User updated")
    return{
        ...state,
        user:action.payload
    }
}

const signOut=(state,action)=>{
    console.log("SIGNOUT FROM REDUCER")
    return {
        ...state,
        isAuthenticated:false,
        user:{}
    }
}

const AuthReducer=(state=initValues,action)=>{
    switch (action.type) {
        case actionTypes.SET_AUTHENTICATED_USER:
            return setAuthenticatedUser(state,action)
        case actionTypes.CHECKING_AUTHENTICATED_USER:
            return checkingAuthenticatedUser(state,action)
        case actionTypes.SIGN_OUT:
            return signOut(state,action)
        case actionTypes.UPDATE_USER_PROFILE:
            return updateUserProfile(state,action)
        default:
            return state
    }
}

export default AuthReducer;