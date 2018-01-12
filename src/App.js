import React, { Component } from 'react'
import './App.css'
import Page from './Page.js'
import LandingPage from './LandingPage.js'
import LogInPage from './LogInPage.js'
import firebase from './firebase.js'

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
    this.handleChange = this.handleChange.bind(this)
    this.logIn = this.logIn.bind(this)
    this.setUser = this.setUser.bind(this)
    this.clearUser = this.clearUser.bind(this)
  }

  toLogIn () {
    this.setState({userLocation: LOG_IN})
  }

  logIn (e) {
    e.preventDefault()
    let userUID
    const setUser = this.setUser
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        firebase.auth().onAuthStateChanged(function (fbuser) {
          if (fbuser) {
            userUID = fbuser.uid
            setUser(userUID)
          } else {
            userUID = null
            setUser(userUID)
          }
        })
      )
      .catch(function (error) {
        var errorCode = error.code
        var errorMessage = error.message
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
        const onComplete = function (error) {
          if (error) {
            console.log('Operation failed')
          } else {
            console.log(' Operation completed')
          }
        }
        itemsRef.child(response.uid).set(item, onComplete)
      })
      .catch(function (error) {
        var errorCode = error.code
        var errorMessage = error.message
        console.log('catch ran', errorCode, errorMessage)
      })
    let userUID
    const setUser = this.setUser
    firebase.auth().onAuthStateChanged(function (fbuser) {
      if (fbuser) {
        userUID = fbuser.uid
        setUser(userUID)
      } else {
        userUID = null
        setUser(userUID)
      }
    })
    this.setState({userLocation: PROFILES})
  }

  render () {
    if (this.state.userLocation === LANDING) {
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
        <div id='signUp'>
          <form id='signUpInputs' onSubmit={this.handleSubmit}>
            <label htmlFor='firstName'>First name</label>
            <input name='firstName' id='firstName' type='text' placeholder='Enter text' onChange={this.handleChange} />
            <label htmlFor='lastName'>Last name</label>
            <input name='lastName' id='lastName' type='text' placeholder='Enter text' onChange={this.handleChange} />
            <label htmlFor='email'>Email</label>
            <input name='email' id='email' type='text' placeholder='Enter text' onChange={this.handleChange} />
            <label htmlFor='phone'>Phone</label>
            <input name='phone' id='phone' type='text' placeholder='Enter text' onChange={this.handleChange} />
            <label htmlFor='password' type='text'>Password</label>
            <input name='password' id='password' type='text' placeholder='Enter password' onChange={this.handleChange} />
            <label htmlFor='avatar'>Avatar</label>
            <input name='avatar' id='avatar' type='text' placeholder='Try dropping a new image here or click to select file to upload.' onChange={this.handleChange} />
            <button>Sign up</button>
          </form>
        </div>
      )
    } else if (this.state.userLocation === PROFILES) {
      return (
        <div>
          <Page
            logIn={this.toLogIn}
            user={this.state.user}
            clearUser={this.clearUser}
          />
        </div>
      )
    }
  }
}

export default App
