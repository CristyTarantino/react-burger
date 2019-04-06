import React from 'react'
import style from './DrawerToggle.module.scss'

const drawerToggle = (props) => (
  <div className={style['drawer-toggle']} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default drawerToggle
