import React from 'react'
import classes from './NavigationItemList.module.scss'

import NavigationItem from './NavigationItem/NavigationItem'

const navigationItemList = (props) => (
  <ul className={classes['navigation-item-list']}>
    <NavigationItem link='/' active>Burger Builder</NavigationItem>
    <NavigationItem link='/'>Checkout</NavigationItem>
  </ul>
)

export default navigationItemList
