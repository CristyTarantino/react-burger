import React from 'react'

import style from './Toolbar.module.scss'
import Logo from '../../Logo/Logo'

const toolbar = (props) => (
 <header className={style.toolbar}>
  <div>MENU</div>
  <Logo />
  <div>...</div>
 </header>
)

export default toolbar