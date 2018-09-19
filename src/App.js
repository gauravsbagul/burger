import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from '../src/store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout =  asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
}) 

const asyncOrders =  asyncComponent(() => {
  return import('./containers/Orders/Orders')
}) 

const asyncAuth =  asyncComponent(() => {
  return import('./containers/Auth/Auth')
}) 

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render () {
    return (
      <div> 
        <Layout>
          <Switch>
              <Route path="/checkout" component={asyncCheckout} />
              <Route path="/orders" component={asyncOrders} />
              <Route path="/auth" component={asyncAuth} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App))
