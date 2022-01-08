import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteClientSkill } from '../store'

class Client extends Component {

  render() {
    const props = this.props
    console.log(props)
    const {history, deleteClientSkill } = this.props;
    const client = props.client
    const stateSkills = props.state.skills

    //REMEMBER: Due to multiple renders, need to include a return null to keep errors away
    if(!client) {
      return null
    }
    

    //array of skills for select dropdown to only show what client doesn't already have
    const clientSkillArr = client.skills.reduce((acc,skill) => {
      acc.push(skill.skillName)
      return acc
    },[])

    return (
      <div>
      <div className='clientContainer'>
        <h2 className='clientHeader'>{client.clientName}</h2>
        <p>
          {client.skills.length !== 0 ? `${client.clientName} has the following skills:` : `${client.clientName} has NO skills.`}
        </p>
        <div>
          {client.skills.map((skill, idx) => { 
            {if(idx === client.skills.length - 1) {
              return <span key={skill.id}>{skill.skillName}.<button className='deleteBtn' onClick={()=>{ deleteClientSkill(skill.clientSkills.id, history) }}>x</button></span>
            } else {  
              return <span key={skill.id}>{skill.skillName}<button className='deleteBtn' onClick={()=>{ deleteClientSkill(skill.clientSkills.id, history) }}>x</button> and </span>
              }
            }  
          })}
        </div>
        <div className='selectContainer'>
          <select>
              {
                stateSkills.map((currSkill) =>  {
                  
                  if(!clientSkillArr.includes(currSkill.skillName)) return <option key={currSkill.id}>{currSkill.skillName}</option>
                  
                 })    
              }
          </select>
          <button className='addSkillBtn'>+</button>
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
      deleteClientSkill: (id) => dispatch(deleteClientSkill(id, history))
    }
  } 
)(Client)
