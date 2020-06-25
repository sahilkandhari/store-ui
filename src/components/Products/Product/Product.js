import React from 'react'
import classes from './Product.css'
import Controls from '../../Controls/Controls'
import Aux from '../../../hoc/Auxi'


const product = (props) => {
    return (
    <Aux>
    <div className={classes.Product}>
        <div>
        <img src={props.image} className={classes.Image} alt="product"/>
        </div>
        <p>{props.name}</p>
        <p>${props.price}</p>
        <Controls 
        added={props.added}
        removed={props.removed}
        disabled={props.disabled}
        />
    </div>
    </Aux>
    )
}

export default product