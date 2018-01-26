import { combineReducers } from 'redux'

const LANDING = 'landing'
const LOG_IN = 'login'
const SIGN_UP = 'signup'
const PROFILES = 'profiles'
const PER_PAGE = 20

const user = (state=null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.UID
        default:
            return state
    }
}

const userLocation = (state=LANDING, action) => {
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

const firstName = (state='x', action) => {
    switch (action.type) {
        case 'ACCEPT_FIRST_NAME':
            return action.entry
        default:
            return state
    }
}

const lastName = (state='x', action) => {
    switch (action.type) {
        case 'ACCEPT_LAST_NAME':
            return action.entry
        default:
            return state
    }
}

const email = (state='x', action) => {
    switch (action.type) {
        case 'ACCEPT_EMAIL':
            return action.entry
        default:
            return state
    }
}

const phone = (state='x', action) => {
    switch (action.type) {
        case 'ACCEPT_PHONE':
            return action.entry
        default:
            return state
    }
}

const password = (state='x', action) => {
    switch (action.type) {
        case 'ACCEPT_PASSWORD':
            return action.entry
        default:
            return state
    }
}

const avatar = (state='x', action) => {
    switch (action.type) {
        case 'ACCEPT_AVATAR':
            return action.entry
        default:
            return state
    }
}

const currentPage = (state=1, action) => {
    switch (action.type) {
        case 'CHANGE_PAGE':
            return action.newPage
        default:
            return state
    }
}

const allUsers = (state=[], action) => {
    switch (action.type) {
        case 'ALL_PROFILES':
            return action.users
        default: 
            return state
    }
}

const pageUsers = (state=[], action) => {
    switch (action.type) {
        case 'PAGE_PROFILES':
            return action.users
        default: 
            return state
    }
}

const perPage = (state=PER_PAGE) => {
    return state
}

const rootReducer = combineReducers({
    user,
    userLocation,
    firstName,
    lastName,
    email,
    phone,
    password,
    avatar, 
    currentPage,
    allUsers,
    pageUsers,
    perPage
})

export default rootReducer