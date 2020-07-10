import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/UI/Button/Button'

const orderSummary = ({ingredients, price, purchaseCancelled, purchaseContinued}) => {
  const ingredientSummary = Object.keys(ingredients).map((ingKey) => {
    return (
      <li key={ingKey}>
        <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {ingredients[ingKey]}
      </li>
    )
  })

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>
          Total Price: <span>&pound;{price.toFixed(2)}</span>
        </strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="danger" clicked={purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </>
  )
}

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  purchaseCancelled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired,
}

export default orderSummary
