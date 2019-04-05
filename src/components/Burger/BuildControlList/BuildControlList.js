import React from 'react'
import PropTypes from 'prop-types'

import style from './BuildControlList.module.scss'
import BuildControl from './BuildControl/BuildControl'

const controlList = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControlList = props => {
  return (
    <div className={style['build-controls']}>
      <p>Total Price: &pound;<strong>{props.total.toFixed(2)}</strong></p>

      {controlList.map(ctrl =>
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />)}

      <button
        className={style['button-order']}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>
  )
}

buildControlList.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired
}

export default buildControlList
