import { combineReducers, createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import MockTestReducer from './reducer/MockTestReducer'
import AuthReducer from './reducer/AuthReducer'

const rootReducer = combineReducers({
  MockTestReducer,
  AuthReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)))

export default store;