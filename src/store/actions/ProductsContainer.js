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
    console.log('in setproducts')
    console.log(prods)
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


// export const initProducts = () => {
//     return  dispatch => {
//         let imgx = null
//         const products_array = []
//          axios.get('http://localhost:4000/api/products')
//         .then((res) => {
//             for ( let key in res.data) {
//                 if( imagesArray[key].name === res.data[key].name) {
//                     imgx = imagesArray[key].img 
//                 }
//                 products_array.push({
//                     name: res.data[key].name,
//                     price: res.data[key].price,
//                     stock: res.data[key].stock,
//                     InStock: res.data[key].InStock,
//                     category: res.data[key].category,
//                     image: imgx
//                 })
//             }

//             let CART_ARRAY = []
//             let CART = {}
//             products_array.map((product) => {
//                 CART_ARRAY.push({
//                 name: product.name
//                 })
//             })
//         for(let i=0; i < CART_ARRAY.length; i++) {
//             CART[CART_ARRAY[i].name] = 0
//         }

//         let PRODUCT_PRICES_ARRAY = []
//         let PRODUCT_PRICES= {}
//         products_array.map((product) => {
//             PRODUCT_PRICES_ARRAY.push({
//                 name : product.name,
//                 price : product.price
//                 })
//         })
//         for(let i =0; i < PRODUCT_PRICES_ARRAY.length; i++) {
//             PRODUCT_PRICES[PRODUCT_PRICES_ARRAY[i].name] = PRODUCT_PRICES_ARRAY[i].price
//         }
//             console.log(CART)
//             dispatch(setProducts(products_array,CART,PRODUCT_PRICES))
//         }).catch((e) => {
//             dispatch(fetchProductsFail())
//         })
        
//     }
// }

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
            console.log(CART)
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

            const CART_ARRAY = []
            let CART = {}
            
            const PRODUCT_PRICES_ARRAY = []
            let PRODUCT_PRICES= {}

            const res = await axios.get('http://localhost:4000/api/products')


            for ( let key in res.data) {
                    if( imagesArray[key].name === res.data[key].name) {
                        imgx = imagesArray[key].img 
                    }
                    products_array.push({
                    name: res.data[key].name,
                    price: res.data[key].price,
                    stock: res.data[key].stock,
                    InStock: res.data[key].InStock,
                    category: res.data[key].category,
                    image: imgx
                    })
                    CART_ARRAY.push({
                        name: res.data[key].name
                        })
                    PRODUCT_PRICES_ARRAY.push({
                        name : res.data[key].name,
                        price : res.data[key].price
                    })  
                }
            console.log(products_array)
            for(let i =0; i < PRODUCT_PRICES_ARRAY.length; i++) {
                PRODUCT_PRICES[PRODUCT_PRICES_ARRAY[i].name] = PRODUCT_PRICES_ARRAY[i].price
                }
            for(let i=0; i < CART_ARRAY.length; i++) {
                CART[CART_ARRAY[i].name] = 0
                }

            dispatch(setProducts(products_array,CART,PRODUCT_PRICES))
        }catch( error) {
            dispatch(fetchProductsFail())
        }    
    }
}