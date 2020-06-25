import React from 'react'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
import Cart from '../../Cart/CartSummary/CartSummary'
import { withRouter } from 'react-router-dom'


const checkoutSummary = (props) => {
    let disabled = false
    return (
        <div className={classes.CheckoutSummary}>
            <div style={{width:'100%', margin:'auto'}}>                
                 <Cart />
            </div>
            <p>Total Price: {props.price}</p>
            {props.price == 0 ? disabled = true : disabled = false}
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued} disabled={disabled}>ORDER</Button>
        </div>
    )
}

export default withRouter(checkoutSummary)
