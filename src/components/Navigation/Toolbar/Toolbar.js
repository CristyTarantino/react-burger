import React from 'react'
import PropTypes from 'prop-types'

import style from './Toolbar.module.scss'
import Logo from 'components/Logo/Logo'
import NavigationItemList from 'components/Navigation/NavigationItemList/NavigationItemList'
import DrawerToggle from 'components/Navigation/SideDrawer/DrawerToggle/DrawerToggle'

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

toolbar.propTypes = {
  drawerToggleClicker: PropTypes.func.isRequired
}

export default toolbar
