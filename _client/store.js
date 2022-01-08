import { createStore, applyMiddleware, combineReducers } from 'redux'
import loggingMiddleware from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

//action types
const SET_CLIENTS = 'SET_CLIENTS' 
const SET_SKILLS = 'SET_SKILLS'
const SET_CLIENTSKILLS = 'SET_CLIENTSKILLS' 
const DELETE_CLIENTSKILL = 'DELETE_CLIENTSKILL'

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
const _setClientSkills = (skills) => {
  return {
    type: SET_CLIENTSKILLS,
    skills
  }
}
const _deleteClientSkill = (skill) => {
  return {
    type: DELETE_CLIENTSKILL,
    skill
  }
}

//thunks
export const fetchClients = () => {
  return async(dispatch)=> {
    const data = (await axios.get('/api/clients')).data
    dispatch(_setClients(data))
  }
}
export const fetchSkills = () => {
  return async(dispatch)=> {
    const data = (await axios.get('/api/skills')).data
    dispatch(_setSkills(data))
  }
}
export const fetchClientSkills = () => {
  return async(dispatch)=> {
    const data = (await axios.get(`/api/clientSkills`)).data
    dispatch(_setClientSkills(data))
  }
}
export const deleteClientSkill = (id, history) => {
  return async(dispatch)=> {
    const data = await axios.delete(`/api/${id}`)
    dispatch(_deleteClientSkill(data))
    // history.push('/')
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
const clientSkillsReducer = (state = [], action) => {
  if(action.type === SET_CLIENTSKILLS) {
    return action.skills
  }
  if(action.type === DELETE_CLIENTSKILL) {
    const mainState = state.filter(skill => skill.id !== action.skill.data.id)     
    return mainState 
  }
  
  return state;
}

//combining reducers
const reducer = combineReducers({
  clients: clientsReducer,
  skills: skillsReducer,
  clientSkills: clientSkillsReducer
})


const store = createStore(reducer, applyMiddleware(thunk, loggingMiddleware))

export default store
