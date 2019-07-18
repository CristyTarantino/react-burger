import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import ContactData from 'containers/Checkout/ContactData/ContactData'
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  render() {
    let summary = <Redirect to='/'/>

    if (this.props.ings) {
      summary =
        <>
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCancelled={this.checkoutCancelledHandler}/>
          <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
        </>
    }

    return summary
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients
})

export default connect(mapStateToProps)(Checkout)