import React from 'react'
import classes from './NavigationItemList.module.scss'

import NavigationItem from './NavigationItem/NavigationItem'

const navigationItemList = (props) => (
  <ul className={classes['navigation-item-list']}>
    <NavigationItem link='/' exact>Burger Builder</NavigationItem>
    <NavigationItem link='/orders'>Orders</NavigationItem>
  </ul>
)

export default navigationItemList
