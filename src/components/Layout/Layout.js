import React from 'react'
import PropTypes from 'prop-types'

import style from './Layout.module.scss'

import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = (props) => (
  // React.Fragment https://reactjs.org/docs/fragments.html
  <>
    <Toolbar />
    <main className={style.content}>
      {props.children}
    </main>
  </>
)

layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default layout
