import { combineReducers, loop, Cmd } from 'redux-loop'
import { LOG_IN, SET_USER, NEW_USER_INFO, ALL_PROFILES, PAGE_PROFILES, CHANGE_PAGE, 
  REPORT_ERROR, CREATE_USER, LOAD_USERS, setUser, reportError, setAllProfiles, setPageProfiles } from './actions.js'
import { push } from 'redux-little-router'
import firebase from './firebase.js'

const PER_PAGE = 20

const initialUserData = {
  userID: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  password: null,
  avatar: null

}

const userData = (state = initialUserData, action) => {
  switch (action.type) {
    case SET_USER:
      return loop(
        Object.assign({}, state, {userID: action.UID}),
        Cmd.action(push('/profiles'))
      )

    case NEW_USER_INFO:
      const newState = {}
      newState[action.field] = action.entry
      return Object.assign({}, state, newState)
    default:
      return state
  }
}

const currentPage = (state = 1, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.newPage
    default:
      return state
  }
}

const allUsers = (state = [], action) => {
  switch (action.type) {
    case ALL_PROFILES:
      console.log('ALL_PROFILES case triggered')
      console.log('action', action)
      console.log('action.users', action.users)
      const fetchedUsers = action.users
      console.log('fetchedUsers', fetchedUsers)
      console.log(fetchedUsers.indexOf(0))
      console.log(fetchedUsers.length)
      console.log(Array.isArray(fetchedUsers))
      return loop(
        fetchedUsers,
        // stuck trying to pass a slice
        Cmd.action(setPageProfiles(fetchedUsers))
      )
    default:
      return state
  }
}

const pageUsers = (state = [], action) => {
  switch (action.type) {
    case PAGE_PROFILES:
      console.log('pageUsers action', action)
      return action.users
    default:
      return state
  }
}

const perPage = (state = PER_PAGE) => {
  return state
}

const errorReport = (state = '', action) => {
  switch (action.type) {
    case REPORT_ERROR:
      return `${action.errorCode}: ${action.errorMessage}`
    default:
      return ''
  }
}

const appReducer = combineReducers({
  userData,
  currentPage,
  allUsers,
  pageUsers,
  perPage, 
  errorReport
})

// Async actions
// ---------------------------------------------------------------------------
const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

const createFBUser = async (userData) => {
    const firebaseCreateUserResponse = await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
    const itemsRef = await firebase.database().ref('users')
    const item = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      avatar: userData.avatar
    }
    const onComplete = (error) => {
      if (error) {
        return 'Operation failed'
      } else {
        return ' Operation completed'
      }
    }
    const saveUserData = await itemsRef.child(firebaseCreateUserResponse.uid).set(item, onComplete)   
    let signedInUser
    await firebase.auth().onAuthStateChanged(user => {signedInUser = user})
    return signedInUser
}

const loadUsers = async () => {
    console.log('loop fired loadUsers in reducers')
    const usersRef = firebase.database().ref('users')
    // custom Firebase event listener on 'value' grabs info and updates when info added to db
    let newState = []
    usersRef.on('value', (snapshot) => {
      let users = snapshot.val()
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
    })
    return newState
  }

const rootReducer = (state, action) => {
  if (action.type === LOG_IN) {
    return loop(
      state,
      Cmd.run(login, {
        successActionCreator: setUser,
        failActionCreator: reportError,
        args: [state.userData.email, state.userData.password]
      }))
  } else if (action.type === CREATE_USER) {
    return loop(
      state,
      Cmd.run(createFBUser, {
        successActionCreator: setUser,
        failActionCreator: reportError,
        args: [state.userData]
      }

      )
    )
  } else if (action.type === LOAD_USERS) {
    console.log('case LOAD_USERS triggered line 161 reducers')
    return loop(
      state,
      Cmd.run(
        loadUsers, {
          successActionCreator: setAllProfiles,
          failActionCreator: reportError,
        }
      )
    )
  }
  return appReducer(state, action)
}

export default rootReducer
