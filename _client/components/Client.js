import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Client extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    console.log(this.props)
    const {clientName, skills } = this.props
    return (
      // <hr></hr>
      <div className='clientContainer'>
        <h2 className='clientHeader'>{clientName}</h2>
        <p>
          {`${clientName} has the following skills:`}
        </p>
        <div>
          {skills.map((skill, idx) => {
            if(idx === skills.length - 1) {
              return <span key={skill.id}>{skill.skillName}.</span>
            } else {  
              return <span key={skill.id}>{skill.skillName} and </span>
            }  
          })}
        </div>
        <div className='backLink'>
          <Link to='/'>back to homepage</Link>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, { match }) => {
    const client = state.clients.find(currClient => currClient.id === match.params.id * 1)
    return {
      ...state, ...client
    }
  }
)(Client)
