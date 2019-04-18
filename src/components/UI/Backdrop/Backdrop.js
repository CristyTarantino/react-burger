import React from 'react'
import PropTypes from 'prop-types'

import style from './Backdrop.module.scss'

const backdrop = (props) => props.show ? <div className={style.backdrop} onClick={props.clicked} /> : null

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired
}

export default backdrop
