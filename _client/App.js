import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Agency from './components/Agency'
import { fetchClients, fetchSkills } from './store'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    this.props.loadClients()
    this.props.loadSkills()
  }


  render() {
    return (
      <Router>
        <div id='main'>
          <Route path='/' component={Agency} />
        </div>
      </Router>
    )
  }

}

export default connect(
  (state)=> {
    return state
  },
  (dispatch)=> {
    return {
      loadClients: ()=> dispatch(fetchClients()),
      loadSkills: ()=> dispatch(fetchSkills())
    }
  }
)(App)