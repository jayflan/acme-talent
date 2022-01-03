import React, { Component } from 'react'
import { connect } from 'react-redux'


class Agency extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className='listContainer'>
      <div>
        <ul>
          <h4 className='listHeader'>Clients</h4>
          <li>Moe(2)</li>
          <li>Larry(2)</li>
          <li>Curly(2)</li>
          <li>Ethyl(2)</li>
        </ul>
      </div>
      <div>
        <ul>
          <h4 className='listHeader'>Skills</h4>
          <li>juggling(1)</li>
          <li>smiling(1)</li>
          <li>shaving(2)</li>
        </ul>
      </div>
    </div>
    )
  }
}

export default (Agency)