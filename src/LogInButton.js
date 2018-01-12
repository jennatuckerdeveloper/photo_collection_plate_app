import React, {Component} from 'react'

export default class LogInButton extends Component {
  render () {
    return (
      <button onClick={this.props.logIn}>Log In</button>
    )
  }
}
