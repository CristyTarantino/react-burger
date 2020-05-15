import React from 'react'
import classes from './Order.module.scss'

import PropTypes from 'prop-types'

const Order = (props) => {
  const ingredients = []

  for (const ingredientName in props.ingredients) {
    if (props.ingredients.hasOwnProperty(ingredientName)) {
      ingredients.push({
        name: ingredientName,
        amount: props.ingredients[ingredientName],
      })
    }
  }

  const ingredientOutput = ingredients.map((ig) => {
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
      <p>{props.customer}</p>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {props.price}</strong>
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
