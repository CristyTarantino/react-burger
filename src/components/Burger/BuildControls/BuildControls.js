import React from 'react'
import PropTypes from 'prop-types'

import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const BuildControls = props => {
  return (
    <div className={classes['build-controls']}>
      {controls.map(ctrl =>
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
        />)}
    </div>
  )
}

BuildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired
}

export default BuildControls
