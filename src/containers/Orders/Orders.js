import React, { Component } from 'react';
import { connect } from 'react-redux'
import Order from '../../components/Order/Order';
import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        const headers = {'Authorization' : 'Bearer ' + this.props.authToken}
        axios.get('http://localhost:4000/api/users/me', {headers: headers})
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data.orders) {
                    fetchedOrders.push({
                        ...res.data.orders[key],
                        id: res.data.orders[key].orderId
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render () {
        if(this.state.loading) {
            return ( <Spinner /> )
        }
        else {
            return (
                <div>
                    {this.state.orders.map(order => (
                        <Order
                            key={order.id} 
                            id={order.id}
                            items={order.items}
                            price={order.price}
                            status={order.status} />
                    ))}
                </div>
            );    
        }
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token
    }
}

export default connect(mapStateToProps)(withErrorHandler(Orders, axios));