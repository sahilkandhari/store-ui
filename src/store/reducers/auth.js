import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    token: null,
    id: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TOKEN:  
            return updateObject(state,{ 
                token: action.idToken,
                id: action.userId
            })

        case actionTypes.REMOVE_TOKEN:
            return updateObject(state,{ 
                token: action.idToken,
                id: action.userId
            })
        default: 
            return state
    }
}

export default authReducer