import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {combineReducers,createStore} from 'redux'
import Firebase, { FirebaseContext } from './Firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MockTestReducer from './store/reducer/MockTestReducer'

const rootReducer= combineReducers({
  MockTestReducer
})
const store=createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
