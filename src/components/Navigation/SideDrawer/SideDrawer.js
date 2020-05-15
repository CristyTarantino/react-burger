import React from 'react'
import PropTypes from 'prop-types'

import classes from './SideDrawer.module.scss'
import Logo from 'components/Logo/Logo'
import NavigationItemList from 'components/Navigation/NavigationItemList/NavigationItemList'
import Backdrop from 'components/UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
  let attachedClasses = [classes['side-drawer'], classes.close]

  if (props.isOpened) {
    attachedClasses = [classes['side-drawer'], classes.open]
  }

  return (
    <>
      <Backdrop show={props.isOpened} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes['logo-container']}>
          <Logo />
        </div>
        <nav className={classes['desktop-only']}>
          <NavigationItemList isAuth={props.isAuth} />
        </nav>
      </div>
    </>
  )
}

sideDrawer.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
}

export default sideDrawer
