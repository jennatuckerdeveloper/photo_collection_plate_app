import { combineReducers } from 'redux'

const LANDING = 'landing'
const LOG_IN = 'login'
const SIGN_UP = 'signup'
const PROFILES = 'profiles'

// There's one reducer for each value in state.
// Map the corresponding action.type for all relevant actions into that reducer.
// DO NOT MUTATE STATE.  RETURN A NEW OBJECT.  

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
        case 'placeholder':
            return 'placeholder'
        default:
            return state
    }
}

const lastName = (state='x', action) => {
    switch (action.type) {
        case 'placeholder':
            return 'placeholder'
        default:
            return state
    }
}

const email = (state='x', action) => {
    switch (action.type) {
        case 'placeholder':
            return 'placeholder'
        default:
            return state
    }
}

const phone = (state='x', action) => {
    switch (action.type) {
        case 'placeholder':
            return 'placeholder'
        default:
            return state
    }
}

const password = (state='x', action) => {
    switch (action.type) {
        case 'placeholder':
            return 'placeholder'
        default:
            return state
    }
}

const avatar = (state='x', action) => {
    switch (action.type) {
        case 'placeholder':
            return 'placeholder'
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user,
    userLocation,
    firstName,
    lastName,
    email,
    phone,
    password,
    avatar
})

export default rootReducer