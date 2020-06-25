import React from 'react'
import Logo from '../../assests/Images/logo2.jpg'
import classes from './Logo.css'

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={Logo} alt="Logo"/>
        </div>
    )
}

export default logo