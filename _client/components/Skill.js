import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateSkill } from '../store'

class Skill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skillName: this.props.skill ? this.props.skill.skillName : '' //REMEMBER <-- May need prevProps flag via compdidupdate due to late render!!!!
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps) { //REMEMBER <-- may not need all the time, though always needed if no prevProps to load first!!!
    if(!prevProps.skill && this.props.todo) {
      const { skillName } = this.props.skill
      this.setState({skillName})
    }
  }


  async handleSubmit(evt) {
    evt.preventDefault()
    try {
      const { skill } = this.props;
      await this.props.updateSkill(skill.id, {...this.state}) //REMEMBER <--splayed seems to work best, object needed for req.body?
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
    console.log(this.props)

    return (
      <div className='formContainer'>
        <form id='skill-form' onSubmit={handleSubmit}>
          <div className='form'>
            <input name='skillName' value={skillName} onChange={handleChange} /> {/*REMEMBER: can type after onChange set */}
          </div>
          <div className='form'>
            <button type='submit' disabled={ !skillName } >Update</button>
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
  (state, { match }) => {
    const skill = state.skills.find(skill => skill.id === match.params.id * 1)
    return {
      skill
    }
},
  (dispatch, { history }) => {
    return {
      updateSkill: (id, skill) => dispatch(updateSkill(id, skill, history))
    }
  } 
)(Skill)
