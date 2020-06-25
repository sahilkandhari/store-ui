import React, { Component } from 'react';
import axios from 'axios'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';

let products_array = []

class Checkout extends Component {
    
    state = {
        done: false,
        check: false
    }

     checkoutCancelledHandler = () => {
       this.props.purchaseCancelled()
    }

    distibuteCart = (cart) => {
        for(let key in cart) {
            if(cart[key] >= 1)
            products_array.push({
                productName: key,
                quantity: cart[key]
            })
        }
        console.log(products_array)
        return products_array
    }


     checkoutContinuedHandler = () => {
        const order = {
            orders: {
                orderId: Math.random().toFixed(2)*100,
                date: new Date(),
                status: "pending",
                price: this.props.price,
                items: [{
                    products : this.distibuteCart(this.props.cartx)
                }]
            }
        }
        let updatedStock = null
        let updatedObj = null
        for ( let key in this.props.cartx) {
            if(this.props.cartx[key] >= 1) {
                axios.get('http://localhost:4000/api/products/' + key).then(res => {
                 return updatedStock = {...res.data[0]}.stock - this.props.cartx[key]
            }).then((updatedStock) => {
                if(updatedStock <= 0) {
                    updatedObj = {stock: updatedStock, InStock : false}
                }else{
                    updatedObj = {stock : updatedStock}
                }
                axios.patch( 'http://localhost:4000/api/products/' + key, updatedObj)
                .then( response => {
                    console.log({...response.data})
                })
                .catch( error => {
                    console.log(error);
                });
            }).then(() => {
                const header = {'Authorization' : 'Bearer ' + this.props.authToken}
                axios.post( 'http://localhost:4000/api/users/me/orders' , order , {headers: header})
                .then( response => {
                    this.setState( { done: true } );
                    window.location.reload()
                    alert('Order Placed')
                })
                .catch( error => {
                    console.log(error);
                });
            })
        }
    }
        
    }

        render () {
            const checkoutSummary = <CheckoutSummary
               cart={this.props.cartx}
               price={this.props.price}
               checkoutCancelled={this.checkoutCancelledHandler}
               checkoutContinued={this.checkoutContinuedHandler} />
            
            
            console.log(this.props)
            return ( 
                <div>
                    {checkoutSummary}
                </div>
            );
        }
        
    }

const mapStateToProps = state => {
    return {
        cartx: state.productsContainer.cart,
        price: state.productsContainer.totalPrice,
        authToken: state.auth.token
    }
}


export default connect(mapStateToProps)(Checkout);
