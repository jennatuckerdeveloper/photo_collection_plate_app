import { combineReducers } from 'redux'

export const LANDING = 'landing'
export const LOG_IN = 'login'
export const SIGN_UP = 'signup'
export const PROFILES = 'profiles'
const PER_PAGE = 20

const initialUserData = {
  userID: null,
  firstName: null,
  lastName:  null,
  email: null,
  phone:  null,
  password:  null,
  avatar:  null

}


// remember to return a new object 
const userData = (state = initialUserData, action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({},state,{userID: action.UID})
    case 'NEW_USER_INFO':
      let newState = {}
      newState[action.field] = action.entry
      return Object.assign({}, state, newState)
    default:
      return state
  }
}

const userLocation = (state = LANDING, action) => {
  switch (action.type) {
    case 'TO_LOG_IN':
      return LOG_IN
    case 'TO_SIGN_UP':
      return SIGN_UP
    case 'TO_PROFILES':
      return PROFILES
    default:
      return state
  }
}

const currentPage = (state = 1, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return action.newPage
    default:
      return state
  }
}

const allUsers = (state = [], action) => {
  switch (action.type) {
    case 'ALL_PROFILES':
      return action.users
    default:
      return state
  }
}

const pageUsers = (state = [], action) => {
  switch (action.type) {
    case 'PAGE_PROFILES':
      return action.users
    default:
      return state
  }
}

const perPage = (state = PER_PAGE) => {
  return state
}

const rootReducer = combineReducers({
  userData,
  userLocation,
  currentPage,
  allUsers,
  pageUsers,
  perPage
})

export default rootReducer
