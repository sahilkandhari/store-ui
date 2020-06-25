import React from 'react'
import { connect } from 'react-redux'
import CartControl from '../CartControls/CartControls' 
import classes from './CartSummary.css'
import * as actions from '../../../store/actions/ProductsContainer'

const cartSummary = (props) => {
     let sum = null
     const cartRender = Object.keys(props.cartx).map(cKey => {  
         sum = sum + props.cartx[cKey]   
         if(props.cartx[cKey] >= 1) {
            return (
                <div key={cKey}> 
                    <div>
                        <li>
                            <span>{cKey}</span> x {props.cartx[cKey]}
                        </li>
                    </div>
                    <div className={classes.Control}>
                    <CartControl 
                    added={() => props.onProductAdded(cKey)}
                    removed={() => props.onProductRemoved(cKey)}
                    />
                    </div>
                </div>    
            )    
         } 
        
    })
        return (
            <div className={classes.Cart}>
                {cartRender}
                <p>{sum} items in Cart</p>
            </div>
        )
        
}


const mapStateToProps = state => {
    return {
        cartx: state.productsContainer.cart,
        price: state.productsContainer.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProductAdded: (name) => dispatch(actions.addProduct(name)),
        onProductRemoved: (name) => dispatch(actions.removeProduct(name))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(cartSummary)