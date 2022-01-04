import { createStore, applyMiddleware, combineReducers } from 'redux'
import loggingMiddleware from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

//action types
const SET_CLIENTS = 'SET_CLIENTS' 
const SET_SKILLS = 'SET_SKILLS'

//action creators
const _setClients = (clients) => {
  return {
    type: SET_CLIENTS,
    clients
  }
}
const _setSkills = (skills) => {
  return {
    type: SET_SKILLS,
    skills
  }
}

//thunks
export const fetchClients = () => {
  return async(dispatch)=> {
    const data = (await axios('/api/clients')).data
    dispatch(_setClients(data))
  }
}
export const fetchSkills = () => {
  return async(dispatch)=> {
    const data = (await axios('/api/skills')).data
    dispatch(_setSkills(data))
  }
}

//reducers
const clientsReducer = (state = [], action) => {
  if(action.type === SET_CLIENTS) {
    return action.clients
  }
  
  return state;
}

const skillsReducer = (state = [], action) => {
  if(action.type === SET_SKILLS) {
    return action.skills
  }
  
  return state;
}

//combining reducers
const reducer = combineReducers({
  clients: clientsReducer,
  skills: skillsReducer
})

const store = createStore(reducer, applyMiddleware(thunk, loggingMiddleware))

export default store
