import React from 'react'
import PropTypes from 'prop-types'

import style from './BuildControl.module.scss'

const buildControl = props => (
  <div className={style['build-control']}>
    <div className={style.label}>{props.label}</div>
    <button
      className={style.less}
      onClick={props.removed}
      disabled={props.disabled}
    >Less</button>
    <button
      className={style.more}
      onClick={props.added}
    >More</button>
  </div>
)

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default buildControl
