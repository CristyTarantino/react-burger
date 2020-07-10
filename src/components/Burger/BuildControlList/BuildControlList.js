import React from 'react'
import PropTypes from 'prop-types'

import classes from './BuildControlList.module.scss'
import BuildControl from './BuildControl/BuildControl'

const controlList = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
]

const BuildControlList = ({
  total,
  ingredientAdded,
  ingredientRemoved,
  disabled,
  purchasable,
  ordered,
  isAuth,
}) => {
  return (
    <div className={classes['build-controls']}>
      <p>
        Total Price: &pound;<strong>{total.toFixed(2)}</strong>
      </p>

      {controlList.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => ingredientAdded(ctrl.type)}
          removed={() => ingredientRemoved(ctrl.type)}
          disabled={disabled[ctrl.type]}
        />
      ))}

      <button
        className={classes['button-order']}
        disabled={!purchasable}
        onClick={ordered}
      >
        {isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  )
}

BuildControlList.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
  ordered: PropTypes.func.isRequired,
}

export default BuildControlList
