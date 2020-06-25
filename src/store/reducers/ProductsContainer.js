import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'
import productsArray from '../../data/products'


let CART_ARRAY = []
let CART = {}
let PRODUCT_PRICES_ARRAY = []
let PRODUCT_PRICES= {}


productsArray.map((product) => {
    PRODUCT_PRICES_ARRAY.push({
        name : product.name,
        price : product.price
        })
    CART_ARRAY.push({
        name: product.name
    })
})

for(let i=0; i < CART_ARRAY.length; i++) {
    CART[CART_ARRAY[i].name] = 0
}

for(let i =0; i < PRODUCT_PRICES_ARRAY.length; i++) {
    PRODUCT_PRICES[PRODUCT_PRICES_ARRAY[i].name] = PRODUCT_PRICES_ARRAY[i].price
}
console.log(CART)
console.log(PRODUCT_PRICES)

const initialState = {
    cart: CART,
    totalPrice : 0,
}

const productsContainerReducer = (state = initialState ,action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT:  
            const updatedProduct = {[action.productName]: state.cart[action.productName] + 1}
            const updatedCart = updateObject(state.cart, updatedProduct) 
            const updatedState = {
                cart: updatedCart,
                totalPrice: state.totalPrice + PRODUCT_PRICES[action.productName]
            }
            return updateObject(state,updatedState)
            
        case actionTypes.REMOVE_PRODUCT:
            const updatedProd = {[action.productName]: state.cart[action.productName] - 1}
            const updatedC = updateObject(state.cart, updatedProd) 
            const updatedS = {
                cart: updatedC,
                totalPrice: state.totalPrice - PRODUCT_PRICES[action.productName]
            }
            return updateObject(state,updatedS)
        default: 
            return state
    }   
}

export default productsContainerReducer