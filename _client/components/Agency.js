import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Agency extends Component {
  
  render() {
    const clients = this.props.clients
    const skills = this.props.skills
    const clientSkills = this.props.clientSkills

  //Merge function w/ both client names and clientSkills
    const clientSkillsAndNamesArr = (objNames, objSkills) => {
      return objSkills.reduce((acc, currSkill) => {
        objNames.find((currClient) => {
          if(currClient.id === currSkill.clientId) 
            acc.push(
            {clientId: currSkill.clientId, 
              clientName: currClient.clientName}
            )
        })
        return acc
      }, [])
    }
  
    //sum function for client skills
    const sumClientSkills = (clientId, clientSkillsArr) => {
      return clientSkillsArr.reduce((acc, currSkill) => {
        currSkill.clientId === clientId ? acc++ : ''
        return acc
      }, 0)
    }
    console.log(sumClientSkills(1, clientSkills))
    return (
      <div className='listContainer'>
      <div>
        <ul>
          <h4 className='listHeader'>Clients</h4>
            {clients.map(client => 
              <li key={client.id}>
                <Link to={`/client/${client.id}`}>
                  {`${client.clientName} (${sumClientSkills(client.id,clientSkills)})`}
                </Link>
              </li>
            )}
        </ul>
      </div>
      <div>
        <ul>
          <h4 className='listHeader'>Skills</h4>
          {skills.map(skill => 
              <li key={skill.id}>
                {`${skill.skillName} (${skill.clients.length})`}
              </li>
            )}
        </ul>
      </div>
    </div>
    )
  }
}

export default connect(
  (state) => {
    return state;
  }
)(Agency)