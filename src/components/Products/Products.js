import React from 'react'
import Product from './Product/Product'
import productsArray from '../../data/products'
import classes from './Products.css'

const products = (props) => (
    <div className={classes.Row}>
        {productsArray.map((product) => {
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

export default products