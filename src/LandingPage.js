import React, {Component} from 'react'

export default class LandingPage extends Component {
  render () {
    return (
      <div id='landing'>
        <h1>Photo site for Sallie and Jess</h1>
        <h4>Welcome to the photo sharing site for the wedding!</h4>
        <h5>Please log in or sign up to share your photos!</h5>
        <button onClick={this.props.toLogIn}>Log In</button>
        <button onClick={this.props.toSignUp}>Sign Up</button>
      </div>
    )
  }
}
