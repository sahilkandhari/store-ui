import React from 'react'
import Aux from '../../hoc/Auxi'
import Button from '../../components/UI/Button/Button'

const orderSummary = (props) => {
    const orderSummary = Object.keys(props.cart)
            .map(cKey => {
            if(props.cart[cKey] >=1 )
            return( 
            <li key={cKey}>
                <span>{cKey}</span>
            </li>)
            })
    return (
        <Aux>
            <h3>Selected Items</h3>
            <ul>
                {orderSummary}
            </ul>
            <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary