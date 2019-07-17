import React from 'react'
import PropTypes from 'prop-types'

import classes from './Button.module.scss'

const button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>
    {props.children}
  </button>
)

button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default button
