import React from 'react'
import PropTypes from 'prop-types'

import classes from './Button.module.scss'

const Button = ({disabled, clicked, children, btnType}) => (
  <button
    disabled={disabled}
    className={[classes.button, classes[btnType]].join(' ')}
    onClick={clicked}
  >
    {children}
  </button>
)

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  children: PropTypes.node.isRequired,
}

export default Button
