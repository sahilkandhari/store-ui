import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Products from '../../components/Products/Products'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderButton from '../../components/Controls/OrderButton/OrderButton'
import Modal from '../../components/UI/Modal/Modal'
import Ordersummary from '../../components/OrderSummary/OrderSummmary'
import classes from '../ProductsContainer/ProductsContainer.css'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Checkout from '../../containers/Checkout/Checkout'
import Aux from '../../hoc/Auxi'
import Input from '../../components/UI/Input/Input'
import * as actions from '../../store/actions/index'
            

class ProductsContainer extends Component { 

    state={
        purchasing: false,
        continueCheckout: false,
        filterName: "veg"
    }

    // componentDidMount () {
    //     this.props.onInitCartPrices()
    // }

    updatePurchaseState (cart) {
            const sum = Object.keys(cart).map((ckey) => {
                return cart[ckey]
            })
            .reduce((sum,el) => {
                return sum + el
            },0)
            return sum > 0            
    }

    purchaseHandler = () =>  {
        if(this.props.isAuth) {
            this.setState({purchasing: true})    
        }else {
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false, continueCheckout : false})
    }

    purchaseContinueHandler = () => {
    this.setState({continueCheckout : true})
    }

    changeFilterHandler (filter) {
        this.setState({filterName : filter})
    }


     render () {
     
            const disabledInfo = {
                ...this.props.cartx
             };
            for ( let key in disabledInfo ) {
                disabledInfo[key] = disabledInfo[key] <= 0
            }
                 
            const elementConfig = { options : [{value: 'veg', displayValue: 'Vegetables'},
                                               {value: 'dairy', displayValue: 'Dairy'} ]}


            let orderSummary = <Ordersummary 
            cart={this.props.cartx} 
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>   

            const checkout = <Checkout
            purchaseCancelled={this.purchaseCancelHandler} />
            

            let HomePage = <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                <Products  
                productAdded={this.props.onProductAdded}
                productRemoved={this.props.onProductRemoved}
                disabled={disabledInfo}
                filter={this.state.filterName}
                />
                <div className={classes.Filterbar}>
                    <Input
                        key = "Filter"  elementType = 'select'
                        elementConfig = {elementConfig}
                        value={elementConfig.options.value}
                        changed= {(event) => this.changeFilterHandler(event.target.value)} />
                </div>
                <OrderButton isAuth={this.props.isAuth}
                purchasable={this.updatePurchaseState(this.props.cartx)} ordered={this.purchaseHandler}/>
            </Aux>

            if(this.props.cartx === null) {
                HomePage = <Spinner />
            }
            console.log(this.props.cartx)
            console.log(this.props.products)
        return (
            <div className={classes.Enclosing}>   
                {this.state.continueCheckout ? checkout : HomePage}             
             </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        cartx: state.productsContainer.cart,
        products:state.productsContainer.products,
        price: state.productsContainer.totalPrice,
        isAuth: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProductAdded: (name) => dispatch(actions.addProduct(name)),
        onProductRemoved: (name) => dispatch(actions.removeProduct(name)),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ProductsContainer,axios))
