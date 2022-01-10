import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Skill extends Component {
  constructor() {
    super()
    this.state = {
      skillName: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    try {
      
    } catch(err) {
      console.log(err)
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value 
    })
  }

  render() {
    const { handleSubmit, handleChange } = this //REMEMBER <--must be destructed from this, not this.state!
    const { skillName } = this.state

    return (
      <div className='formContainer'>
        <form id='skill-form' onSubmit={handleSubmit}>
          <div className='form'>
            <input name='skillName' value={skillName} onChange={handleChange} /> {/*REMEMBER: can type after onChange set */}
          </div>
          <div className='form'>
            <button type='submit' disabled={ !skillName } >Save</button>
          </div>
          <div className='form'>
            <Link to='/'>Cancel</Link>
          </div>
        </form>
      </div>
    )
  }

}

export default connect(
  (state) => {
    
    return { state }
  },
  (dispatch) => {
    return {
      
    }
  } 
)(Skill)
