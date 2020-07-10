import React from 'react'
import PropTypes from 'prop-types'

import classes from './Backdrop.module.scss'

const backdrop = ({show, clicked}) =>
  show && <div className={classes.backdrop} onClick={clicked} />

backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func.isRequired,
}

export default backdrop
