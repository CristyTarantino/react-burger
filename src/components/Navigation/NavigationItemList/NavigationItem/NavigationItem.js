import React from 'react'
import PropTypes from 'prop-types'

import classes from './NavigationItem.module.scss'

const navigationItem = (props) => (
  <li className={classes['navigation-item']}>
    <a
      href={props.link}
      className={props.active ? classes.active : null}>
      {props.children}
    </a>
  </li>
)

navigationItem.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default navigationItem
