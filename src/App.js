import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux';
import { initializeCurrentLocation, routerForBrowser, Fragment } from 'redux-little-router'
import rootReducer from './reducers.js'
import { combineReducers, install } from 'redux-loop'
import Main from './Main'
import './App.css'

const routes = {
  '/': {
    title: 'Landing'
  },
  '/signup': {
    title: 'Sign Up'
  },
  '/login': {
    title: 'Log In'
  },
  '/profiles': {
    title: 'Profiles'
  }
  //may end up with nested route on profiles for specific user or user-manager 
}

const { reducer, middleware, enhancer } = routerForBrowser({
  routes
})

const clientOnlyStore = createStore(
  combineReducers({ router: reducer, rootReducer }),
  {},
  compose(install(), enhancer, applyMiddleware(middleware))
)

const initialLocation = clientOnlyStore.getState().router
if (initialLocation) {
  clientOnlyStore.dispatch(initializeCurrentLocation(initialLocation))
}

class App extends Component {
  render () {
    return (
      <Provider store={clientOnlyStore}>
        <Fragment forRoute='/'>
            <Main />
        </Fragment>
      </Provider>
    )
  }
}

export default App
