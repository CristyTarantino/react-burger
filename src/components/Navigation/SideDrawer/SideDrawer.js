import React from 'react'
import PropTypes from 'prop-types'

import style from './SideDrawer.module.scss'
import Logo from 'components/Logo/Logo'
import NavigationItemList from 'components/Navigation/NavigationItemList/NavigationItemList'
import Backdrop from 'components/UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
  let attachedClasses = [style['side-drawer'], style.close]

  if (props.isOpened) {
    attachedClasses = [style['side-drawer'], style.open]
  }

  return (
    <>
      <Backdrop show={props.isOpened} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={style['logo-container']}>
          <Logo />
        </div>
        <nav className={style['desktop-only']}>
          <NavigationItemList />
        </nav>
      </div>
    </>
  )
}

sideDrawer.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired
}

export default sideDrawer
