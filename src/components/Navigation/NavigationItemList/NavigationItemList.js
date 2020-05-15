import React from 'react'
import classes from './NavigationItemList.module.scss'

import NavigationItem from './NavigationItem/NavigationItem'
import PropTypes from 'prop-types'

const NavigationItemList = (props) => {
  let auth = <NavigationItem link="/auth">Log In</NavigationItem>

  if (props.isAuth) {
    auth = (
      <>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Log Out</NavigationItem>
      </>
    )
  }

  return (
    <ul className={classes['navigation-item-list']}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {auth}
    </ul>
  )
}

NavigationItemList.propTypes = {
  isAuth: PropTypes.bool,
}

export default NavigationItemList
