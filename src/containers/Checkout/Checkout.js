import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ContactData from 'containers/Checkout/ContactData/ContactData'
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    this.parseQueryParams()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  render () {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler} />
          <Route path={this.props.match.path + '/contact-data'} render={(props) => (
            <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>
          )}/>
      </div>
    )
  }

  parseQueryParams () {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;

    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === 'price') {
        totalPrice = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice
    });
  }
}

export default Checkout