import * as actionTypes from './actionTypes'

export const addToken = (token,id) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('userId', id)
    return {
        type: actionTypes.ADD_TOKEN,
        idToken: token,
        userId: id 
    }
}

export const removeToken = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.REMOVE_TOKEN,
        idToken: null,
        userId: null
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('authToken')
        const id = localStorage.getItem('userId')
        if(!token) {
            dispatch(removeToken())
        }else {
            dispatch(addToken(token,id))
        }
    }
}