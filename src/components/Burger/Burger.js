import React from 'react'
import PropTypes from 'prop-types'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

import classes from './Burger.module.scss'

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    // ['salad', 'meat', 'cheese']
    .map(ingKey => {
      return [...Array(props.ingredients[ingKey])].map((_, i) =>
        <BurgerIngredient key={ingKey + i} type={ingKey} />
      )
    })
    // [ [0], [0,1], [0] ]
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
    // Flatten the array [ {}, {}, {}, {} ]

  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.burger}>
      <BurgerIngredient type={'bread-top'} />
      { transformedIngredients }
      <BurgerIngredient type={'bread-bottom'} />
    </div>
  )
}

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired
}

export default Burger
