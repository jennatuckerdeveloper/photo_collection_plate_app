import React, {Component} from 'react'
import { Link } from 'redux-little-router'

export default class LandingPage extends Component {
  render () {
    return (
      <div id='landing'>
        <h1>Photo site for Sallie and Jess</h1>
        <h4>Welcome to the photo sharing site for the wedding!</h4>
        <h5>Please log in or sign up to share your photos!</h5>
        <button>
          <Link className='littleLink' href='/login'>
            Log In
          </Link>
        </button>
        <button>
          <Link className='littleLink' href='/signup'>
            Sign Up
          </Link>
        </button>
      </div>
    )
  }
}
