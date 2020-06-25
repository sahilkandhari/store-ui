import * as actionTypes from './actionTypes'

export const addProduct = (name) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        productName: name
    }
}

export const removeProduct = (name) => {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        productName: name
    }
}