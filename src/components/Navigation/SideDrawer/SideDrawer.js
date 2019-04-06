import React from 'react'
import style from './SideDrawer.module.scss'
import Logo from '../../Logo/Logo'
import NavigationItemList from '../NavigationItemList/NavigationItemList'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
  let attachedClasses = [style['side-drawer'], style.close]

  if (props.open){
    attachedClasses = [style['side-drawer'], style.open]
  }

  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
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

export default sideDrawer
