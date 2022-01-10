import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Skill extends Component {

  render() {
    return (
      <div className='formContainer'>
        <form id='skill-form' onSubmit={()=>{}}>
          <div className='form'>
            <input name='skillName' value={'test'} onChange={()=>{}}></input>
          </div>
          <div className='form'>
            <button type='submit' >Save</button>
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
