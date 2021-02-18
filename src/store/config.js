import {combineReducers,createStore,applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk';
import MockTestReducer from './reducer/MockTestReducer'
import AuthReducer from './reducer/AuthReducer'

const rootReducer= combineReducers({
  MockTestReducer,
  AuthReducer
})

const store=createStore(rootReducer, applyMiddleware(reduxThunk))

export default store;