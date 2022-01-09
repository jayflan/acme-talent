import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteClientSkill } from '../store'

class Client extends Component {

  render() {
    const props = this.props
    const {history, deleteClientSkill } = this.props;
    const client = props.client
    const stateSkills = props.state.skills

    //Client related data from each model
      //aleady have a 'client' from Client model
      const clientSkillIdArr = props.state.clientSkills.filter(skill => client.id === skill.clientId)
      const skillNamesArr = props.state.skills.reduce((acc, skill) => {
        clientSkillIdArr.forEach((clientSkill) => { 
          if(clientSkill.skillId === skill.id) acc.push(skill)  
        })
        return acc
      },[])
      console.log(clientSkillIdArr)
      console.log(skillNamesArr)

      const outPutArr = clientSkillIdArr.reduce((acc, currClientSkill) => {
        const skillsName = skillNamesArr.find((currSkill) => currSkill.id === currClientSkill.skillId)
        acc.push({id: currClientSkill.id, skillId: currClientSkill.skillId, Name: skillsName.skillName })
        return acc
      }, [])
      console.log(outPutArr)
    //REMEMBER: Due to multiple renders, need to include a return null to keep errors away
    if(!client) {
      return null
    }
    

    //array of skills for select dropdown to only show what client doesn't already have
    const clientSkillArr = outPutArr.reduce((acc,skill) => {
      acc.push(skill.Name)
      return acc
    },[])
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
