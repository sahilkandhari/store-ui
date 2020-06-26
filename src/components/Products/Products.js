import React from 'react'
import Product from './Product/Product'
import classes from './Products.css'
import { connect } from 'react-redux'
import productsArray from '../../data/products'

const products = (props) => (
    <div className={classes.Row}>
        {props.products.map((product) => {
            if (props.filter === product.category) {
                       return (<Product
                        name={product.name} 
                        price={product.price}
                        image={product.image}
                        key={product.name}
                        added={product.InStock ? () => props.productAdded(product.name) : null}
                        removed={product.InStock ? () => props.productRemoved(product.name) : null}
                        disabled={props.disabled[product.name]}
                />)
            }   
        })}
    </div>
)


const mapStateToProps = state => {
    return {
        products: state.productsContainer.products
    }
}

export default connect(mapStateToProps)(products)