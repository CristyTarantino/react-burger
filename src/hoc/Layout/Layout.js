import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import classes from './Layout.module.scss'
import Toolbar from 'components/Navigation/Toolbar/Toolbar'
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer'

const Layout = ({isAuthenticated, children}) => {
  const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false)

  const sideDrawerToggleHandler = () => {
    setIsSideDrawerVisible((prevState) => !prevState)
  }

  const sideDrawerClosedHandler = () => {
    setIsSideDrawerVisible(false)
  }

  return (
    <>
      <Toolbar isAuth={isAuthenticated} onDrawerToggleClicker={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={isAuthenticated}
        isOpened={isSideDrawerVisible}
        onClosed={sideDrawerClosedHandler}
      />
      <main className={classes.content}>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
})

export default connect(mapStateToProps)(Layout)
