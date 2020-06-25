import React from 'react';

import classes from './Order.css';

const order = ( props ) => {
    const products_array = props.items[0].products;

    const productOutput = products_array.map(pKey => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={pKey.productName}>{pKey.productName} ({pKey.quantity})</span>;
    });
    

    return (
        <div className={classes.Order}>
            <p>Products: {productOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p>
            <p>OrderId: <strong>{Number.parseFloat( props.id )}</strong></p>
        </div>
    );
};

export default order;