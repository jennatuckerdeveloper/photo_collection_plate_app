import React, { Component } from 'react'
import ProfilesPage from './ProfilesPage.js'
import LandingPage from './LandingPage.js'
import LogInPage from './LogInPage.js'
import SignUp from './SignUp.js'
import firebase from './firebase.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Fragment } from 'redux-little-router'

import * as actions from './actions.js'

class Main extends Component {
  logIn = (e) => {
    e.preventDefault()
    this.props.actions.logIn()
  }

  handleChange = (e) => {
    this.props.actions.handleNewUserInfo(e)
  }

  createNewUser = (e) => {
    console.log('createNewUser')
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(this.props.rootReducer.userData.email, this.props.rootReducer.userData.password)
      .then((response) => {
        const itemsRef = firebase.database().ref('users')
        const item = {
          firstName: this.props.rootReducer.userData.firstName,
          lastName: this.props.userData.lastName,
          email: this.props.rootReducer.userData.email,
          phone: this.props.rootReducer.userData.phone,
          avatar: this.props.rootReducer.userData.avatar
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
        console.log('0000')
        userUID = fbuser.uid
        this.props.actions.setAUser(userUID)
      } else {
        console.log('234234')
        userUID = null
        this.props.actions.setAUser(userUID)
      }
    })
  }

  clearUser = () => {
    this.props.actions.setAUser(null)
  }

  render () {
    console.log('Main.js', this.props.rootReducer)
    return (
      <div>
        <Fragment forRoute='/'>
          <LandingPage />
        </Fragment>
        <Fragment forRoute='/login'>
          <LogInPage
            handleChange={this.handleChange}
            logIn={this.logIn}
            userData={this.props.rootReducer.userData}
            // errorReport={this.props.errorReport}
          />
        </Fragment>
        <Fragment forRoute='/signup'>
          <SignUp
            handleChange={this.handleChange}
            createNewUser={this.createNewUser}
            userData={this.props.rootReducer.userData}
            // errorReport={this.props.errorReport}
          />
        </Fragment>
        <Fragment forRoute='/profiles'>
          <ProfilesPage
            logIn={this.toLogIn}
            userData={this.props.rootReducer.userData}
            clearUser={this.clearUser}
            setAllProfiles={this.props.actions.setAllProfiles}
            setPageProfiles={this.props.actions.setPageProfiles}
            allUsers={this.props.rootReducer.allUsers}
            changePage={this.props.actions.changePage}
            perPage={this.props.rootReducer.perPage}
            pageUsers={this.props.rootReducer.pageUsers}
            // errorReport={this.props.errorReport}
          />
        </Fragment>
      </div>
    )
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
