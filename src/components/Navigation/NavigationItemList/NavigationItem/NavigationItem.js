import React from 'react'
import PropTypes from 'prop-types'

import style from './NavigationItem.module.scss'

const navigationItem = (props) => (
  <li className={style['navigation-item']}>
    <a
      href={props.link}
      className={props.active ? style.active : null}>
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
