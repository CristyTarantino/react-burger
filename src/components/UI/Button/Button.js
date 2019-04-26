import React from 'react'
import PropTypes from 'prop-types'

import classes from './Button.module.scss'

const button = (props) => (
  <button
    className={[classes.button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>
    {props.children}
  </button>
)

button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default button
