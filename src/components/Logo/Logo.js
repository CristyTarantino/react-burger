import React from 'react'

import burgerLogo from 'assets/images/burger-logo.png'
import classes from './Logo.module.scss'

const logo = (props) => (
  <div className={classes.logo}>
    <img src={burgerLogo} alt='MyBurgerBrand' />
  </div>
)

export default logo
