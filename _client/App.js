import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Agency from './components/Agency'
import Client from './components/Client'
import { fetchClients, fetchSkills, fetchClientSkills } from './store'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    this.props.loadClients()
    this.props.loadSkills()
    this.props.loadClientSkills()
  }


  render() {
    return (
      <Router>
        <div id='main'>
        <Route exact path='/:id' component={Client} />
          <Route exact path='/' component={Agency} />
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
      loadSkills: ()=> dispatch(fetchSkills()),
      loadClientSkills: ()=> dispatch(fetchClientSkills())
    }
  }
)(App)