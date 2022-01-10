import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteClientSkill, createClientSkill } from '../store'

class Client extends Component {

  constructor(props) {
    super(props)
    this.state = {
      clientSkillId: ''
    }  
    this.handleChange = this.handleChange.bind(this);
    this.clearLocalState = this.clearLocalState.bind(this);
  }

clearLocalState() {
  this.setState({
    clientSkillId: ''
  })
}

//Methods for handling change events (dropdown menu)
handleChange(evt) {
  this.setState({
    clientSkillId: evt.target.value
  })
}  
  
  render() {
    const props = this.props
    const stateSkills = props.state.skills
    const {history, deleteClientSkill, createClientSkill } = this.props;
    const client = props.client

  //REMEMBER: Due to multiple renders, need to include a return null on client-state to keep errors away
  if(!client) {
    return null
  }

  //MESSY variables to arrange/merge state data
    //Array of ONLY client skills for this client in component state  
    const clientSkillIdArr = props.state.clientSkills.filter(skill => client.id === skill.clientId)
    //Array of ONLY skills with names for this client in component state
    const skillNamesArr = props.state.skills.reduce((acc, skill) => {
      clientSkillIdArr.forEach((clientSkill) => { 
        if(clientSkill.skillId === skill.id) acc.push(skill)  
      })
      return acc
    },[])

    //Array w/ merged data for output of skill names on client on page
    const outPutArr = clientSkillIdArr.reduce((acc, currClientSkill) => {
      const skillsName = skillNamesArr.find((currSkill) => currSkill.id === currClientSkill.skillId)
      acc.push({id: currClientSkill.id, skillId: currClientSkill.skillId, Name: skillsName.skillName })
      return acc
    }, [])

    //Array of skills for select dropdown to only show what client doesn't already have
    const clientSkillArr = outPutArr.reduce((acc,skill) => {
      acc.push(skill.Name)
      return acc
    },[])

    console.log(this.state)
    return (
      <div>
      <div className='clientContainer'>
        <h2 className='clientHeader'>{client.clientName}</h2>
        <p>
          {skillNamesArr.length !== 0 ? `${client.clientName} has the following skills:` : `${client.clientName} has NO skills.`}
        </p>
        <div>
          {outPutArr.map((skill, idx) => { 
            {if(idx === outPutArr.length - 1) {
              return <span key={skill.id}>{skill.Name}.<button className='deleteBtn' onClick={()=>{ deleteClientSkill(skill.id, history) }}>x</button></span>
            } else {  
              return <span key={skill.id}>{skill.Name}<button className='deleteBtn' onClick={()=>{ deleteClientSkill(skill.id, history) }}>x</button> and </span>
              }
            }  
          })}
        </div>
        <div className='selectContainer'>
          <select onChange={ this.handleChange }>
              {
                stateSkills.map((currSkill, idx) =>  {           
                  
                  if(!clientSkillArr.includes(currSkill.skillName)) return <option key={currSkill.id} name={'clientSkillId'} value={currSkill.id}>{currSkill.skillName}</option>
                  
                 })    
              }
          </select>
          <button className='addSkillBtn' disabled={!this.state.clientSkillId} onClick={()=>{ createClientSkill(client.id, this.state), this.clearLocalState() }}>+</button>
        </div>
        <div className='backLink'>
          <Link to='/'>back to homepage</Link>
        </div>
      </div>
      </div>
    )
  }
}

export default connect(
  (state, { match }) => {
    const client = state.clients.find(currClient => currClient.id === match.params.id * 1)
    return { state, client }
  },
  (dispatch, { history }) => {
    return {
      deleteClientSkill: (id) => dispatch(deleteClientSkill(id, history)),
      createClientSkill: (id, skill) => dispatch(createClientSkill(id, skill))
    }
  } 
)(Client)
