import React from 'react'

import style from './Toolbar.module.scss'
import Logo from '../../Logo/Logo'
import NavigationItemList from '../NavigationItemList/NavigationItemList'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
  <header className={style.toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicker} />
    <div className={style['logo-container']}>
      <Logo />
    </div>
    <nav className={style['desktop-only']}>
      <NavigationItemList />
    </nav>
  </header>
)

export default toolbar
