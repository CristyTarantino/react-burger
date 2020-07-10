import React from 'react'
import PropTypes from 'prop-types'

import classes from './DrawerToggle.module.scss'

const drawerToggle = ({clicked}) => (
  <div className={classes['drawer-toggle']} onClick={clicked}>
    <div />
    <div />
    <div />
  </div>
)

drawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
}

export default drawerToggle
