import { combineReducers, createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import MockTestReducer from './reducer/MockTestReducer'
import AuthReducer from './reducer/AuthReducer'

//  new code
// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('state');
//     if(serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (e) {
//     return undefined;
//   }
// };

// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('state', serializedState);
//   } catch (e) {
//     // Ignore write errors;
//   }
// };

// const peristedState = loadState();


//


const rootReducer = combineReducers({
  MockTestReducer,
  AuthReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)))

// store.subscribe(() => {
//   saveState(store.getState());
// });


export default store;