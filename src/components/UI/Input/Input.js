import React from 'react'
import PropTypes from 'prop-types'

import classes from './Input.module.scss'

const Input = props => {
  let elementType = null

  switch (props.elementType) {
    case ('select'):
      elementType = <select
        className={classes['input__element']}
        value={props.value}
        onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option
            key={option.value}
            value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
      break
    case ('textarea'):
      elementType = <textarea
        className={classes['input__element']}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      break
    default:
      elementType = <input
        className={classes['input__element']}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
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
  elementType: PropTypes.string.isRequired,
  label: PropTypes.string,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired
}

export default Input
