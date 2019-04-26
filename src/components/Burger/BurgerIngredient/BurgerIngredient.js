import React from 'react'
import PropTypes from 'prop-types'
import classes from './BurgerIngredient.module.scss'

const burgerIngredient = (props) => {
  let ingredient = null

  switch (props.type) {
    case 'bread-bottom':
      ingredient = <div className={classes['bread--bottom']} />
      break
    case 'bread-top':
      ingredient = (
        <div className={classes['bread--top']}>
          <div className={classes.seeds1} />
          <div className={classes.seeds2} />
        </div>
      )
      break
    case 'meat':
    case 'cheese':
    case 'salad':
    case 'bacon':
      ingredient = <div className={classes[props.type]} />
      break
    default:
      ingredient = null
  }

  return ingredient
}

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default burgerIngredient
