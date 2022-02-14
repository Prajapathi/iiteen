import { combineReducers, createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import MockTestReducer from "./reducer/MockTestReducer";
import AuthReducer from "./reducer/AuthReducer";

//new code2
import AsyncStorage from "@react-native-async-storage/async-storage";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//new code3
// import returnStoreAndPersistor from '../../shared/redux/store';
// const {store} = returnStoreAndPersistor();
//

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
//

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
  AuthReducer,
});

//new code2
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);
let persistor = persistStore(store);
//

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)))

// store.subscribe(() => {
//   saveState(store.getState());
// });

export { store, persistor };
