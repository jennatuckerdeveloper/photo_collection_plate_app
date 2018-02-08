import { combineReducers, loop, Cmd } from 'redux-loop'
import { SET_USER, NEW_USER_INFO, ALL_PROFILES, PAGE_PROFILES, CHANGE_PAGE } from './actions.js'
import { push } from 'redux-little-router'

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

// const errorReport = (state = '', action) => {
//   switch (action.type) {
//     case REPORT_ERROR:
//       console.log(`${action.errorCode}: ${action.errorMessage}`)
//       return `${action.errorCode}: ${action.errorMessage}`
//     default:
//       return state
//   }

// }

const rootReducer = combineReducers({
  userData,
  currentPage,
  allUsers,
  pageUsers,
  perPage
})

export default rootReducer
