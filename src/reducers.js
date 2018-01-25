import { combineReducers } from 'redux'

const LANDING = 'landing'

// const initialState = {
//     user: null,
//     userLocation: LANDING,
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     avatar: ''
//   }

// Name one reducer for each value in state.
// Map the corresponding action.type for all relevant actions into that reducer.
// Return the resulting new state object.  
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
// Simply map all state value reducers to rootReducer 

const rootReducer = combineReducers({
    user,
    userLocation
})

export default rootReducer