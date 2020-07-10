import React from 'react'
import Burger from 'components/Burger/Burger'
import Button from 'components/UI/Button/Button'

import classes from './CheckoutSummary.module.scss'
import PropTypes from 'prop-types'

const CheckoutSummary = ({ingredients, checkoutCancelled, checkoutContinued}) => {
  return (
    <div className={classes['checkout-summary']}>
      <h1>We hope it tastes good!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="danger" clicked={checkoutCancelled}>
        Cancel
      </Button>
      <Button btnType="success" clicked={checkoutContinued}>
        Continue
      </Button>
    </div>
  )
}

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
}

export default CheckoutSummary
