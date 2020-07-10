import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import ContactData from 'containers/Checkout/ContactData/ContactData'
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary'

const Checkout = ({history, match, ings, purchased}) => {
  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data')
  }

  const checkoutCancelledHandler = () => {
    history.goBack()
  }

  let summary = <Redirect to="/" />

  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null
    summary = (
      <>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          checkoutContinued={checkoutContinuedHandler}
          checkoutCancelled={checkoutCancelledHandler}
        />
        <Route path={match.path + '/contact-data'} component={ContactData} />
      </>
    )
  }

  return summary
}

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
})

export default connect(mapStateToProps)(Checkout)
