import React from 'react'
import ReactDOM from 'react-dom'
import App from '../_client/App'
import { Provider } from 'react-redux'
import store from '../_client/store'

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
)