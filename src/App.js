import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers.js'
import Main from './Main'
import './App.css'
const storeInstance = createStore(rootReducer)

class App extends Component {
  render () {
    return (
      <Provider store={storeInstance}>
        <Main />
      </Provider>
    )
  }
}

export default App
