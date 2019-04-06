import React, { Component} from 'react'
import PropTypes from 'prop-types'

import style from './Layout.module.scss'

import Toolbar from '../Navigation/Toolbar/Toolbar'

import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

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
    return (
      // React.Fragment https://reactjs.org/docs/fragments.html
      <>
        <Toolbar drawerToggleClicker={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerToggleHandler} />
        <main className={style.content}>
          {this.props.children}
        </main>
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
