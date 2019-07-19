import React, { Component} from 'react'
import PropTypes from 'prop-types'

import classes from './Layout.module.scss'

import Toolbar from 'components/Navigation/Toolbar/Toolbar'

import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer'

import { connect } from 'react-redux'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {
    return <>
      <Toolbar
        isAuth={this.props.isAuthenticated}
        drawerToggleClicker={this.sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={this.props.isAuthenticated}
        isOpened={this.state.showSideDrawer}
        closed={this.sideDrawerToggleHandler} />
      <main className={classes.content}>
        {this.props.children}
      </main>
    </>
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout)
