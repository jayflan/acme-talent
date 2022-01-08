import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Skill extends Component {

  render() {
    return (
      <div>
        <hr></hr>
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
