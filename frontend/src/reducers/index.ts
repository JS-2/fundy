import { combineReducers, createStore } from 'redux';
import userReducer from './user'
import { IUserState } from '../common/types'

export interface rootState {
    userReducer: IUserState;
}

const rootReducer = combineReducers({
    userReducer,
});

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState')!)
    : { userReducer:{ user:null, token:null } }
  
const store = createStore(rootReducer, persistedState);


store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;