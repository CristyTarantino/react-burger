import React from 'react'
import classes from './Order.module.scss'

import PropTypes from 'prop-types'

const Order = ({ingredients, customer, price}) => {
  const orderedIngredients = []

  for (const ingredientName in ingredients) {
    if (ingredients.hasOwnProperty(ingredientName)) {
      orderedIngredients.push({
        name: ingredientName,
        amount: ingredients[ingredientName],
      })
    }
  }

  const ingredientOutput = orderedIngredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          padding: '5px',
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    )
  })

  return (
    <div className={classes.order}>
      <p>{customer}</p>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {price.toFixed(2)}</strong>
      </p>
    </div>
  )
}

Order.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number.isRequired,
  customer: PropTypes.string,
}

export default Order
