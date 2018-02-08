export const TO_LOG_IN = 'TO_LOG_IN'
export const TO_SIGN_UP = 'TO_SIGN_UP'
export const TO_PROFILES = 'TO_PROFILES'
export const SET_USER = 'SET_USER'
export const NEW_USER_INFO = 'NEW_USER_INFO'
export const ALL_PROFILES = 'ALL_PROFILES'
export const PAGE_PROFILES = 'PAGE_PROFILES'
export const CHANGE_PAGE = 'CHANGE_PAGE'
// export const REPORT_ERROR = 'REPORT_ERROR'

export const setAUser = (UID) => {
  return {
    type: SET_USER,
    UID
  }
}

export const handleNewUserInfo = (event) => {
  return {
    type: NEW_USER_INFO,
    field: event.target.name,
    entry: event.target.value
  }
}

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

// export const reportError = (error) => {
//   return {
//     type: REPORT_ERROR,
//     errorCode: error.code,
//     errorMessage: error.message
//   }
// }
