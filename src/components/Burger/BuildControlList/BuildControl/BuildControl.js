import React from 'react'
import PropTypes from 'prop-types'

import classes from './BuildControl.module.scss'

const buildControl = props => (
  <div className={classes['build-control']}>
    <div className={classes.label}>{props.label}</div>
    <button
      className={classes.less}
      onClick={props.removed}
      disabled={props.disabled}
    >Less</button>
    <button
      className={classes.more}
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
