import React from 'react'
import classes from './CartControls.css'


const cartControl = (props) => {
     
    return( 
         <div className={classes.CartC}> 
            <button className={classes.Less} 
            onClick={props.removed} 
            > - </button>
            <p className={classes.Label}>Edit</p>
            <button className={classes.More} 
            onClick={props.added}> + </button>       
        </div>)
}

export default cartControl
