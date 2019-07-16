import React, { Component } from 'react'
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    }
  }

  componentDidMount() {
    this.setState({
      ingredients: this.parseQueryParams()
    });
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
      </div>
    )
  }

  parseQueryParams () {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let param of query.entries()) {
      // ['salad', '1']
      ingredients[param[0]] = +param[1];
    }

    return ingredients;
  }
}

export default Checkout