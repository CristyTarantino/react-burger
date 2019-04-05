import React from 'react'
import style from './Button.modal.scss'

const button = (props) => (
  <button
    className={[style.button, style[props.btnType]].join(' ')}
    onClick={props.clicked}>
    {props.children}
  </button>
)

export default button
