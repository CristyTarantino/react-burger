import React from 'react'
import PropTypes from 'prop-types'
import style from './BurgerIngredient.module.scss'

const burgerIngredient = (props) => {
  let ingredient = null

  switch (props.type) {
    case 'bread-bottom':
      ingredient = <div className={style['bread--bottom']} />
      break
    case 'bread-top':
      ingredient = (
        <div className={style['bread--top']}>
          <div className={style.seeds1} />
          <div className={style.seeds2} />
        </div>
      )
      break
    case 'meat':
    case 'cheese':
    case 'salad':
    case 'bacon':
      ingredient = <div className={style[props.type]} />
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
