import React, { Component } from 'react'
import ProfilesPage from './ProfilesPage.js'
import LandingPage from './LandingPage.js'
import LogInPage from './LogInPage.js'
import SignUp from './SignUp.js'
import firebase from './firebase.js'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './actions.js'

import { LANDING, LOG_IN, SIGN_UP, PROFILES } from './reducers'

class Main extends Component {
  logIn = (e) => {
    e.preventDefault()
    let userUID
    const setUser = this.setUser
    firebase.auth().signInWithEmailAndPassword(this.props.userData.email, this.props.userData.password)
      .then((user) => {
        console.log(user)
        console.log('Then')
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
      .catch((error) => {
        console.log('Catch')
        const errorCode = error.code
        const errorMessage = error.message
        console.log('catch ran on logIn', errorCode, errorMessage)
        // this.props.actions.reportError(error)
      })
  }

  setUser = (userUID) => {
    if (userUID) {
      this.props.actions.setAUser(userUID)
      this.props.actions.toProfiles()
    } else {
      this.props.actions.toLogIn()
    }
  }

  handleChange = (e) => {
    this.props.actions.handleNewUserInfo(e)
  }

  createNewUser = (e) => {
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(this.props.userData.email, this.props.userData.password)
      .then((response) => {
        const itemsRef = firebase.database().ref('users')
        const item = {
          firstName: this.props.userData.firstName,
          lastName: this.props.userData.lastName,
          email: this.props.userData.email,
          phone: this.props.userData.phone,
          avatar: this.props.userData.avatar
        }
        const onComplete = (error) => {
          if (error) {
            console.log('Operation failed')
            // this.props.actions.reportError(error)
          } else {
            console.log(' Operation completed')
          }
        }
        itemsRef.child(response.uid).set(item, onComplete)
      })
      .catch((error) => {
        console.log('Catch')
        const errorCode = error.code
        const errorMessage = error.message
        console.log('catch ran on logIn', errorCode, errorMessage)
        // this.props.actions.reportError(error)
      })
    let userUID
    firebase.auth().onAuthStateChanged((fbuser) => {
      if (fbuser) {
        userUID = fbuser.uid
        this.setUser(userUID)
      } else {
        userUID = null
        this.setUser(userUID)
      }
    })
  }

  clearUser = () => {
    this.props.actions.setAUser(null)
  }

  render () {
    switch (this.props.userLocation) {
      case LANDING:
        return (
          <LandingPage
            toLogIn={this.props.actions.toLogIn}
            toSignUp={this.props.actions.toSignUp}
          />
        )
      case LOG_IN:
        return (
          <LogInPage
            handleChange={this.handleChange}
            logIn={this.logIn}
            // errorReport={this.props.errorReport}
          />
        )
      case SIGN_UP:
        return (
          <SignUp
            handleSubmit={this.createNewUser}
            handleChange={this.handleChange}
            // errorReport={this.props.errorReport}
          />
        )
      case PROFILES:
        return (
          <ProfilesPage
            logIn={this.toLogIn}
            userData={this.props.userData}
            clearUser={this.clearUser}
            setAllProfiles={this.props.actions.setAllProfiles}
            setPageProfiles={this.props.actions.setPageProfiles}
            allUsers={this.props.allUsers}
            changePage={this.props.actions.changePage}
            perPage={this.props.perPage}
            pageUsers={this.props.pageUsers}
            // errorReport={this.props.errorReport}
          />
        )
      default:
        console.log('no page')
        return (
          <div>No page</div>
        )
    }
  }
}

function mapStateToProps (state, prop) {
  return Object.assign({}, state)
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
