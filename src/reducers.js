import { combineReducers } from 'redux'

const LANDING = 'landing'

// There's one reducer for each value in state.
// Map the corresponding action.type for all relevant actions into that reducer.
// DO NOT MUTATE STATE.  RETURN A NEW OBJECT.  

const user = (state={user: null}, action) => {
    switch (action.type) {
        case 'add':
            return Object.assign({}, state, state.user)
        default:
            return state
    }
}

const userLocation = (state={userLocation: LANDING}, action) => {
    switch (action.type) {
        case 'add':
            return Object.assign({}, state, state.user)
        default:
            return state
    }
}

const firstName = (state={firstName: 'x'}, action) => {
    switch (action.type) {
        case 'add':
            return Object.assign({}, state, state.firstName)
        default:
            return state
    }
}

const lastName = (state={lastName: 'x'}, action) => {
    switch (action.type) {
        case 'add':
            return Object.assign({}, state, state.lastName)
        default:
            return state
    }
}

const email = (state={email: 'x'}, action) => {
    switch (action.type) {
        case 'add':
            return Object.assign({}, state, state.email)
        default:
            return state
    }
}

const phone = (state={phone: 'x'}, action) => {
    switch (action.type) {
        case 'add':
            return Object.assign({}, state, state.phone)
        default:
            return state
    }
}

const password = (state={password: 'x'}, action) => {
    switch (action.type) {
        case 'add':
            return Object.assign({}, state, state.password)
        default:
            return state
    }
}

const avatar = (state={avatar: 'x'}, action) => {
    switch (action.type) {
        case 'add':
            return Object.assign({}, state, state.avatar)
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