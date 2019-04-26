import React from 'react'

import burgerLogo from 'assets/images/burger-logo.png'
import style from './Logo.module.scss'

const logo = (props) => (
  <div className={style.logo}>
    <img src={burgerLogo} alt='MyBurgerBrand' />
  </div>
)

export default logo
