import { combineReducers, loop, Cmd } from 'redux-loop'
import { LOG_IN, SET_USER, NEW_USER_INFO, ALL_PROFILES, PAGE_PROFILES, CHANGE_PAGE, 
  CREATE_USER, setUser, reportError } from './actions.js'
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
      console.log('SET_USER action called', action)
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
      return action.users
    default:
      return state
  }
}

const pageUsers = (state = [], action) => {
  switch (action.type) {
    case PAGE_PROFILES:
      return action.users
    default:
      return state
  }
}

const perPage = (state = PER_PAGE) => {
  return state
}

const appReducer = combineReducers({
  userData,
  currentPage,
  allUsers,
  pageUsers,
  perPage
})

// Async actions
// ---------------------------------------------------------------------------
const login = (email, password) => {
  console.log('login function called by redux-loop', email, password)
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('.then firebase user', user)
      firebase.auth().onAuthStateChanged((fbuser) => {
        console.log('onAuthStateChanged fbuser', fbuser.uid)
        return fbuser ? fbuser.uid : null
      })
    })
}

const createFBUser = (userData) => {
    firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
    .then((response) => {
      const itemsRef = firebase.database().ref('users')
      const item = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        avatar: userData.avatar
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
    .then((user) => {
      firebase.auth().onAuthStateChanged((fbuser) => {
        return fbuser ? fbuser.uid : null
      })
    })
}



const rootReducer = (state, action) => {
  console.log(state, action)
  if (action.type === LOG_IN) {
    console.log('LOG_IN action fired')
    return loop(
      state,
      Cmd.run(login, {
        successActionCreator: setUser,
        failActionCreator: reportError,
        args: [state.userData.email, state.userData.password]
      })) // redux-loop takes the return from login and passes that to the follow-up action.  That's crazy.
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
  }
  return appReducer(state, action)
}

export default rootReducer
