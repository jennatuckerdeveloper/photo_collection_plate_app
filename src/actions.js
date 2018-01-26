export const toLogIn = () => {
    return {
        type: 'TO_LOG_IN'
    }
    
}

export const toSignUp = () => {
    return {
        type: 'TO_SIGN_UP'
    }
}

export const toProfiles = () => {
    return {
        type: 'TO_PROFILES'
    }
}

export const setAUser = (UID) => {
    return {
        type: 'SET_USER',
        UID
    }
}

export const firstName = (e) => {
    return {
        type: 'ACCEPT_FIRST_NAME',
        entry: e.target.value
    }
}
export const lastName = (e) => {
    return {
        type: 'ACCEPT_LAST_NAME',
        entry: e.target.value
    }
}
export const email = (e) => {
    return {
        type: 'ACCEPT_EMAIL',
        entry: e.target.value
    }
}
export const phone = (e) => {
    return {
        type: 'ACCEPT_PHONE',
        entry: e.target.value
    }
}
export const password = (e) => {
    return {
        type: 'ACCEPT_PASSWORD',
        entry: e.target.value
    }
}
export const avatar = (e) => {
    return {
        type: 'ACCEPT_AVATAR',
        entry: e.target.value
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