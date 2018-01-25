// Make one function to return each action object.
// Give each a type name that matches the name.
// Give other relevant paramaters as key-value pairs.  
// Export each one.  

export const toLogIn = () => {
    console.log('action toLogIn triggered')
    return {
        type: "TO_LOG_IN"
    }
    
}

export const decrement = () => {
    return {
        type: "DECREMENT"
    }
}