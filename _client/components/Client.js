import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Client extends Component {


  render() {
    const { client, state } = this.props;
    const { clientName, skills } = client;
    const stateSkills = state.skills

    const clientSkillArr = skills.reduce((acc,skill) => {
      acc.push(skill.skillName)
      return acc
    },[])
  
    return (
      <div>
      <div className='clientContainer'>
        <h2 className='clientHeader'>{clientName}</h2>
        <p>
          {skills.length !== 0 ? `${clientName} has the following skills:` : `${clientName} has NO skills.`}
        </p>
        <div>
          {skills.map((skill, idx) => {
            if(idx === skills.length - 1) {
              return <span key={skill.id}>{skill.skillName}.<button className='deleteBtn'>x</button></span>
            } else {  
              return <span key={skill.id}>{skill.skillName}<button className='deleteBtn'>x</button> and </span>
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
  } 
)(Client)
