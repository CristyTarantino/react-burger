import React from 'react'
import PropTypes from 'prop-types'

import classes from './Toolbar.module.scss'
import Logo from 'components/Logo/Logo'
import NavigationItemList from 'components/Navigation/NavigationItemList/NavigationItemList'
import DrawerToggle from 'components/Navigation/SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
  <header className={classes.toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicker} />
    <div className={classes['logo-container']}>
      <Logo />
    </div>
    <nav className={classes['desktop-only']}>
      <NavigationItemList isAuth={props.isAuth}/>
    </nav>
  </header>
)

toolbar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  drawerToggleClicker: PropTypes.func.isRequired
}

export default toolbar
