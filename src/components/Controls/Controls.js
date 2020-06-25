import React from 'react'
import classes from './Controls.css'

const controls = (props) => {

    let addToCart = null;
    let removeFromCart = null;

    if(props.added === null && props.removed === null) {
        addToCart = <button className={classes.disabled}>Out of Stock</button>
        removeFromCart = <button className={classes.disabled}>Out of Stock</button>
    }else {
        addToCart = <button className={classes.More} onClick={props.added}>Add to Cart</button>
        removeFromCart = <button className={classes.Less} onClick={props.removed}>Remove from Cart</button>
    }

    return(
    <div className={classes.Control}>
        <p className={classes.Label}>{props.disabled ? addToCart  : removeFromCart} </p>
    </div>
    )
}  

export default controls

// <button className={classes.Less} onClick={props.removed} disabled={props.disabled}> - </button>
// <p className={classes.Label}>{props.disabled ? 'Add to Cart'  : props.children} </p>
// <button className={classes.More} onClick={props.added}> + </button>