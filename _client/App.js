import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Agency from './Agency'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    return (
      <Router>
        <div id='main'>
          {/* <Agency /> */}
          <Route path='/' component={Agency} />
        </div>
      </Router>
    )
  }

}

export default (App)