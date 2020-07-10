import React from 'react'
import PropTypes from 'prop-types'

import classes from './SideDrawer.module.scss'
import Logo from 'components/Logo/Logo'
import NavigationItemList from 'components/Navigation/NavigationItemList/NavigationItemList'
import Backdrop from 'components/UI/Backdrop/Backdrop'

const SideDrawer = ({isOpened, isAuth, onClosed}) => {
  let attachedClasses = [classes['side-drawer'], classes.close]

  if (isOpened) {
    attachedClasses = [classes['side-drawer'], classes.open]
  }

  return (
    <>
      <Backdrop show={isOpened} clicked={onClosed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes['logo-container']}>
          <Logo />
        </div>
        <nav className={classes['desktop-only']}>
          <NavigationItemList isAuth={isAuth} />
        </nav>
      </div>
    </>
  )
}

SideDrawer.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool,
  onClosed: PropTypes.func.isRequired,
}

export default SideDrawer
