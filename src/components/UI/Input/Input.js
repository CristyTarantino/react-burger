import React from 'react'
import PropTypes from 'prop-types'

import classes from './Input.module.scss'

const Input = props => {
  let elementType = null

  switch (props.elementType) {
    case ('input'):
      elementType = <input
        className={classes['input__element']}
        {...props.elementConfig}
        value={props.value}
      />
      break
    case ('textarea'):
      elementType = <textarea
        {...props.elementConfig}
        value={props.value}
      />
      break
    default:
      elementType = <input
        className={classes['input__element']}
        {...props.elementConfig}
        value={props.value}
      />
  }

  return (
    <div className={classes.input}>
      <label className={classes.label}>{props.label}</label>
      { elementType }
    </div>
  )
}

Input.propTypes = {
  elementType: PropTypes.string,
  label: PropTypes.string,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
}

export default Input
