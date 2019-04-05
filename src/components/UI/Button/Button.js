import React from 'react'
// import PropTypes from 'prop-types'

import style from './Button.module.scss'

const button = (props) => (
  <button
    className={[style.button, style[props.btnType]].join(' ')}
    onClick={props.clicked}>
    {props.children}
  </button>
)

export default button
