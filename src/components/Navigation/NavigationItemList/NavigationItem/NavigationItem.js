import React from 'react'
import style from './NavigationItem.module.scss'

const navigationItem = (props) => (
  <li className={style['navigation-item']}><a href={props.link}
                                              className={props.active ? style.active : null}>{props.children}</a></li>
)

export default navigationItem
