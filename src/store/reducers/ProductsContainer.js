import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const CART = {
    Spinach:0,
    Carrot:0,
    Butter:0,
    Bread:0,
    Cheese:0
}


const initialState = {
    cart: {},
    prices: {},
    totalPrice : 0,
    products: [],
    error: false,
    loading: true,
}

const productsContainerReducer = (state = initialState ,action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT:  
            const updatedProduct = {[action.productName]: state.cart[action.productName] + 1}
            const updatedCart = updateObject(state.cart, updatedProduct) 
            const updatedState = {
                cart: updatedCart,
                totalPrice: state.totalPrice + state.prices[action.productName]
            }
            return updateObject(state,updatedState)
            
        case actionTypes.REMOVE_PRODUCT:
            const updatedProd = {[action.productName]: state.cart[action.productName] - 1}
            const updatedC = updateObject(state.cart, updatedProd) 
            const updatedS = {
                cart: updatedC,
                totalPrice: state.totalPrice - state.prices[action.productName]
            }
            return updateObject(state,updatedS)
        
        case actionTypes.SET_PRODUCTS : 
            return {
                ...state,
                products: action.products,
                error: false,
                loading: action.loading
            }
        case actionTypes.SET_CART_PRICES : 
            return {
                ...state,
                cart: action.cart,
                prices: action.prices
            }
        case actionTypes.FETCH_PRODUCTS_FAIL : 
            return {
                ...state,
                error: true,
                loading: action.loading
            }
        default: 
            return state
    }   
}

export default productsContainerReducer