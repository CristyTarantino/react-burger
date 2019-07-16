import React from 'react'
import Burger from 'components/Burger/Burger'
import Button from 'components/UI/Button/Button'

import classes from './CheckoutSummary.module.scss'

const checkoutSummary = (props) => {
  return (
    <div className={classes['checkout-summary']}>
      <h1>We hope it tastes good!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType='danger'
        clicked={props.checkoutCancelled}>Cancel</Button>
      <Button
        btnType='success'
        clicked={props.checkoutContinued}>Continue</Button>
    </div>
  )
}

export default checkoutSummary
