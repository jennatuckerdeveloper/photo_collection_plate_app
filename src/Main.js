import React, { Component } from 'react'
import ProfilesPage from './ProfilesPage.js'
import LandingPage from './LandingPage.js'
import LogInPage from './LogInPage.js'
import SignUp from './SignUp.js'
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
    e.preventDefault()
    this.props.actions.createNewUser()
  }

  clearUser = () => {
    this.props.actions.setUser(null)
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
