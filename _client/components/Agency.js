import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Agency extends Component {
  
  render() {
    const clients = this.props.clients
    const skills = this.props.skills
    return (
      <div className='listContainer'>
      <div>
        <ul>
          <h4 className='listHeader'>Clients</h4>
            {clients.map(client => 
              <li key={client.id}>
                <Link to={`/${client.id}`}>
                  {`${client.clientName} (${client.skills.length})`}
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