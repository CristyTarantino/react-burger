import React from 'react'
import PropTypes from 'prop-types'

const layout = (props) => (
  // React.Fragment https://reactjs.org/docs/fragments.html
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>
      {props.children}
    </main>
  </>
)

layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default layout
