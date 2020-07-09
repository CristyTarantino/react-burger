import React from 'react'
import PropTypes from 'prop-types'

import classes from './Toolbar.module.scss'
import Logo from 'components/Logo/Logo'
import NavigationItemList from 'components/Navigation/NavigationItemList/NavigationItemList'
import DrawerToggle from 'components/Navigation/SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = ({onDrawerToggleClicker, isAuth}) => (
  <header className={classes.toolbar}>
    <DrawerToggle clicked={onDrawerToggleClicker} />
    <div className={classes['logo-container']}>
      <Logo />
    </div>
    <nav className={classes['desktop-only']}>
      <NavigationItemList isAuth={isAuth} />
    </nav>
  </header>
)

Toolbar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  drawerToggleClicker: PropTypes.func.isRequired,
}

export default Toolbar
