import React from 'react'
import PropTypes from 'prop-types'

import classes from './BuildControl.module.scss'

const BuildControl = props => (
  <div className={classes['build-control']}>
    <div className={classes.label}>{props.label}</div>
    <button
      className={classes.less}
      // onClick={props.added}
    >Less</button>
    <button
      className={classes.more}
      onClick={props.added}
    >More</button>
  </div>
)

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired
}

export default BuildControl
