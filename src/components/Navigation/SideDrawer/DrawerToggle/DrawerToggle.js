import React from 'react'
import PropTypes from 'prop-types'

import style from './DrawerToggle.module.scss'

const drawerToggle = (props) => (
  <div className={style['drawer-toggle']} onClick={props.clicked}>
    <div />
    <div />
    <div />
  </div>
)

drawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired
}

export default drawerToggle
