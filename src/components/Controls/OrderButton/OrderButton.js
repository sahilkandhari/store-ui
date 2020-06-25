import React from 'react'
import classes from './OrderButton.css'

const orderButton = (props) => {
    return (
            <button className={classes.OrderButton}
            disabled={!props.purchasable}
    onClick={props.ordered}>{props.isAuth ? 'ORDER NOW': 'Sign In to Order'}</button>
    )
}

export default orderButton