import React from 'react'

import style from './Toolbar.module.scss'
import Logo from '../../Logo/Logo'
import NavigationItemList from '../NavigationItemList/NavigationItemList'

const toolbar = (props) => (
 <header className={style.toolbar}>
  <div>MENU</div>
  <Logo />
  <nav>
    <NavigationItemList />
  </nav>
 </header>
)

export default toolbar