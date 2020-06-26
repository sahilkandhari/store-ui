import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom'
import Spinner from './components/UI/Spinner/Spinner'
import ProductsContainer from './containers/ProductsContainer/ProductsContainer' 
import Layout from './components/Layout/Layout'
import Orders from './containers/Orders/Orders'
import Cart from './components/Cart/CartSummary/CartSummary'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup()
    this.props.onInitProducts()
    this.props.onInitCartPrices()
  }

  render () {

    let routes= ( <Switch>
      <Route path="/" exact component={ProductsContainer}/>
      <Route path="/auth" component={Auth} />
      <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuth) {
      routes = ( <Switch>
        <Route path="/" exact component={ProductsContainer}/>
        <Route path="/orders" component={Orders} />
        <Route path="/cart" component={Cart} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
          <Layout>
            {this.props.loading ? <Spinner /> : routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuth: state.auth.token !== null,
      loading: state.productsContainer.loading
  }
}

 const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuthState()),
    onInitProducts: () => dispatch(actions.initProducts()),
    onInitCartPrices : () => dispatch(actions.initCartPrices())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
