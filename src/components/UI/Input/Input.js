import React from 'react'
import PropTypes from 'prop-types'

import classes from './Input.module.scss'

const Input = ({
  touched,
  valid,
  errorMessage,
  elementType,
  elementConfig,
  value,
  changed,
  label,
}) => {
  let inputElementType
  const inputClasses = [classes.input__element]
  let validationError

  if (touched && !valid) {
    inputClasses.push(classes['input__element--invalid'])
    validationError = <p className={classes['validation-error']}>{errorMessage}</p>
  }

  switch (elementType) {
    case 'select':
      inputElementType = (
        <select className={inputClasses.join(' ')} value={value} onChange={changed}>
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break
    case 'textarea':
      inputElementType = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      )
      break
    default:
      inputElementType = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      )
  }

  return (
    <div className={classes.input}>
      <label className={classes.label}>{label}</label>
      {inputElementType}
      {validationError}
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
  errorMessage: PropTypes.string,
}

export default Input
