import React, {Component} from 'react'

export default class LogInPage extends Component {
  render () {
    return (
      <div id='logIn' >
        <form id='logInInputs' onSubmit={this.props.logIn}>
          <label htmlFor='email'>Email</label>
          <input name='email' id='email' type='text' placeholder='Enter text' onChange={this.props.handleChange} />
          <label htmlFor='password' type='text'>Password</label>
          <input name='password' id='password' type='text' placeholder='Enter password' onChange={this.props.handleChange} />
          <button onClick={this.logIn}>Log In</button>
        </form>
      </div>
    )
  }
}
