import React, {Component} from 'react'
import firebase from './firebase.js'
import PageButtons from './PageButtons.js'

// console.log('redux user', this.props.user)
// console.log('redux userLocation', this.props.userLocation)
// console.log('redux firstName', this.props.firstName)
// console.log('redux lastName', this.props.lastName)
// console.log('readux email', this.props.email)
// console.log('redux phone', this.props.phone)
// console.log('redux password', this.props.password)
// console.log('redux avatar', this.props.avatar)

export default class ProfilesPage extends Component {
  constructor (props) {
    super(props)
    this.logOut = this.logOut.bind(this)
    this.changePage = this.changePage.bind(this)
    this.generatePage = this.generatePage.bind(this)
  }

  componentDidMount () {
    if (this.props.user) {
      const usersRef = firebase.database().ref('users')
      // custom Firebase event listener on 'value' grabs info and updates when info added to db
      usersRef.on('value', (snapshot) => {
        let users = snapshot.val()
        let newState = []
        for (let user in users) {
          newState.push({
            id: user,
            firstName: users[user].firstName,
            lastName: users[user].lastName,
            email: users[user].email,
            phone: users[user].phone,
            password: users[user].password,
            avatar: users[user].avatar
          })
        }
        this.props.setAllProfiles(newState)
        this.props.setPageProfiles(newState.slice(0,10))
      })
    }
  }

  logOut (e) {
    const clearUser = this.props.clearUser
    e.preventDefault()
    firebase.auth().signOut()
      .then(()=> {
        this.props.setAllProfiles([])
        this.props.setPageProfiles([])
      })
      .then(()=> clearUser())
      .catch(function (error) {
        console.log('catch ran on signOut', error)
      })
  }

  changePage (e) {
    const newPage = e.target.value
    this.props.changePage(newPage)
    this.generatePage(newPage)
  }

  generatePage (page) {
    const start = (page - 1) * this.props.perPage
    const end = page * this.props.perPage - 1
    const pageOfUsers = this.props.allUsers.slice(start, end)
    this.props.setPageProfiles(pageOfUsers)
  }

  render () {
    const profiles = this.props.pageUsers.map((element) => {
      return (
        <tr key={'profile' + element.id}>
          <td>{element.firstName}</td>
          <td>{element.lastName}</td>
          <td>{element.email}</td>
          <td>{element.number}</td>
          <td><img src={element.avatar} alt={`${element.firstName} ${element.lastName}`} /></td>
        </tr>
      )
    })
    const logButton = this.props.user ? <button onClick={this.logOut}>Log Out </button> : <button onClick={this.props.logIn}>Log In </button>
    return (
      <div className='App'>
        {logButton}
        <PageButtons
          changePage={this.changePage}
          dataLength={this.props.allUsers.length}
          perPage={this.props.perPage}
        />
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {profiles}
          </tbody>
        </table>
      </div>

    )
  }
}
