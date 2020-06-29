import * as actionTypes from './actionTypes'
import imagesArray from '../../data/images'
import axios from 'axios'

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

export const setProducts = (prods) => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products: prods,
        loading: false
    }
}

export const fetchProductsFail = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        loading: false
    }
} 


export const setCartPrices = (CART,PRODUCT_PRICES) => {
    return {
        type: actionTypes.SET_CART_PRICES,
        cart: CART,
        prices: PRODUCT_PRICES,
    }
}

export const initCartPrices = () => {
    return  async dispatch => {
        try {
            const CART_ARRAY = []
            let CART = {}
            
            const PRODUCT_PRICES_ARRAY = []
            let PRODUCT_PRICES= {}

            const res = await axios.get('http://localhost:4000/api/products')

            for ( let key in res.data) {
                    CART_ARRAY.push({
                        name: res.data[key].name
                        })
                    PRODUCT_PRICES_ARRAY.push({
                        name : res.data[key].name,
                        price : res.data[key].price
                    })  
                }
            for(let i =0; i < PRODUCT_PRICES_ARRAY.length; i++) {
                PRODUCT_PRICES[PRODUCT_PRICES_ARRAY[i].name] = PRODUCT_PRICES_ARRAY[i].price
                }
            for(let i=0; i < CART_ARRAY.length; i++) {
                CART[CART_ARRAY[i].name] = 0
                }

            dispatch(setCartPrices(CART,PRODUCT_PRICES))
        }catch( error) {
            dispatch(fetchProductsFail())
        }    
    }
}

export const initProducts = () => {
    return  async dispatch => {
        try {
            let imgx = null
            const products_array = []

            const res = await axios.get('http://localhost:4000/api/products')

            dispatch(setProducts(products_array))

            for ( let key in res.data) {
                for(let i in imagesArray) {
                    if( imagesArray[i].name === res.data[key].name) {
                        imgx = imagesArray[i].img 
                    }
                }
                    products_array.push({
                    name: res.data[key].name,
                    price: res.data[key].price,
                    stock: res.data[key].stock,
                    InStock: res.data[key].InStock,
                    category: res.data[key].category,
                    image: imgx
                    })
                }
        }catch( error) {
            dispatch(fetchProductsFail())
        }    
    }
}