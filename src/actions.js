export const TO_LOG_IN = 'TO_LOG_IN'
export const TO_SIGN_UP = 'TO_SIGN_UP'
export const TO_PROFILES = 'TO_PROFILES'
export const SET_USER = 'SET_USER'
export const ACCEPT_FIRST_NAME = 'ACCEPT_FIRST_NAME'
export const ACCEPT_LAST_NAME = 'ACCEPT_LAST_NAME'
export const ACCEPT_EMAIL = 'ACCEPT_EMAIL'


export const toLogIn = () => {
  return {
    type: TO_LOG_IN
  }
}

export const toSignUp = () => {
  return {
    type: TO_SIGN_UP
  }
}

export const toProfiles = () => {
  return {
    type: TO_PROFILES
  }
}

export const setAUser = (UID) => {
  return {
    type: SET_USER,
    UID
  }
}

export const handleNewUserInfo = (event) => {
  return {
    type: 'NEW_USER_INFO',
    field: event.target.name,
    entry: event.target.value
  }
}

export const setAllProfiles = (dataList) => {
  return {
    type: 'ALL_PROFILES',
    users: dataList
  }
}

export const setPageProfiles = (dataListSlice) => {
  return {
    type: 'PAGE_PROFILES',
    users: dataListSlice
  }
}

export const changePage = (newPage) => {
  return {
    type: 'CHANGE_PAGE',
    newPage
  }
}