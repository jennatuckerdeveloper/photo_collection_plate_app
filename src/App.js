import React, { Component } from 'react'
import './App.css'
import ProfilesPage from './ProfilesPage.js'
import LandingPage from './LandingPage.js'
import LogInPage from './LogInPage.js'
import SignUp from './SignUp.js'
import firebase from './firebase.js'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './actions.js'

const LANDING = 'landing'
const LOG_IN = 'login'
const SIGN_UP = 'signup'
const PROFILES = 'profiles'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      userLocation: LANDING,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      avatar: ''
    }
    this.toLogIn = this.toLogIn.bind(this)
    this.toSignUp = this.toSignUp.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.logIn = this.logIn.bind(this)
    this.setUser = this.setUser.bind(this)
    this.clearUser = this.clearUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  toLogIn () {
    this.setState({userLocation: LOG_IN})
  }

  logIn (e) {
    e.preventDefault()
    let userUID
    const setUser = this.setUser
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase.auth().onAuthStateChanged((fbuser) => {
          if (fbuser) {
            userUID = fbuser.uid
            setUser(userUID)
          } else {
            userUID = null
            setUser(userUID)
          }
        })
      })
      .catch(function (error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('catch ran on logIn', errorCode, errorMessage)
      })
  }

  clearUser () {
    this.setState({user: null})
  }

  setUser (userUID) {
    let nextPage
    if (userUID) {
      nextPage = PROFILES
    } else {
      nextPage = LOG_IN
    }
    this.setState({user: userUID, userLocation: nextPage})
  }

  toSignUp () {
    this.setState({userLocation: SIGN_UP})
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        const itemsRef = firebase.database().ref('users')
        const item = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phone: this.state.phone,
          avatar: this.state.avatar
        }
        const onComplete = (error) => {
          if (error) {
            console.log('Operation failed')
          } else {
            console.log(' Operation completed')
          }
        }
        itemsRef.child(response.uid).set(item, onComplete)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('catch ran', errorCode, errorMessage)
      }
      )
    let userUID
    // const setUser = this.setUser // I think the arrow function does this.
    firebase.auth().onAuthStateChanged((fbuser) => {
      if (fbuser) {
        userUID = fbuser.uid
        this.setUser(userUID)
      } else {
        userUID = null
        this.setUser(userUID)
      }
    })
    this.setState({userLocation: PROFILES})
  }

  render () {
    if (this.state.userLocation === LANDING) {
      console.log('redux user', this.props.user)
      console.log('redux userLocation', this.props.userLocation)
      console.log('redux firstName', this.props.firstName)
      console.log('redux lastName', this.props.lastName)
      console.log('readux email', this.props.email)
      console.log('redux phone', this.props.phone)
      console.log('redux password', this.props.password)
      console.log('redux avatar', this.props.avatar)
      return (
        <LandingPage
          toLogIn={this.toLogIn}
          toSignUp={this.toSignUp}
        />
      )
    } else if (this.state.userLocation === LOG_IN) {
      return (
        <LogInPage
          toLogIn={this.toLogIn}
          handleChange={this.handleChange}
          logIn={this.logIn}
        />
      )
    } else if (this.state.userLocation === SIGN_UP) {
      return (
        <SignUp
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      )
    } else if (this.state.userLocation === PROFILES) {
      return (
        <ProfilesPage
          logIn={this.toLogIn}
          user={this.state.user}
          clearUser={this.clearUser}
        />
      )
    }
  }
}

function mapStateToProps (state, prop) {
  return {
    user: state.user,
    userLocation: state.userLocation,
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    phone: state.phone,
    password: state.password,
    avatar: state.avatar
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)