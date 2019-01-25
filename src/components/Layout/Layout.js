import React from 'react'
import PropTypes from 'prop-types'

import classes from './Layout.module.scss'

const Layout = (props) => (
  // React.Fragment https://reactjs.org/docs/fragments.html
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.content}>
      {props.children}
    </main>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
