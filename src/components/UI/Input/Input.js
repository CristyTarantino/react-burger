import React from 'react'
import PropTypes from 'prop-types'

import classes from './Input.module.scss'

const Input = props => {
  let elementType = null
  const inputClasses = [classes['input__element']]
  let validationError = null

  if (props.hasOwnProperty('valid') && props.touched && !props.valid) {
    inputClasses.push(classes['input__element--invalid'])
    validationError = <p className={classes['validation-error']}>{props.errorMessage}</p>
  }

  switch (props.elementType) {
    case ('select'):
      elementType = <select
        className={inputClasses.join(' ')}
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
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      break
    default:
      elementType = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
  }

  return (
    <div className={classes.input}>
      <label className={classes.label}>{props.label}</label>
      { elementType }
      { validationError }
    </div>
  )
}

Input.propTypes = {
  elementType: PropTypes.string.isRequired,
  label: PropTypes.string,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  errorMessage: PropTypes.string
}

export default Input
