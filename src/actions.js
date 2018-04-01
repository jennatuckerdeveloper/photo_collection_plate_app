export const SET_USER = 'SET_USER'
export const NEW_USER_INFO = 'NEW_USER_INFO'
export const ALL_PROFILES = 'ALL_PROFILES'
export const PAGE_PROFILES = 'PAGE_PROFILES'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const LOG_IN = 'LOG_IN'
export const REPORT_ERROR = 'REPORT_ERROR'
export const CREATE_USER = 'CREATE_USER'
export const LOAD_USERS = 'LOAD_USERS'


export const logIn = () => ({ type: LOG_IN })

export const setUser = (user) => {
  return { type: SET_USER, UID: user.uid }
}

export const createNewUser = () => ({ type: CREATE_USER })

export const handleNewUserInfo = (event) => ({
    type: NEW_USER_INFO,
    field: event.target.name,
    entry: event.target.value
  })

export const loadUsers = () => ({type: LOAD_USERS})

export const setAllProfiles = (dataList) => {
  return {
    type: ALL_PROFILES,
    users: dataList
  }
}

export const setPageProfiles = (dataListSlice) => {
  return {
    type: PAGE_PROFILES,
    users: dataListSlice
  }
}

export const changePage = (newPage) => {
  return {
    type: CHANGE_PAGE,
    newPage
  }
}

export const reportError = (error) => {
  return {
    type: REPORT_ERROR,
    errorCode: error.code,
    errorMessage: error.message
  }
}
