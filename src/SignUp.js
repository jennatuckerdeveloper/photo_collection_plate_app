import React, {Component} from 'react'

export default class SignUp extends Component {
  render () {
    return (
      <div id='signUp'>
        <form id='signUpInputs' onSubmit={this.props.createNewUser}>
          <label htmlFor='firstName'>First name</label>
          <input name='firstName' id='firstName' type='text' placeholder='Enter text' onChange={this.props.handleChange} />
          <label htmlFor='lastName'>Last name</label>
          <input name='lastName' id='lastName' type='text' placeholder='Enter text' onChange={this.props.handleChange} />
          <label htmlFor='email'>Email</label>
          <input name='email' id='email' type='email' placeholder='Enter email address' onChange={this.props.handleChange} />
          <label htmlFor='phone'>Phone</label>
          <input name='phone' id='phone' type='text' placeholder='Enter text' onChange={this.props.handleChange} />
          <label htmlFor='password' >Password</label>
          <input name='password' id='password' type='password' placeholder='Enter password' onChange={this.props.handleChange} />
          <label htmlFor='avatar'>Avatar</label>
          <input name='avatar' id='avatar' type='text' placeholder='Try dropping a new image here or click to select file to upload.' onChange={this.props.handleChange} />
          <button>Sign up</button>
        </form>
        <div className='error'>{this.props.errorReport}</div>
      </div>
    )
  }
}
